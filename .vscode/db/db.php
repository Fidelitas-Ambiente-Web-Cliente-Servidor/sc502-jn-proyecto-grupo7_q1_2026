// db.php
$host = "db"; // En Docker, el host es el nombre del servicio en el compose
$user = "root";
$pass = "root";
$db   = "tours_db";

$conn = new mysqli($host, $user, $pass, $db);