<?php
include 'cors.php';
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400); 
    echo json_encode(["success" => false, "message" => "Invalid request data."]);
    exit;
}

$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$phone = $data['phone'] ?? null;

if (!$username || !$email || !$password || !$phone) {
    http_response_code(400); 
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}


$sql = "SELECT * FROM users WHERE username = :username OR email = :email";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username, 'email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    http_response_code(409); 
    $existingField = ($user['username'] == $username) ? 'Username' : 'Email';
    echo json_encode(["success" => false, "message" => "$existingField already exists."]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$sql = "INSERT INTO users (username, email, password, phone) VALUES (:username, :email, :password, :phone)";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username, 'email' => $email, 'password' => $hashedPassword, 'phone' => $phone]);

http_response_code(201); 
echo json_encode(["success" => true, "message" => "Registration successful."]);
?>
