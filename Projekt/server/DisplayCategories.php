<?php
require "db.lib.php";

session_start();
//Verbindung herstellen
$database = dbsConnect();

$table = "Kategorie";
$field = "KategorieName";

$data = dbsMultipleValuesNoClause($database, $table, $field);

//while($row = $result->fetch_assoc())

/*while($row = $data->fetch_assoc()) {
    $result[] = $row;
}*/

echo json_encode($data);

 ?>
