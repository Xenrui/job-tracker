<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // React dev server origin
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "job_application");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $conn->real_escape_string($data['email'] ?? '');
$username = $conn->real_escape_string($data['username'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$username || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Please fill all fields"]);
    exit;
}

// Check if username or email already exists
$checkSql = "SELECT * FROM users WHERE username='$username' OR email='$email'";
$result = $conn->query($checkSql);

if ($result && $result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Username or email already taken"]);
    $conn->close();
    exit;
}

// Hash password before storing (use password_hash)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$insertSql = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$hashedPassword')";
if ($conn->query($insertSql) === TRUE) {
    echo json_encode(["success" => true, "message" => "User registered"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Registration failed"]);
}

$conn->close();
