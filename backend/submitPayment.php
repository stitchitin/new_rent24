<?php
// Include necessary files (e.g., function.php for User class and DB connection)
include 'inc/function.php';

// Create an instance of the Database class
$database = new Database();

// Initialize the User class with the Database object
$userService = new User($database);

// Get the transaction_id from the POST request
$transaction_id = isset($_POST['transaction_id']) ? (int)$_POST['transaction_id'] : null;

if ($transaction_id) {
    // Call a method to update the transaction status to 'Debited'
    $result = $userService->markTransactionAsDebited($transaction_id);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Transaction marked as Debited."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update transaction."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid transaction ID."]);
}
?>
