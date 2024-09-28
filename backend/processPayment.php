<?php
// Set headers to return JSON
header('Content-Type: application/json');

// Include necessary files (e.g., function.php for User class and DB connection)
include 'inc/function.php';

// Create an instance of the Database class
$database = new Database();

// Initialize the User class with the Database object
$userService = new User($database);

// Get the transaction_id from the query parameters
$transaction_id = isset($_GET['transaction_id']) ? (int)$_GET['transaction_id'] : null;

if ($transaction_id) {
    // Fetch the transaction details including user bank details
    $transactionDetails = $userService->getTransactionDetails($transaction_id);

    if ($transactionDetails) {
        // Return JSON response with transaction details
        echo json_encode([
            "success" => true,
            "data" => $transactionDetails,
            "message" => "Review the transaction and confirm payment."
        ]);
    } else {
        // Transaction not found
        echo json_encode(["success" => false, "message" => "Transaction not found."]);
    }
} else {
    // Invalid transaction ID
    echo json_encode(["success" => false, "message" => "Invalid transaction ID."]);
}
?>
