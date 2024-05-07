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

        // Prepare the SQL statement
        $stmt = $this->db->getConnection()->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        // Execute the statement
        if ($stmt->execute()) {
            return json_encode(["success" => true, "message" => "Your account has been created. You can now proceed to log in!"]);
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
    
    // Add more methods as needed, such as updateUser(), deleteUser(), getUserById(), etc.
}


?>