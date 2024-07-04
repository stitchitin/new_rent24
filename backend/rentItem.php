<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Function to validate and format date inputs
function validateAndFormatDate($date) {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    if ($d && $d->format('Y-m-d') === $date) {
        return $d->format('Y-m-d');
    }
    return false;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and sanitize inputs
    if (
        isset($_POST['paymentId']) && isset($_POST['startDate']) &&
        isset($_POST['endDate']) && isset($_POST['quantity']) &&
        isset($_POST['itemId']) && isset($_POST['userId']) &&
        isset($_POST['vendorId']) && isset($_POST['totalPrice'])
    ) {
        // Sanitize inputs to avoid code spam and injections
        $paymentId = filter_var($_POST['paymentId'], FILTER_SANITIZE_STRING);
        $startDate = filter_var($_POST['startDate'], FILTER_SANITIZE_STRING);
        $endDate = filter_var($_POST['endDate'], FILTER_SANITIZE_STRING);
        $quantity = filter_var($_POST['quantity'], FILTER_SANITIZE_NUMBER_INT);
        $itemId = filter_var($_POST['itemId'], FILTER_SANITIZE_NUMBER_INT);
        $userId = filter_var($_POST['userId'], FILTER_SANITIZE_NUMBER_INT);
        $vendorId = filter_var($_POST['vendorId'], FILTER_SANITIZE_NUMBER_INT);
        $totalPrice = filter_var($_POST['totalPrice'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        // Validate and format date inputs
        $formattedStartDate = validateAndFormatDate($startDate);
        $formattedEndDate = validateAndFormatDate($endDate);
        if (!$formattedStartDate || !$formattedEndDate) {
            echo json_encode(["success" => false, "message" => "Invalid date format."]);
            exit;
        }

        // Initialize the Database class
        $database = new Database();

        // Initialize the Rental class with the Database object
        $rentalManager = new User($database);

        // Add a new rental with sanitized data
        $result = $rentalManager->rentItem($paymentId, $formattedStartDate, $formattedEndDate, $quantity, $itemId, $userId, $vendorId, $totalPrice);

        echo $result;

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
