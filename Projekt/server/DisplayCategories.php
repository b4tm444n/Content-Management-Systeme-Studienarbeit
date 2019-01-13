<?php
require "db.lib.php";

//Verbindung herstellen
$database = dbsConnect();

$table = "Kategorie";
$field = "KategorieName";
// Frage alle Kategorienamen in der Datenbank ab
$data = dbsMultipleValuesNoClause($database, $table, $field);
echo json_encode($data);

 ?>
