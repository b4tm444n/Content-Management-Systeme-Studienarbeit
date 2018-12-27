<?php
require "db.lib.php";

//Verbindung herstellen
$database = dbsConnect();

$query = "SELECT ThemeDateiPfad as css FROM Theme WHERE Verwendet = '1'";

$data = dbsSelect($database, $query);
echo json_encode($data);

 ?>
