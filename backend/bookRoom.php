<?php
include 'cors.php';
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request data."]);
    exit;
}

$room_type = $data['room_type'] ?? null;
$user_id = $data['user_id'] ?? null;
$checkin_date = $data['checkin_date'] ?? null;
$checkout_date = $data['checkout_date'] ?? null;

if (!$room_type || !$user_id || !$checkin_date || !$checkout_date) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM bookings WHERE room_type = :room_type AND NOT (checkout_date <= :checkin_date OR checkin_date >= :checkout_date)");
$stmt->execute(['room_type' => $room_type, 'checkin_date' => $checkin_date, 'checkout_date' => $checkout_date]);
$conflicting_bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($conflicting_bookings) {
    http_response_code(409); 
    echo json_encode(["success" => false, "message" => "The room is not available for the selected dates."]);
} else {
    $stmt = $pdo->prepare("INSERT INTO bookings (room_type, user_id, checkin_date, checkout_date) VALUES (:room_type, :user_id, :checkin_date, :checkout_date)");
    $stmt->execute(['room_type' => $room_type, 'user_id' => $user_id, 'checkin_date' => $checkin_date, 'checkout_date' => $checkout_date]);
    http_response_code(201); 
    echo json_encode(["success" => true, "message" => "Room booked successfully."]);
}
?>
