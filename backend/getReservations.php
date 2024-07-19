<?php
require_once 'config.php'; 

header('Content-Type: application/json');

$query = $pdo->query("SELECT r.id, r.checkin_date AS checkinDate, r.checkout_date AS checkoutDate, r.room_type AS roomType, u.username,
                      (DATEDIFF(r.checkout_date, r.checkin_date) * r.price_per_night) AS totalPrice
                      FROM reservations r
                      JOIN users u ON r.user_id = u.id");

$reservations = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reservations);
?>
