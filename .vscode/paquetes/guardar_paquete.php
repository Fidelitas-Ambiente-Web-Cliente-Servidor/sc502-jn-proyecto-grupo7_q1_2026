<?php
header('Content-Type: application/json');
include '../config/db.php';

// 1. Recibimos los datos (Asegúrate que estos coincidan con el 'name' de tu HTML)
$nombre      = $_POST['nombre_paquete'] ?? ''; 
$destino     = $_POST['destino'] ?? '';
$precio      = $_POST['precio'] ?? 0;
$descripcion = $_POST['descripcion'] ?? '';

// 2. Verificamos que no lleguen vacíos
if(empty($nombre) || empty($destino)) {
    echo json_encode(["success" => false, "error" => "El nombre o el destino llegaron vacíos desde el formulario."]);
    exit;
}

// 3. La consulta SQL (Asegúrate que los nombres de las columnas en tu BD sean iguales)
$sql = "INSERT INTO paquetes (nombre_tour, destino, precio, descripcion) 
        VALUES ('$nombre', '$destino', '$precio', '$descripcion')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    // Si hay un error en el SQL, aquí nos dirá qué pasó
    echo json_encode(["success" => false, "error" => "Error de MySQL: " . $conn->error]);
}
?>