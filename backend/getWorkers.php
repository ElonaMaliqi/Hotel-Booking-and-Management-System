<?php
require_once 'config.php'; 

$stmt = $pdo->query("SELECT id, username, shift, CAST(wage AS DECIMAL(10, 2)) AS wage, wage_paid FROM workers");
$workers = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($workers as &$worker) {
    $worker['wage_paid'] = (bool)$worker['wage_paid'];
}

echo json_encode(['workers' => $workers]);
?>
