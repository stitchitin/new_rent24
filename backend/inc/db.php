<?php

class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = 'startman';
    private $database = 'rent24';
    private $connection;

    public function __construct() {
        // Establish the database connection
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        // Check connection
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function closeConnection() {
        $this->connection->close();
    }
}




?>
