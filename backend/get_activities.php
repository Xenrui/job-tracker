<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

$user_id = intval($_SESSION['user_id']);

$sql = "SELECT * FROM jobs WHERE user_id = $user_id ORDER BY date_applied DESC";
$result = $conn->query($sql);

$activities = [
    'Applied' => [],
    'Interviewed' => [],
    'Offered' => []
];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $activities[$row['status']][] = $row;
    }
    echo json_encode($activities);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch activities: " . $conn->error]);
}

$conn->close();
?>
