<?php
header('Content-Type: application/json');
include '../config/db.php';

// Atrapamos los datos del FormData
$id_cliente = $_POST['id_cliente'] ?? '';
$id_paquete = $_POST['id_paquete'] ?? '';
$fecha      = $_POST['fecha_reserva'] ?? '';
$estado     = $_POST['estado'] ?? 'Pendiente';

if (empty($id_cliente) || empty($id_paquete) || empty($fecha)) {
    echo json_encode(["success" => false, "error" => "Faltan datos obligatorios"]);
    exit;
}

// INSERTAR EN LA BASE DE DATOS
$sql = "INSERT INTO reservas (id_cliente, id_paquete, fecha_reserva, estado) 
        VALUES ('$id_cliente', '$id_paquete', '$fecha', '$estado')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>