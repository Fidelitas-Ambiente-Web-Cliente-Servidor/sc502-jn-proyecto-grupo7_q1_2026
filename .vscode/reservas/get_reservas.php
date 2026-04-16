<?php
header('Content-Type: application/json');
include '../config/db.php';

// Esta consulta une las 3 tablas (JOIN)
$sql = "SELECT r.id, c.nombre as cliente_nombre, p.nombre_tour as paquete_nombre, r.fecha_reserva as fecha, r.estado 
        FROM reservas r
        JOIN clientes c ON r.id_cliente = c.id
        JOIN paquetes p ON r.id_paquete = p.id";

$result = $conn->query($sql);
$reservas = [];

while($row = $result->fetch_assoc()) {
    $reservas[] = $row;
}

echo json_encode($reservas);
?>