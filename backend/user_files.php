<?php
header('Content-Type: application/json');
include 'inc/function.php';


// Check if the 'email' parameter is provided in the GET request
if (isset($_GET['email'])) {
    $email = $_GET['email'];

    // Create a new UserHandler instance with a database connection
        // Initialize the Database class
        $database = new Database();

        // Initialize the User class with the Database object
        $userManager = new User($database);

    // Get user information by email
    $response = $userManager->getUserByEmail($email); 

    // Return the response to the client
    echo $response;
} else {
    // If 'email' parameter is missing, return an error response
    echo json_encode([
        "success" => false,
        "message" => "Missing email parameter.",
    ]);
}

?>
