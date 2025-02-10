<?php

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST method is allowed"]);
    exit;
}

$inputData = json_decode(file_get_contents("php://input"), true);

if (!isset($inputData["fruit"]) || !is_string($inputData["fruit"])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing 'fruit' parameter"]);
    exit;
}

if (!isset($inputData["amount"]) || !is_numeric($inputData["amount"])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing 'amount' parameter"]);
    exit;
}

$fruit = trim($inputData["fruit"]);
$amount = (int)$inputData["amount"];

// Business Logic: Example - Check if the amount is positive
if ($amount > 0) {
    http_response_code(200);
    echo json_encode(["message" => "Hi $username, you have ordered $amount of $fruit."]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Amount must be greater than zero."]);
}

?>
