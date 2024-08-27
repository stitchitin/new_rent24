<?php
header('Content-Type: application/json');
include 'inc/function.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the form was submitted correctly and required fields are set
    if (isset($_GET['item_id']) && isset($_POST['category'])) {
        // Validate and sanitize inputs
        $item_id = filter_var($_GET['item_id'], FILTER_SANITIZE_NUMBER_INT);
        $category = filter_var($_POST['category'], FILTER_SANITIZE_STRING);
        $itemName = filter_var($_POST['ItemName'], FILTER_SANITIZE_STRING);
        $description = filter_var($_POST['Description'], FILTER_SANITIZE_STRING);
        $price = filter_var($_POST['Price'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $availability = filter_var($_POST['Availability'], FILTER_SANITIZE_STRING);
        $vendor_id = filter_var($_POST['vendor_id'], FILTER_SANITIZE_NUMBER_INT);
        $video = isset($_POST['Video']) ? filter_var($_POST['Video'], FILTER_SANITIZE_STRING) : null;
        $number_of_items = filter_var($_POST['number_of_items'], FILTER_SANITIZE_NUMBER_INT);
        $item_location = filter_var($_POST['location'], FILTER_SANITIZE_STRING);

        // Handle the file uploads
        $files = isset($_FILES['images']) ? $_FILES['images'] : null; // Ensure file input field name matches

        // Initialize the Database class
        $database = new Database();

        // Initialize the User class with the Database object
        $userManager = new User($database);

        // Update the rental item with sanitized data and file handling
        $result = $userManager->updateRentalItem(
            $item_id,
            $category,
            $itemName,
            $description,
            $price,
            $availability,
            $vendor_id,
            $video,
            $number_of_items,
            $files,
            $item_location
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
