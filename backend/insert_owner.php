<?php
require_once 'config.php'; 

$owner = ['username' => 'owner', 'password' => 'owner'];

$hashedPassword = password_hash($owner['password'], PASSWORD_DEFAULT);


$stmt = $pdo->prepare("SELECT * FROM owners WHERE username = ?");
$stmt->execute([$owner['username']]);
if (!$stmt->fetch()) {
    
    $stmt = $pdo->prepare("INSERT INTO owners (username, password) VALUES (?, ?)");
    $stmt->execute([$owner['username'], $hashedPassword]);
    echo "Owner inserted successfully.";
} else {
    echo "Owner already exists.";
}
?>
