<?php
session_start();

$data = array("name" => "Projekt 1", "picture" => "proj.jpg", "author" => "Max Muster", "state" => "In Bearbeitung");

echo json_encode($data);
?>
