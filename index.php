<?php

$requestUri = trim($_SERVER['REQUEST_URI'], '/');
$segments = explode('/', $requestUri);

$message="You are not supposed to be here. Go back to your task.";
if (empty($segments[0])) {
    require 'handlers/message.php';
    exit;
}


$username = ucfirst(strtolower($segments[0]));

if (count($segments) === 1) {
    $message="Hello, $username! Welcome to your task!";
    require 'handlers/message.php';
    exit;
}

if ($segments[1] === 'fruits') {
	header("Content-Type: application/json");
    require 'handlers/fruits.php';
    exit;
}

http_response_code(404);
require 'handlers/message.php';

?>
