<?php
session_start();
require_once 'config.php'; 

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
    exit;
}


function verifyUser($pdo, $table, $username, $password) {
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }
    return null;
}


$owner = verifyUser($pdo, 'owners', $username, $password);
if ($owner) {
    $_SESSION['owner'] = $username;
    echo json_encode(['success' => true, 'role' => 'owner', 'message' => 'Owner login successful']);
    exit;
}


$manager = verifyUser($pdo, 'managers', $username, $password);
if ($manager) {
    $_SESSION['manager'] = $username;
    echo json_encode(['success' => true, 'role' => 'manager', 'message' => 'Manager login successful']);
    exit;
}


$worker = verifyUser($pdo, 'workers', $username, $password);
if ($worker) {
    $_SESSION['worker'] = $username;
    echo json_encode(['success' => true, 'role' => 'worker', 'message' => 'Worker login successful']);
    exit;
}


$client = verifyUser($pdo, 'users', $username, $password);
if ($client) {
    $_SESSION['user'] = $username;
    echo json_encode(['success' => true, 'role' => 'client', 'message' => 'User login successful']);
    exit;
}


echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
?>
