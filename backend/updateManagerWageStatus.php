<?php
require_once 'config.php'; 


$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];
$wage_paid = $input['wage_paid'] ? 1 : 0; 

$stmt = $pdo->prepare("UPDATE managers SET wage_paid = ? WHERE id = ?");
$success = $stmt->execute([$wage_paid, $id]);

echo json_encode(['success' => $success]);
?>
