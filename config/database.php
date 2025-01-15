<?php
class Database
{
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "kopinusantara";
    private $conn;

    public function __construct()
    {
        // Constructor added
    }

    public function connect()
    {
        try {
            $this->conn = new PDO(
                "mysql:host=$this->host;dbname=$this->database",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
            return $this->conn;
        } catch (PDOException $e) {
            error_log("Connection error: " . $e->getMessage());
            throw new Exception("Koneksi database gagal: " . $e->getMessage());
        }
    }

    public function close()
    {
        $this->conn = null;
    }
}

// Test koneksi langsung
if (defined('TESTING_MODE')) {
    try {
        $db = new Database();
        $conn = $db->connect();
        echo "Database connection successful\n";
        $db->close();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}
?>