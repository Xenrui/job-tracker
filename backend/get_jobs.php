<?php
// Allow CORS from frontend
header("Access-Control-Allow-Origin: http://localhost:5173"); // Update if your frontend URL is different
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start(); // Start PHP session to access session variables

// Check if the user is authenticated
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Connect to MySQL database
$conn = new mysqli("localhost", "root", "", "job_application");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Prepare SQL query to fetch jobs for the logged-in user only
$sql = "SELECT job_id, company, title, status, date_applied 
        FROM jobs 
        WHERE user_id = ? 
        ORDER BY date_applied DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Collect jobs into an array
$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

// Return jobs as JSON
echo json_encode($jobs);

// Close connection
$stmt->close();
$conn->close();
