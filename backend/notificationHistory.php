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

if ($requestMethod == 'GET') {
    // Get the user_id from the query parameters
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;

    // Check if user_id is provided
    if ($user_id !== null) {
        // Call the notificationHistory method and get the result
        $result = $userService->notificationHistory($user_id);

        // Output the result (already in JSON format from the method)
        echo $result;
    } else {
        // If user_id is not provided, return an error message
        echo json_encode(["success" => false, "message" => "user_id is required."]);
    }
} else {
    // If the request method is not GET, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method. Only GET is allowed."]);
}
