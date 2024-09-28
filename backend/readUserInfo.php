<?php
// Set the Content-Type to JSON
header('Content-Type: application/json');

// Include necessary files (e.g., function.php for the User class and DB connection)
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

    if ($user_id) {
        // Call the readUserInfo method and get the result
        $result = $userService->readUserInfo($user_id);

        // Output the result
        echo $result;
    } else {
        // If no user_id is provided, return an error message
        echo json_encode(["success" => false, "message" => "user_id is required."]);
    }
} else {
    // If the request method is not GET, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method. Only GET is allowed."]);
}
