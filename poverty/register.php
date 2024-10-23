<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$servername = "localhost";
$username = "home"; 
$password = "home"; 
$dbname = "home"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request and sanitize
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO user (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "New record created successfully"; // Indicate success
    } else {
        echo "Error: " . $stmt->error; // Provide specific error details
    }

    $stmt->close();
}

$conn->close();
?>
