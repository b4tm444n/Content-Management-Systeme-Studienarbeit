<?php
require_once "db.lib.php";
require_once "themeLayoutFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'currentThemePath')
{
   $data = getCurrentThemePath($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'allThemeNamesIDs')
{
  $data = getAllThemeNamesIDs($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'themePath'  && isset($_POST['themeID']))
{
  $data = getThemePathByID($database, $_POST['themeID']);
  echo json_encode($data);
}
else if($_POST['route'] == 'activateTheme'  && isset($_POST['themeID']))
{
  $data = activateTheme($database, $_POST['themeID']);
  echo json_encode($data);
}
else return null;
?>
