<?php
$host = "db";        
$user = "root";
$password = "root";
$database = "tours_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>