<?php
require_once 'config.php'; 

$stmt = $pdo->query("SELECT id, username, shift, wage, wage_paid FROM managers");
$managers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['managers' => $managers]);
?>
