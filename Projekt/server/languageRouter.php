<?php
require_once "db.lib.php";
require_once "languageFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'currentLaguageLabels')
{
   $data = getCurrentLaguageLabels($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'getAllLanguages')
{
   $data = getAllLanguages($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'activateLanguage'  && isset($_POST['languageID']))
{
  $data = activateLanguage($database, $_POST['languageID']);
  echo json_encode($data);
}

else return null;
?>
