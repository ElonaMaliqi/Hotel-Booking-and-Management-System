<?php
include 'cors.php';
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$room_number = $data['room_number'];
$check_in = $data['check_in'];
$check_out = $data['check_out'];

$sql = "INSERT INTO bookings (user_id, room_number, check_in, check_out) VALUES (:user_id, :room_number, :check_in, :check_out)";

$stmt = $pdo->prepare($sql);
$stmt->execute(['user_id' => $user_id, 'room_number' => $room_number, 'check_in' => $check_in, 'check_out' => $check_out]);

echo json_encode(["message" => "Room booked successfully"]);
?>
