<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Function to initialize Paystack payment
function initializePaystackPayment($email, $amount, $callbackUrl, $metadata) {
    $url = "https://api.paystack.co/transaction/initialize";

    $fields = [
        'email' => $email,
        'amount' => $amount * 100, // Amount in kobo
        'callback_url' => $callbackUrl,
        'metadata' => $metadata
    ];

    $fields_string = http_build_query($fields);

    // Open connection
    $ch = curl_init();

    // Set the URL, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: sk_test_3dacadf6f6545d7b3220b57f9cc3cfec1a03a766",
        "Cache-Control: no-cache",
    ));

    // So that curl_exec returns the contents of the cURL; rather than echoing it
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute post
    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the incoming raw data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (isset($request->paymentId)) {
        // Sanitize inputs to avoid code spam and injections
        $paymentId = filter_var($request->paymentId, FILTER_SANITIZE_STRING);
        $email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
        $amount = filter_var($request->amount, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $callbackUrl = filter_var($request->callbackUrl, FILTER_SANITIZE_STRING);
        $metadata = filter_var($request->metadata, FILTER_SANITIZE_STRING);

        // Initialize the Database class
        $database = new Database();

        // Initialize the Rental class with the Database object
        $rentalManager = new User($database);

        // Call Paystack API to initialize the payment
        $paystackResponse = initializePaystackPayment($email, $amount, $callbackUrl, ["cancel_action" => $metadata]);

        if ($paystackResponse['status']) {
            // Payment initialization was successful, now update the rental status
            $result = $rentalManager->callbackRentItem($paymentId);
            echo $result;
        } else {
            // Payment initialization failed
            echo json_encode(["success" => false, "message" => "Payment initialization failed."]);
        }

        // Close the database connection
        $database->closeConnection();
    } else {
        // Send error response if required fields are missing
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
    }
} else {
    // Send error response if request method is not POST
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
