<?php
require "db.lib.php";
require "projectFuncs.php";

session_start();
//Verbindung herstellen
$database = dbsConnect();
$column = "Benennung";

$data = getColumnFromAllProjects($database, $column);
echo json_encode($data);

?>
