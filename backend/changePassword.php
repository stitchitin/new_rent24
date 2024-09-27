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

if ($requestMethod == 'POST') {
    // Retrieve the JSON data from the POST request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if all required fields are provided
    if (!empty($data['identifier']) && !empty($data['currentPassword']) && !empty($data['newPassword'])) {
        $identifier = $data['identifier']; // Email or username
        $currentPassword = $data['currentPassword'];
        $newPassword = $data['newPassword'];

        // Call the changePassword method and get the result
        $result = $userService->changePassword($identifier, $currentPassword, $newPassword);

        // Output the result
        echo $result;
    } else {
        // Return an error message if required fields are missing
        echo json_encode(["success" => false, "message" => "All fields are required."]);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
