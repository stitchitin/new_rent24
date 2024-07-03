<?php
header('Content-Type: application/json');
include 'inc/function.php';

$database = new Database();

// Initialize the User class with the Database object
$userManager = new User($database);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'GET') {
    // Get the page and category_id from the query parameters
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;

    // Call the method and get the result
    $result = $userManager->getRentalItems($page, $category_id); 

    // Output the result
    echo $result;
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
