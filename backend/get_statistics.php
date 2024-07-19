<?php
require_once 'config.php';

header("Content-Type: application/json");

try {
   
    $stmt = $pdo->query("SELECT u.username, b.room_type, b.checkin_date, b.checkout_date
                         FROM bookings b
                         JOIN users u ON b.user_id = u.id
                         ORDER BY b.checkin_date");

    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($reservations) {
        echo json_encode(['success' => true, 'reservations' => $reservations]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No reservations found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching reservations: ' . $e->getMessage()]);
}
