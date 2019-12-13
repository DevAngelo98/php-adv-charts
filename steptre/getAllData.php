<?php 
header('Content-Type: application/json');
include "controllo.php";
echo json_encode($graphs);
?>