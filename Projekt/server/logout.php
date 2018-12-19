<?php
require "db.lib.php";

session_start();
//Verbindung herstellen
$db = dbsConnect();
$_SESSION['token'] = null;
session_destroy();
echo json_encode(true);

?>
