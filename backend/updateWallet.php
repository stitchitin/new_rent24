<?php
header('Content-Type: application/json');
include 'inc/function.php';


$database = new Database();

// Initialize the User class with the Database object
$userManager = new User($database);

$result = $userManager->updateWallet();

echo $result;




?>