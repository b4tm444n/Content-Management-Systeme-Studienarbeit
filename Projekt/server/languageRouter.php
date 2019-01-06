<?php
require_once "db.lib.php";
require_once "languageFuncs.php";
session_start();
$database = dbsConnect();

//Routen für Themes
if($_POST['route'] == 'currentLaguageLabels')
{
   $data = getCurrentLaguageLabels($database);
   echo json_encode($data);
}


else return null;
?>
