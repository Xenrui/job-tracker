<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Start session
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Ensure the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Get the job ID from query string
if (!isset($_GET['job_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Missing job ID"]);
    exit;
}

$job_id = intval($_GET['job_id']);

// Connect to the database
$conn = new mysqli("localhost", "root", "", "job_application");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Prepare and execute a delete query, but only delete if the job belongs to the logged-in user
$sql = "DELETE FROM jobs WHERE job_id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit;
}

$stmt->bind_param("ii", $job_id, $user_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => "Job deleted successfully"]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Job not found or unauthorized"]);
}

$stmt->close();
$conn->close();
