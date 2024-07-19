<?php
require_once 'config.php';

$stmt = $pdo->query("SELECT id, room_type, checkin_date, checkout_date FROM bookings");
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['bookings' => $bookings]);
?>
