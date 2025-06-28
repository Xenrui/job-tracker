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

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "job_application");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$company = $conn->real_escape_string($data['company'] ?? '');
$title = $conn->real_escape_string($data['title'] ?? '');
$status = $conn->real_escape_string($data['status'] ?? 'Applied');
$date_applied = $conn->real_escape_string($data['date_applied'] ?? date('Y-m-d'));
$user_id = intval($_SESSION['user_id']);  // from session

if (!$company || !$title) {
    http_response_code(400);
    echo json_encode(["error" => "Company and title are required"]);
    exit;
}

$sql = "INSERT INTO jobs (user_id, company, title, status, date_applied) VALUES ($user_id, '$company', '$title', '$status', '$date_applied')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Application added"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to add application: " . $conn->error]);
}

$conn->close();
?>
