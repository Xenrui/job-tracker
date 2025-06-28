<?php
// Allow requests from your frontend
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();

// Make sure the user is authenticated
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Connect to DB
$conn = new mysqli("localhost", "root", "", "job_application");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Read JSON body
$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['job_id']) ||
    !isset($data['company']) ||
    !isset($data['title']) ||
    !isset($data['status']) ||
    !isset($data['date_applied'])
) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$job_id = $data['job_id'];
$company = $conn->real_escape_string($data['company']);
$title = $conn->real_escape_string($data['title']);
$status = $conn->real_escape_string($data['status']);
$date_applied = $conn->real_escape_string($data['date_applied']);

// Update the job for thz   e current user only
$sql = "
    UPDATE jobs
    SET company = '$company',
        title = '$title',
        status = '$status',
        date_applied = '$date_applied'
    WHERE job_id = $job_id AND user_id = $user_id
";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to update job"]);
}

$conn->close();
?>
