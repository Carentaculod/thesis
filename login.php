<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = 'localhost'; // Change if necessary
$db = 'home'; // Change to your database name
$user = 'home'; // Change to your database username
$pass = 'home'; // Change to your database password

// Create a connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare and bind
$stmt = $conn->prepare("SELECT password FROM user WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

// Check if user exists
if ($stmt->num_rows > 0) {
    // User exists, verify password
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    // Verify the password
    if (password_verify($password, $hashedPassword)) {
        // Password is correct
        echo "Login successful";
    } else {
        // Password is incorrect
        echo "Invalid email or password.";
    }
} else {
    // User does not exist
    echo "Invalid email or password.";
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
