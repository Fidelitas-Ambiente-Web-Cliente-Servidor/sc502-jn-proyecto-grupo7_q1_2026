<?php
include("config/db.php");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

echo "Conexión exitosa 🚀";
?>