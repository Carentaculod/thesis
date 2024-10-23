<?php
// Database connection
$servername = "localhost";
$username = "home"; // default username
$password = "home"; // default password
$dbname = "home"; // replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO user (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password); // "ss" means both are strings

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
