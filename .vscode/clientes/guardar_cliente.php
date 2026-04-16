<?php
// Esto evita que cualquier error de PHP ensucie la respuesta JSON
header('Content-Type: application/json');
error_reporting(E_ALL); 
ini_set('display_errors', 0); // Que no los pinte en pantalla

try {
    $ruta_db = __DIR__ . '/../config/db.php';
    
    if (!file_exists($ruta_db)) {
        throw new Exception("No se encuentra el archivo de conexion en: " . $ruta_db);
    }

    include $ruta_db;

    $nombre    = $_POST['nombre']    ?? '';
    $correo    = $_POST['correo']    ?? '';
    $telefono  = $_POST['telefono']  ?? '';
    $documento = $_POST['documento'] ?? '';

    if (empty($nombre) || empty($documento)) {
        throw new Exception("Nombre y Documento son obligatorios.");
    }

    $sql = "INSERT INTO clientes (nombre, correo, telefono, documento) VALUES ('$nombre', '$correo', '$telefono', '$documento')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        throw new Exception("Error MySQL: " . $conn->error);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>