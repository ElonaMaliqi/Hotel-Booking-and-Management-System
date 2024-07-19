<?php
require_once 'config.php'; 

$managers = [
    ['username' => 'manager1', 'password' => 'manager1', 'shift' => '09:00-17:00', 'wage' => 7000.00],
    ['username' => 'manager2', 'password' => 'manager2', 'shift' => '14:00-22:00', 'wage' => 7000.00]
];

foreach ($managers as $manager) {
    $hashedPassword = password_hash($manager['password'], PASSWORD_DEFAULT);

    
    $stmt = $pdo->prepare("SELECT * FROM managers WHERE username = ?");
    $stmt->execute([$manager['username']]);
    if ($stmt->fetch()) {
        continue; 
    }

    $stmt = $pdo->prepare("INSERT INTO managers (username, password, shift, wage, wage_paid) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$manager['username'], $hashedPassword, $manager['shift'], $manager['wage'], false]);
}

echo "Managers inserted successfully.";
?>
