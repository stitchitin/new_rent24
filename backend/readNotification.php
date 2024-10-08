<?php
// Set the Content-Type to JSON
header('Content-Type: application/json');

// Include necessary files (e.g., function.php for User class and DB connection)
include 'inc/function.php';

// Create an instance of the Database class
$database = new Database();

// Initialize the User class with the Database object
$userService = new User($database);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'POST') {
    // Get the input data from the POST request
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract the notification_id from the input data
    $notification_id = isset($data['notification_id']) ? (int)$data['notification_id'] : null;

    // Validate input
    if ($notification_id) {
        // Call the readNotification method and get the result
        $result = $userService->readNotification($notification_id);

        // Output the result (already in JSON format from the method)
        echo $result;
    } else {
        // If notification_id is not provided, return an error message
        echo json_encode(["success" => false, "message" => "notification_id is required."]);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method. Only POST is allowed."]);
}
