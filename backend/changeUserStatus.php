<?php
// Set headers to return JSON
header('Content-Type: application/json');

// Include necessary files (e.g., function.php for User class and DB connection)
include 'inc/function.php';

// Create an instance of the Database class
$database = new Database();

// Initialize the User class with the Database object
$userService = new User($database);

// Get the JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract user_id and new_status from the JSON data
$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;
$new_status = isset($data['new_status']) ? $data['new_status'] : null;

// Validate that both user_id and new_status are provided
if ($user_id && $new_status) {
    // Call the changeUserStatus method and echo the result (which is already JSON-encoded)
    echo $userService->changeUserStatus($user_id, $new_status);
} else {
    // Respond with an error if user_id or new_status is missing
    echo json_encode([
        "success" => false,
        "message" => "Invalid user ID or status."
    ]);
}
?>
