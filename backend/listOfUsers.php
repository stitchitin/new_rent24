<?php
// Set the Content-Type to JSON
header('Content-Type: application/json');

// Include necessary files (e.g., function.php for the User class and DB connection)
include 'inc/function.php';

// Create an instance of the Database class
$database = new Database();

// Initialize the User class with the Database object
$userService = new User($database);

// Get the request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'GET') {
    // Get the page from the query parameters, default to page 1 if not provided
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

    // Call the listOfUsers method and get the result
    $result = $userService->listOfUsers($page);

    // Output the result
    echo $result;
} else {
    // If the request method is not GET, return an error message
    echo json_encode(["success" => false, "message" => "Invalid request method. Only GET is allowed."]);
}
