<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the incoming raw data
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    // Validate and sanitize inputs
    if (isset($request->username) && isset($request->email) && isset($request->password)) {
        // Sanitize inputs to avoid code spam and injections
        $username = filter_var($request->username, FILTER_SANITIZE_STRING);
        $email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
        $password = filter_var($request->password, FILTER_SANITIZE_STRING);

        // Validate the email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["success" => false, "message" => "Invalid email format."]);
            exit;
        }

        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Initialize the Database class
        $database = new Database();

        // Initialize the User class with the Database object
        $userManager = new User($database);

        // Add a new user with sanitized and hashed data
        $result = $userManager->addUser($username, $email, $hashedPassword);

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
