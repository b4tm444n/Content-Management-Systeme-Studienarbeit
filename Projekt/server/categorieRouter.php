<?php
require_once "db.lib.php";
require_once "categorieFuncs.php";
// Router-Datei für die Kategorie Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der categorieFuncs.php-Datei bezogen

// Route zur Rückgabe der Kategorieeinträge aller Kategorien
if($_POST['route'] == 'all')
{
  $data = getAllCategories($database);
  echo json_encode($data);
}
// Route für die Erstellung einer neuen Kategorie
else if($_POST['route'] == 'create')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['categorieName']))
  {
    $result = createCategorie($database, $_POST['categorieName']);
    if($result) echo json_encode(true);
    else echo json_encode(false);
  }
  else echo json_encode(false);
}
// Route zum Löschen einer vorhandenen Kategorie
else if($_POST['route'] == 'delete' && !empty($_POST['id']))
{
  $data = deleteCategorie($database, $_POST['id']);
  echo json_encode($data);
}
else return null;
?>
