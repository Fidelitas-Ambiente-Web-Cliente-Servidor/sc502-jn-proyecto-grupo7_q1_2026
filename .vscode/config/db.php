<?php
$host = "db"; 
$user = "root";
$pass = "root"; 
$dbname = "tours_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>