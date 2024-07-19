<?php
require_once 'config.php';

$stmt = $pdo->query("SELECT id, username, email, phone FROM users");
$clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['clients' => $clients]);
?>
