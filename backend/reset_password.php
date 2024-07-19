<?php
include 'cors.php';
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$newPassword = $data['newPassword'] ?? null;

if (!$username || !$email || !$newPassword) {
    http_response_code(400); 
    echo json_encode(["success" => false, "message" => "Username, email, and new password are required."]);
    exit;
}


$sql = "SELECT * FROM users WHERE username = :username AND email = :email";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username, 'email' => $email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
   
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    
    $updateSql = "UPDATE users SET password = :password WHERE id = :id";
    $updateStmt = $pdo->prepare($updateSql);
    $updateStmt->execute(['password' => $hashedPassword, 'id' => $user['id']]);

    echo json_encode(["success" => true, "message" => "Password reset was successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid username or email"]);
}
?>
