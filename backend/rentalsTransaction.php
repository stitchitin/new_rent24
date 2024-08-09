<?php
header('Content-Type: application/json');
include 'inc/function.php';

$database = new Database();

// Initialize the RentalService class with the Database object
$rentalService = new User($database);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'GET') {
    // Get the page, user_id, and vendor_id from the query parameters
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;
    $vendor_id = isset($_GET['vendor_id']) ? (int)$_GET['vendor_id'] : null;

    // Call the rentalsTransaction method and get the result
    $result = $rentalService->rentalsTransaction($page, $user_id, $vendor_id);

    // Output the result
    echo $result;
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
