<?php
require_once 'config.php'; 

$workers = [
    ['username' => 'worker1', 'password' => 'worker1', 'shift' => '09:00-17:00', 'wage' => 5000.00],
    ['username' => 'worker2', 'password' => 'worker2', 'shift' => '15:00-22:00', 'wage' => 4500.00],
    ['username' => 'worker3', 'password' => 'worker3', 'shift' => '06:00-14:00', 'wage' => 5000.00],
    ['username' => 'worker4', 'password' => 'worker4', 'shift' => '18:00-02:00', 'wage' => 5500.00],
    ['username' => 'worker5', 'password' => 'worker5', 'shift' => '08:00-16:00', 'wage' => 4500.00],
    
];

foreach ($workers as $worker) {
    $hashedPassword = password_hash($worker['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT * FROM workers WHERE username = ?");
    $stmt->execute([$worker['username']]);
    if ($stmt->fetch()) {
        continue; 
    }

    $stmt = $pdo->prepare("INSERT INTO workers (username, password, shift, wage) VALUES (?, ?, ?, ?)");
    $stmt->execute([$worker['username'], $hashedPassword, $worker['shift'], $worker['wage']]);
}

echo "Workers inserted successfully.";
?>
