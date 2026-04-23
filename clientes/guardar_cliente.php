<?php
include("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $documento = $_POST['documento'];

    $sql = "INSERT INTO clientes (nombre, correo, telefono, documento)
            VALUES ('$nombre', '$correo', '$telefono', '$documento')";

    if ($conn->query($sql) === TRUE) {
        echo "Cliente registrado correctamente";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>