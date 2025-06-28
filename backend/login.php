<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "job_application");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $conn->real_escape_string($data['username'] ?? '');
$password = $data['password'] ?? '';

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Missing username or password"]);
    exit;
}

$sql = "SELECT * FROM users WHERE username='$username' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows == 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        unset($user['password']);  // Remove password before sending response
        
        $_SESSION['user_id'] = $user['user_id'];  // Store user_id in session
        $_SESSION['username'] = $user['username'];

        echo json_encode(["success" => true, "user" => $user]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid password"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
