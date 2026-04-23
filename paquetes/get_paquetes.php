<?php
header('Content-Type: application/json');
include '../config/db.php';

$sql = "SELECT id, nombre_tour, destino, precio, descripcion FROM paquetes";
$result = $conn->query($sql);

$paquetes = [];
while($row = $result->fetch_assoc()) {
    $paquetes[] = $row;
}

echo json_encode($paquetes);
?>