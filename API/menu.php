<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

try {
    $database = new Database();
    $conn = $database->connect();
    
    $query = "SELECT * FROM menu";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $menu = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "data" => $menu
    ]);

} catch(Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Gagal mengambil data menu"
    ]);
}

$database->close();
?>