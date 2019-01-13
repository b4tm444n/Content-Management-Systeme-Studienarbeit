<?php
require "db.lib.php";

session_start();
//Verbindung herstellen
$db = dbsConnect();

// Entferne Token
$_SESSION['token'] = null;
// Zerstöre Session
session_destroy();
// Melde Erfolg
echo json_encode(true);

?>
