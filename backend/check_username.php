<?php
include 'cors.php';
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];

$sql = "SELECT COUNT(*) AS count FROM users WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username]);

$count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

if ($count > 0) {
    echo json_encode(["exists" => true, "message" => "User with this username already exists."]);
} else {
    echo json_encode(["exists" => false]);
}
?>
