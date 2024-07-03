<?php

class Database{
    private $host = 'localhost';
    private $dbname = 'rent24';
    private $username = 'root';
    private $password = 'startmen';

    public function __construct(){
        $this->connect();
    }

    private function connect(){
        try{
            $this->conn = new POD("mysql:host=$this->host;dbname=$this->dbname, $this->username, $this->password");
            $this->conn->setAttribute(PDO:: ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e){
            die("Connection failed:". $e->getMessage());
        }
    }

    public function query($sql, $params = []){
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function getLastInsertId(){
        return $this->conn->lastInsertId();
    }
}



?>