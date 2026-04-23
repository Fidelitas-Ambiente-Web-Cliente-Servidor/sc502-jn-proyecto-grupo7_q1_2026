<?php
header('Content-Type: application/json');
include '../config/db.php';

$sql = "SELECT nombre, correo, telefono, documento FROM clientes";
$result = $conn->query($sql);

$clientes = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
}

echo json_encode($clientes);
?>