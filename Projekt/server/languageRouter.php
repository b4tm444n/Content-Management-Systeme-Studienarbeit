<?php
require_once "db.lib.php";
require_once "languageFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'currentLaguage')
{
   $data = getCurrentLanguage($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'currentLaguageLabels' && isset($_POST['website']))
{
   $data = getCurrentLaguageLabels($database, $_POST['website']);
   echo json_encode($data);
}
else if($_POST['route'] == 'languageLabels')
{
  if(!empty($_POST['language']) && !empty($_POST['website']))
  {
   $data = getLaguageLabels($database, $_POST['language'], $_POST['website']);
   echo json_encode($data);
  }
  else echo('Nicht alle nötigen Daten übergeben.');
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
else if ($_POST['route'] == 'insertLanguage')
{
  if(!empty($_POST['languageData']) && !empty($_POST['standardLanguage']))
  {
    $data = insertLanguage($database, $_POST['languageData'], $_POST['standardLanguage']);
    echo json_encode($data);
  }
  else echo('Nicht alle nötigen Daten übergeben.');
}

else return null;
?>
