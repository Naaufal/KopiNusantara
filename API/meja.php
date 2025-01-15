<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

try {
    if (!isset($_GET['nomor'])) {
        throw new Exception("Nomor meja tidak diberikan");
    }

    $database = new Database();
    $conn = $database->connect();
    
    $query = "SELECT status FROM meja WHERE nomor = :nomor";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nomor', $_GET['nomor']);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode([
            "status" => $result['status'],
            "message" => "Status meja berhasil diperiksa"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Meja tidak ditemukan"
        ]);
    }

} catch(Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$database->close();
?>