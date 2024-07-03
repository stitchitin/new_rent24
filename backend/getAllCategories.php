<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Create a new Database instance
$database = new Database();

// Initialize the User class with the Database object
$userManager = new User($database);

// Get all categories
$response = $userManager->getAllCategories();

// Return the response to the client
echo $response;
?>
