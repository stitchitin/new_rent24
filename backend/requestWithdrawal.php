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
    // Handle POST request - Withdrawal request
    $input = json_decode(file_get_contents('php://input'), true);

    // Get user_id and request_amount from the POST body
    $user_id = isset($input['user_id']) ? (int)$input['user_id'] : null;
    $request_amount = isset($input['request_amount']) ? (float)$input['request_amount'] : null;

    // Validate input data
    if ($user_id !== null && $request_amount !== null) {
        // Call the requestWithdrawal method and get the result
        $result = $userService->requestWithdrawal($user_id, $request_amount);

        // Output the result
        echo $result;
    } else {
        // Return an error if either user_id or request_amount is missing
        echo json_encode(["success" => false, "message" => "Both user_id and request_amount are required."]);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
