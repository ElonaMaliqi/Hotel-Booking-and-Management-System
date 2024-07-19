<?php
session_start();
include 'cors.php'; 
include 'config.php'; 


if (isset($_SESSION['user'])) {
   
    $username = $_SESSION['user'];

   
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        
        http_response_code(200);
        echo json_encode(['user_id' => $user['user_id']]);
        exit;
    } else {
        
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
} else {
    
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
?>
