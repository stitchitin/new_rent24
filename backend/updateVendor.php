<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the form was submitted and file upload is handled correctly
    if (isset($_POST['user_id'])) {
        // Validate and sanitize inputs
        $user_id = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT);
        $phone_number = isset($_POST['phone_number']) ? filter_var($_POST['phone_number'], FILTER_SANITIZE_STRING) : null;
        $state = isset($_POST['state']) ? filter_var($_POST['state'], FILTER_SANITIZE_STRING) : null;
        $address = isset($_POST['address']) ? filter_var($_POST['address'], FILTER_SANITIZE_STRING) : null;
        $localgovt = isset($_POST['localgovt']) ? filter_var($_POST['localgovt'], FILTER_SANITIZE_STRING) : null;
        $city = isset($_POST['city']) ? filter_var($_POST['city'], FILTER_SANITIZE_STRING) : null;
        $sex = isset($_POST['sex']) ? filter_var($_POST['sex'], FILTER_SANITIZE_STRING) : null;
        $birth = isset($_POST['birth']) ? filter_var($_POST['birth'], FILTER_SANITIZE_STRING) : null;
        $nin = isset($_POST['nin']) ? filter_var($_POST['nin'], FILTER_SANITIZE_STRING) : null;
        $firstname = isset($_POST['firstname']) ? filter_var($_POST['firstname'], FILTER_SANITIZE_STRING) : null;
        $lastname = isset($_POST['lastname']) ? filter_var($_POST['lastname'], FILTER_SANITIZE_STRING) : null;

        // Handle the file upload
        $profile_pic = $_FILES['profile_pic'];

        // Initialize the Database class
        $database = new Database();

        // Initialize the User class with the Database object
        $userManager = new User($database);

        // Update the vendor with sanitized data and file handling
        $result = $userManager->updateVendor(
            $user_id,
            $profile_pic,
            $phone_number,
            $state,
            $address,
            $localgovt,
            $city,
            $sex,
            $birth,
            $nin,
            $firstname,
            $lastname
        );

        echo $result;

        // Close the database connection
        $database->closeConnection();
    } else {
        // Send error response if required fields are missing
        echo json_encode(["success" => false, "message" => "Missing required fields or file upload error."]);
    }
} else {
    // Send error response if request method is not POST
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
