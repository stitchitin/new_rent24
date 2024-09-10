<?php
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
        echo json_encode([
            "success" => true,
            "data" => $transactionDetails,
            "message" => "Review the transaction and confirm payment."
        ]);

        // Provide a form or button to mark as debited
        echo '<form method="POST" action="submitPayment.php">';
        echo '<input type="hidden" name="transaction_id" value="' . $transaction_id . '">';
        echo '<button type="submit">Confirm Payment</button>';
        echo '</form>';
    } else {
        echo json_encode(["success" => false, "message" => "Transaction not found."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid transaction ID."]);
}
?>
