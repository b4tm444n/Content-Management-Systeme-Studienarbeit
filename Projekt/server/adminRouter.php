<?php
require_once "db.lib.php";
require_once "adminFuncs.php";
// Router-Datei für die Admin Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der adminFuncs.php-Datei bezogen

// Route für das Aktivieren eines Titelbilds
if($_POST['route'] == 'setTitlePic')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(isset($_POST['picID']))
  {
    $data = setTitlePic($database, $_POST['picID']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zum Abrufen aller Titelbilddaten, sowie der ID des aktuellen Titelbilds
else if($_POST['route'] == 'getIndexPicture')
{
  $data = getIndexPicture($database);
  echo json_encode($data);
}
// Route zum Hochladen eines Titelbilds
else if($_POST['route'] == 'uploadTitlePic')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['picPath']) && !empty($_POST['picName']) && isset($_FILES['picFile']))
  {
    $data = uploadTitlePic($database, $_POST['picPath'], $_POST['picName'], $_FILES['picFile']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zur Abfrage des Dateipfads des aktuellen Titelbilds
else if($_POST['route'] == 'getCurrentIndexPicture')
{
  $data = getCurrentIndexPicture($database);
  echo json_encode($data);
}
else return null;
?>
