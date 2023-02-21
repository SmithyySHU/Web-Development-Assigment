<?php
// Start session
session_start();

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get username and password from form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate username and password
    if ($username == 'connor' && $password == 'password123') {
        // Authentication successful
        $_SESSION['username'] = $username;
        header('Location: index.html');
        exit;
    } else {
        // Authentication failed
        $error = 'Invalid username or password. Please try again.';
    }
}
?>