<?php
header('Content-Type: application/json'); // Ensure the response is JSON
include 'inc/function.php'; // Include necessary files and classes

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read incoming JSON data
    $postdata = file_get_contents("php://input");
    // $identifier = $_POST['identifier'];
    // $password = $_POST['password'];
    // $postdata = json_encode(['identifier' => $identifier, 'password' => $password]);
    $request = json_decode($postdata);

    // Validate inputs
    if (isset($request->identifier) && isset($request->password)) {
        $identifier = filter_var($request->identifier, FILTER_SANITIZE_STRING);
        $password = filter_var($request->password, FILTER_SANITIZE_STRING);

        // Initialize the Database and User classes
        $database = new Database();
        $userManager = new User($database);

        // Attempt to log in
        $loginResult = $userManager->login($identifier, $password);
        
        // Return the JSON-encoded login result
        echo $loginResult;

        // Close the database connection
        $database->closeConnection();
    } else {
        // Send error response if required fields are missing
        echo json_encode([
            "success" => false,
            "message" => "Missing required fields."
        ]);
    }
} else {
    // Send error response if request method is not POST
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method. Use POST."
    ]);
}
