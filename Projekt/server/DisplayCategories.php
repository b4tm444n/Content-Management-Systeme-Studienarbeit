<?php
require "db.lib.php";

//Verbindung herstellen
$database = dbsConnect();

$table = "Kategorie";
$field = "KategorieName";

$data = dbsMultipleValuesNoClause($database, $table, $field);
echo json_encode($data);

 ?>
