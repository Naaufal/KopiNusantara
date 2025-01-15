<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['table_number'], $data['order_items'], $data['total'], $data['payment_method'])) {
        throw new Exception("Data pesanan tidak lengkap");
    }

    if (!is_array($data['order_items'])) {
        throw new Exception("Order items harus berupa array");
    }

    if (!in_array($data['payment_method'], ['cash', 'card', 'qr'])) {
        throw new Exception("Metode pembayaran tidak valid");
    }

    $database = new Database();
    $conn = $database->connect();

    $orderItemsJson = json_encode($data['order_items']);

    $stmt = $conn->prepare("INSERT INTO orders (table_number, order_items, total_amount, payment_method, status) 
                            VALUES (:table, :items, :total, :payment, 'paid')");
    $stmt->bindParam(':table', $data['table_number']);
    $stmt->bindParam(':items', $orderItemsJson);
    $stmt->bindParam(':total', $data['total']);
    $stmt->bindParam(':payment', $data['payment_method']);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Pesanan berhasil disimpan",
            "pesanan_id" => $conn->lastInsertId(),
            "payment_method" => $data['payment_method']
        ]);
    } else {
        throw new Exception("Gagal menyimpan pesanan ke database");
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    if (isset($database)) {
        $database->close();
    }
}
?>
