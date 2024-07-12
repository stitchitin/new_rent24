<?php

include 'db.php';

class User {
    private $db;

    public function __construct(Database $db) {
        // Inject the database connection into the User class
        $this->db = $db;
    }

    public function usernameExists($username) {
        // Prepare the SQL statement
        $stmt = $this->db->getConnection()->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count > 0) {
            return json_encode(["success" => false, "message" => "Username already exists."]);
        } else {
            return json_encode(["success" => true, "message" => "Username is available."]);
        }
    }

    public function emailExists($email) {
        // Prepare the SQL statement
        $stmt = $this->db->getConnection()->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count > 0) {
            return json_encode(["success" => false, "message" => "Email already exists."]);
        } else {
            return json_encode(["success" => true, "message" => "Email is available."]);
        }
    }

    public function addUser($username, $email, $password) {
        // Check if username or email already exists
        $usernameFeedback = json_decode($this->usernameExists($username), true);
        $emailFeedback = json_decode($this->emailExists($email), true);

        if (!$usernameFeedback['success']) {
            return json_encode($usernameFeedback);
        }

        if (!$emailFeedback['success']) {
            return json_encode($emailFeedback);
        }

        // Prepare the SQL statement for inserting a new user
        $stmt = $this->db->getConnection()->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        // Execute the statement
        if ($stmt->execute()) {
            // Fetch the new user ID
            $newUserId = $stmt->insert_id;

            // Prepare the SQL statement for inserting into the Vendor table
            $stmtVendor = $this->db->getConnection()->prepare("INSERT INTO Vendor (user_id) VALUES (?)");
            $stmtVendor->bind_param("i", $newUserId);

            // Execute the statement for Vendor table
            if ($stmtVendor->execute()) {
                return json_encode(["success" => true, "message" => "Your account has been created. You can now proceed to log in!"]);
            } else {
                return json_encode(["success" => false, "message" => "User created but failed to add to Vendor table."]);
            }
        } else {
            return json_encode(["success" => false, "message" => "Failed to add user."]);
        }
    }


    public function login($identifier, $password) {
        $db = $this->db->getConnection();

        // Check if the identifier is an email
        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $field = 'email';
        } else {
            // Otherwise, treat it as a username
            $field = 'username';
            // Validate the username to ensure it only contains alphanumeric characters and underscores
            if (!preg_match('/^\w+$/', $identifier)) {
                return json_encode(["success" => false, "message" => "Invalid username format."]);
            }
        }

        // Prepare the SQL statement to fetch the user based on the identifier
        $stmt = $db->prepare("SELECT username, email, password FROM users WHERE $field = ?");
        if ($stmt === false) {
            return json_encode(["success" => false, "message" => "Database error."]);
        }

        $stmt->bind_param("s", $identifier);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Bind results to variables
            $stmt->bind_result($username, $email, $hashedPassword);
            $stmt->fetch();

            // Verify the password
            if (password_verify($password, $hashedPassword)) {
                $stmt->close();
                // Return success response
                return json_encode([
                    "success" => true,
                    "message" => "Login successful.",
                    "user" => ["username" => $username, "email" => $email]
                ]);
            } else {
                $stmt->close();
                return json_encode(["success" => false, "message" => "Incorrect password."]);
            }
        } else {
            $stmt->close();
            // No user found with this identifier
            return json_encode(["success" => false, "message" => "User not found."]);
        }
    }

    // Function to get user details by email
    public function getUserByEmail_OLD($email) {
        // Validate the email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return json_encode(["success" => false, "message" => "Invalid email format."]);
        }

        // Get a connection to the database
        $db = $this->db->getConnection();

        // Prepare a SQL statement to fetch user details based on email
        $stmt = $db->prepare("SELECT user_id, username, email, privilege FROM users WHERE email = ?");
        if ($stmt === false) {
            return json_encode(["success" => false, "message" => "Database error."]);
        }

        // Bind the email parameter and execute the query
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Bind the result to variables
            $stmt->bind_result($user_id, $username, $email, $privilege);
            $stmt->fetch();

            // Close the statement
            $stmt->close();

            // Return the user information as a JSON-encoded response
            return json_encode([
                "success" => true,
                "user" => [
                    "user_id" => $user_id,
                    "username" => $username,
                    "email" => $email,
                    "privilege" => $privilege,
                ]
            ]);
        } else {
            // Close the statement and return user not found
            $stmt->close();
            return json_encode(["success" => false, "message" => "User not found."]);
        }
    }

    // Function to get user details by email
    public function getUserByEmail($email) {
        // Validate the email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return json_encode(["success" => false, "message" => "Invalid email format."]);
        }

        // Get a connection to the database
        $db = $this->db->getConnection();

        // Prepare a SQL statement to fetch user details based on email
        $stmt = $db->prepare("SELECT user_id, username, email, privilege FROM users WHERE email = ?");
        if ($stmt === false) {
            return json_encode(["success" => false, "message" => "Database error."]);
        }

        // Bind the email parameter and execute the query
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Bind the result to variables
            $stmt->bind_result($user_id, $username, $email, $privilege);
            $stmt->fetch();

            // Fetch vendor details based on the user_id
            $vendor_stmt = $db->prepare("SELECT status, profile_pic, phone_number, state, address, localgovt, city, sex, birth, nin, firstname, lastname FROM Vendor WHERE user_id = ?");
            if ($vendor_stmt === false) {
                return json_encode(["success" => false, "message" => "Database error."]);
            }

            // Bind the user_id parameter and execute the query
            $vendor_stmt->bind_param("i", $user_id);
            $vendor_stmt->execute();
            $vendor_stmt->store_result();

            if ($vendor_stmt->num_rows > 0) {
                // Bind the result to variables
                $vendor_stmt->bind_result($status, $profile_pic, $phone_number, $state, $address, $localgovt, $city, $sex, $birth, $nin, $firstname, $lastname);
                $vendor_stmt->fetch();

                // Close the statements
                $stmt->close();
                $vendor_stmt->close();

                // Return the user and vendor information as a JSON-encoded response
                return json_encode([
                    "success" => true,
                    "user" => [
                        "user_id" => $user_id,
                        "username" => $username,
                        "email" => $email,
                        "privilege" => $privilege,
                    ],
                    "vendor" => [
                        "status" => $status,
                        "profile_pic" => $profile_pic,
                        "phone_number" => $phone_number,
                        "state" => $state,
                        "address" => $address,
                        "localgovt" => $localgovt,
                        "city" => $city,
                        "sex" => $sex,
                        "birth" => $birth,
                        "nin" => $nin,
                        "firstname" => $firstname,
                        "lastname" => $lastname,
                    ]
                ]);
            } else {
                // Close the statements
                $stmt->close();
                $vendor_stmt->close();

                // Return user information without vendor details
                return json_encode([
                    "success" => true,
                    "user" => [
                        "user_id" => $user_id,
                        "username" => $username,
                        "email" => $email,
                        "privilege" => $privilege,
                    ],
                    "vendor" => null
                ]);
            }
        } else {
            // Close the statement and return user not found
            $stmt->close();
            return json_encode(["success" => false, "message" => "User not found."]);
        }
    }


    public function updateVendor($user_id, $file, $phone_number, $state, $address, $localgovt, $city, $sex, $birth, $nin, $firstname, $lastname) {
        $profile_pic_path = null;

        // Check if a file was uploaded
        if ($file['error'] == UPLOAD_ERR_OK) {
            // Define the directory where the file will be saved
            $upload_dir = $_SERVER['DOCUMENT_ROOT'] . '/rent24ng/backend/inc/uploads/profile_pics/';

            // Ensure the upload directory exists
            if (!is_dir($upload_dir)) {
                if (!mkdir($upload_dir, 0777, true)) {
                    return json_encode(["success" => false, "message" => "Failed to create upload directory."]);
                }
            }

            // Ensure the directory is writable
            if (!is_writable($upload_dir)) {
                if (!chmod($upload_dir, 0777)) {
                    return json_encode(["success" => false, "message" => "Upload directory is not writable."]);
                }
            }

            // Generate a unique file name to avoid collisions
            $file_name = uniqid() . '_' . basename($file['name']);
            $profile_pic_path = $upload_dir . $file_name;

            // Move the file to the upload directory
            if (!move_uploaded_file($file['tmp_name'], $profile_pic_path)) {
                error_log("Failed to move uploaded file: " . $file['tmp_name'] . " to " . $profile_pic_path);
                return json_encode(["success" => false, "message" => "Failed to upload profile picture."]);
            }

            // Convert the profile picture path to a URL
            $profile_pic_url = '/rent24ng/backend/inc/uploads/profile_pics/' . $file_name;
        }

        // Prepare the SQL statement for updating the Vendor table
        $stmt = $this->db->getConnection()->prepare("
            UPDATE Vendor
            SET profile_pic = COALESCE(?, profile_pic), phone_number = ?, state = ?, address = ?, localgovt = ?, city = ?, sex = ?, birth = ?, nin = ?, firstname = ?, lastname = ?
            WHERE user_id = ?
        ");
        $stmt->bind_param("sssssssssssi",
            $profile_pic_url,
            $phone_number,
            $state,
            $address,
            $localgovt,
            $city,
            $sex,
            $birth,
            $nin,
            $firstname,
            $lastname,
            $user_id
        );

        // Execute the statement
        if ($stmt->execute()) {
            return json_encode(["success" => true, "message" => "Vendor information has been updated successfully."]);
        } else {
            return json_encode(["success" => false, "message" => "Failed to update vendor information."]);
        }
    }

    // Get all category
    public function getAllCategories() {
        // Get a connection to the database
        $db = $this->db->getConnection();

        // Prepare a SQL statement to fetch all category details
        $stmt = $db->prepare("SELECT category_id, category_name, add_date FROM category");
        if ($stmt === false) {
            return json_encode(["success" => false, "message" => "Database error."]);
        }

        // Execute the query
        $stmt->execute();
        $stmt->store_result();

        // Check if there are any results
        if ($stmt->num_rows > 0) {
            // Bind the result to variables
            $stmt->bind_result($category_id, $category_name, $add_date);

            // Create an array to hold the categories
            $categories = [];

            // Fetch all categories
            while ($stmt->fetch()) {
                $categories[] = [
                    "category_id" => $category_id,
                    "category_name" => $category_name,
                    "add_date" => $add_date
                ];
            }

            // Close the statement
            $stmt->close();

            // Return the category information as a JSON-encoded response
            return json_encode([
                "success" => true,
                "categories" => $categories
            ]);
        } else {
            // Close the statement and return no categories found
            $stmt->close();
            return json_encode(["success" => false, "message" => "No categories found."]);
        }
    }

    // Insert Item
    public function addRentalItem($category, $itemName, $description, $price, $availability, $vendor_id, $video, $number_of_items, $file, $location) {
        $slogo = $itemName.'-'.$vendor_id;
        $slogoFeedback = json_decode($this->slogoExists($slogo), true);

        if (!$slogoFeedback['success']) {
            return json_encode($slogoFeedback);
        }

        // Check if the file array is set and not null
        if (is_null($file) || !isset($file['error'])) {
            return json_encode(["success" => false, "message" => "No file uploaded or invalid file upload."]);
        }

        // Define the directory where images will be saved
        $upload_dir = $_SERVER['DOCUMENT_ROOT'] . '/rent24ng/backend/inc/uploads/rental_items/';

        // Ensure the upload directory exists
        if (!is_dir($upload_dir)) {
            if (!mkdir($upload_dir, 0777, true)) {
                return json_encode(["success" => false, "message" => "Failed to create upload directory."]);
            }
        }

        // Ensure the directory is writable
        if (!is_writable($upload_dir)) {
            if (!chmod($upload_dir, 0777)) {
                return json_encode(["success" => false, "message" => "Upload directory is not writable."]);
            }
        }

        // Prepare the SQL statement for inserting a new rental item
        $stmt = $this->db->getConnection()->prepare(
            "INSERT INTO RentalItem (ItemName, category, Description, Price, Availability, user_id, Video, number_of_items,location,slogo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)"
        );
        $stmt->bind_param("sssdsisiss", $itemName, $category, $description, $price, $availability, $vendor_id, $video, $number_of_items, $location, $slogo);

        // Execute the statement
        if ($stmt->execute()) {
            // Fetch the new RentalItem ID
            $newRentalItemId = $stmt->insert_id;

            // Prepare the SQL statement for inserting an image
            $stmtImage = $this->db->getConnection()->prepare(
                "INSERT INTO ItemImage (RentalItem_id, ImagePath) VALUES (?, ?)"
            );

            // Handle the uploaded file
            if ($file['error'] == UPLOAD_ERR_OK) {
                $tempName = $file['tmp_name'];
                $uniqueFileName = uniqid() . '_' . basename($file['name']);
                $filePath = $upload_dir . $uniqueFileName;

                if (move_uploaded_file($tempName, $filePath)) {
                    $fileUrl = '/rent24ng/backend/inc/uploads/rental_items/' . $uniqueFileName;
                    $stmtImage->bind_param("is", $newRentalItemId, $fileUrl);

                    if (!$stmtImage->execute()) {
                        return json_encode(["success" => false, "message" => "Failed to add image path: $fileUrl"]);
                    }
                } else {
                    error_log("Failed to move uploaded file: " . $tempName . " to " . $filePath);
                    return json_encode(["success" => false, "message" => "Failed to upload image: " . $file['name']]);
                }
            } else {
                return json_encode(["success" => false, "message" => "No image uploaded or upload error."]);
            }

            return json_encode(["success" => true, "message" => "Rental item and image added successfully."]);
        } else {
            return json_encode(["success" => false, "message" => "Failed to add rental item."]);
        }
    }

    // Get all Item or get item by category
    public function getRentalItems($page = 1, $category_id = null) {
        // Calculate the offset for pagination
        $itemsPerPage = 20;
        $offset = ($page - 1) * $itemsPerPage;

        if ($category_id === null) {
            // Prepare the SQL statement to retrieve all rental items with pagination
            $stmt = $this->db->getConnection()->prepare(
                "SELECT r.ItemID, r.ItemName, r.category, r.Description, r.Price, r.Availability, r.user_id, r.Video, r.number_of_items, r.location, r.slogo, i.ImagePath
                 FROM RentalItem r
                 LEFT JOIN ItemImage i ON r.ItemID = i.RentalItem_id
                 LIMIT ? OFFSET ?"
            );
            $stmt->bind_param("ii", $itemsPerPage, $offset);
        } else {
            // Prepare the SQL statement to retrieve rental items by category with pagination
            $stmt = $this->db->getConnection()->prepare(
                "SELECT r.ItemID, r.ItemName, r.category, r.Description, r.Price, r.Availability, r.user_id, r.Video, r.number_of_items, r.location, r.slogo, i.ImagePath
                 FROM RentalItem r
                 LEFT JOIN ItemImage i ON r.ItemID = i.RentalItem_id
                 WHERE r.category = ?
                 LIMIT ? OFFSET ?"
            );
            $stmt->bind_param("iii", $category_id, $itemsPerPage, $offset);
        }

        // Execute the statement
        if ($stmt->execute()) {
            // Fetch the results
            $result = $stmt->get_result();
            $items = [];

            while ($row = $result->fetch_assoc()) {
                $rentalItemId = $row['ItemID'];
                if (!isset($items[$rentalItemId])) {
                    $items[$rentalItemId] = [
                        "ItemID" => $row["ItemID"],
								"ItemName" => $row["ItemName"],
                        "category" => $row["category"],
                        "Description" => $row["Description"],
                        "Price" => $row["Price"],
                        "Availability" => $row["Availability"],
                        "user_id" => $row["user_id"],
                        "Video" => $row["Video"],
                        "number_of_items" => $row["number_of_items"],
                        "location" => $row["location"],
                        "slogo" => $row["slogo"],
                        "images" => []
                    ];
                }

                if ($row['ImagePath']) {
                    $items[$rentalItemId]['images'][] = $row['ImagePath'];
                }
            }

            return json_encode(["success" => true, "data" => array_values($items)]);
        } else {
            return json_encode(["success" => false, "message" => "Failed to retrieve rental items."]);
        }
    }

    // Get Item by id
    // Get all Items, get items by category, or get a single item by ID
    public function getItemById($page = 1, $category_id = null, $item_id = null) {
        // Calculate the offset for pagination
        $itemsPerPage = 20;
        $offset = ($page - 1) * $itemsPerPage;
    
        // Check if an item ID is provided
        if ($item_id !== null) {
            // Prepare the SQL statement to retrieve a single rental item with all images and vendor name
            $stmt = $this->db->getConnection()->prepare(
                "SELECT r.ItemID, r.ItemName, r.category, r.Description, r.Price, r.Availability, r.user_id, r.Video, r.number_of_items, r.location, r.slogo, i.ImagePath,
                 v.firstname, v.lastname
                 FROM RentalItem r
                 LEFT JOIN ItemImage i ON r.ItemID = i.RentalItem_id
                 LEFT JOIN Vendor v ON r.user_id = v.user_id
                 WHERE r.ItemID = ?"
            );
            $stmt->bind_param("i", $item_id);
        } elseif ($category_id === null) {
            // Prepare the SQL statement to retrieve all rental items with pagination and vendor name
            $stmt = $this->db->getConnection()->prepare(
                "SELECT r.ItemID, r.ItemName, r.category, r.Description, r.Price, r.Availability, r.user_id, r.Video, r.number_of_items, r.location, r.slogo, i.ImagePath,
                 v.firstname, v.lastname
                 FROM RentalItem r
                 LEFT JOIN ItemImage i ON r.ItemID = i.RentalItem_id
                 LEFT JOIN Vendor v ON r.user_id = v.user_id
                 LIMIT ? OFFSET ?"
            );
            $stmt->bind_param("ii", $itemsPerPage, $offset);
        } else {
            // Prepare the SQL statement to retrieve rental items by category with pagination and vendor name
            $stmt = $this->db->getConnection()->prepare(
                "SELECT r.ItemID, r.ItemName, r.category, r.Description, r.Price, r.Availability, r.user_id, r.Video, r.number_of_items, r.location, r.slogo, i.ImagePath,
                 v.firstname, v.lastname
                 FROM RentalItem r
                 LEFT JOIN ItemImage i ON r.ItemID = i.RentalItem_id
                 LEFT JOIN Vendor v ON r.user_id = v.user_id
                 WHERE r.category = ?
                 LIMIT ? OFFSET ?"
            );
            $stmt->bind_param("iii", $category_id, $itemsPerPage, $offset);
        }
    
        // Execute the statement
        if ($stmt->execute()) {
            // Fetch the results
            $result = $stmt->get_result();
            if ($item_id !== null) {
                // Single item case
                $row = $result->fetch_assoc();
                if ($row) {
                    $item = [
                        "ItemID" => $row["ItemID"],
                        "ItemName" => $row["ItemName"],
                        "category" => $row["category"],
                        "Description" => $row["Description"],
                        "Price" => $row["Price"],
                        "Availability" => $row["Availability"],
                        "vendor_id" => $row["user_id"],
                        "Video" => $row["Video"],
                        "number_of_items" => $row["number_of_items"],
                        "location" => $row["location"],
                        "slogo" => $row["slogo"],
                        "vendor_firstname" => $row["firstname"],
                        "vendor_lastname" => $row["lastname"],
                        "images" => []
                    ];
    
                    // Iterate over result to fetch all images
                    do {
                        if ($row['ImagePath']) {
                            $item['images'][] = $row['ImagePath'];
                        }
                    } while ($row = $result->fetch_assoc());
    
                    return json_encode(["success" => true, "data" => $item]);
                } else {
                    return json_encode(["success" => false, "message" => "Item not found."]);
                }
            } else {
                // Multiple items case
                $items = [];
                while ($row = $result->fetch_assoc()) {
                    $rentalItemId = $row['ItemID'];
                    if (!isset($items[$rentalItemId])) {
                        $items[$rentalItemId] = [
                            "ItemID" => $row["ItemID"],
                            "ItemName" => $row["ItemName"],
                            "category" => $row["category"],
                            "Description" => $row["Description"],
                            "Price" => $row["Price"],
                            "Availability" => $row["Availability"],
                            "vendor_id" => $row["user_id"],
                            "Video" => $row["Video"],
                            "number_of_items" => $row["number_of_items"],
                            "location" => $row["location"],
                            "slogo" => $row["slogo"],
                            "vendor_firstname" => $row["firstname"],
                            "vendor_lastname" => $row["lastname"],
                            "images" => []
                        ];
                    }
    
                    if ($row['ImagePath']) {
                        $items[$rentalItemId]['images'][] = $row['ImagePath'];
                    }
                }
    
                return json_encode(["success" => true, "data" => array_values($items)]);
            }
        } else {
            return json_encode(["success" => false, "message" => "Failed to retrieve rental items."]);
        }
    }
    


    // check if slogo exit
    public function slogoExists($slogo) {
        // Prepare the SQL statement
        $stmt = $this->db->getConnection()->prepare("SELECT COUNT(*) FROM RentalItem WHERE slogo = ?");
        $stmt->bind_param("s", $slogo);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count > 0) {
            return json_encode(["success" => false, "message" => "This item already exists in your account."]);
        } else {
            return json_encode(["success" => true, "message" => "item is available."]);
        }
    }


    // submit a rental items
    public function rentItem($paymentId, $startDate, $endDate, $quantity, $itemId, $userId, $vendorId, $totalPrice) {
        // Prepare the SQL statement for inserting a new rental item
        $stmt = $this->db->getConnection()->prepare("INSERT INTO rentals (payment_id, start_date, end_date, quantity, item_id, user_id, vendor_id, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiissi", $paymentId, $startDate, $endDate, $quantity, $itemId, $userId, $vendorId, $totalPrice);
    
        // Execute the statement
        if ($stmt->execute()) {
            return json_encode(["success" => true, "message" => "Item rented successfully."]);
        } else {
            return json_encode(["success" => false, "message" => "Failed to rent item."]);
        }
    }


    // approve payment
    public function callbackRentItem($paymentId) {
        // Prepare the SQL statement for updating the rental status
        $stmt = $this->db->getConnection()->prepare("UPDATE rentals SET status = 'Approved' WHERE payment_id = ?");
        $stmt->bind_param("s", $paymentId);
    
        // Execute the statement
        if ($stmt->execute()) {
            return json_encode(["success" => true, "message" => "Item status updated to Approved."]);
        } else {
            return json_encode(["success" => false, "message" => "Failed to update item status."]);
        }
    }
    
    
    



    // Add more methods as needed, such as updateUser(), deleteUser(), getUserById(), etc.
}


?>