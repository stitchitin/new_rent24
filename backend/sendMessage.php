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

    // Extract the user_id, subject, and message from the input data
    $user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;
    $subject = isset($data['subject']) ? $data['subject'] : null;
    $messageContent = isset($data['message']) ? $data['message'] : null;

    // Validate input
    if ($user_id && $subject && $messageContent) {
        // Call the sendMessage method and get the result
        $result = $userService->sendMessage($user_id, $subject, $messageContent);

        // Output the result
        echo $result;
    } else {
        // If required data is missing, return an error
        echo json_encode(["success" => false, "message" => "user_id, subject, and message are required."]);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
