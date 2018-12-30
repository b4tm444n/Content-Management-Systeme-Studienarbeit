<?php
require_once "db.lib.php";
require_once "themeLayoutFuncs.php";
session_start();
$database = dbsConnect();

//Routen für Themes
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
//Routen für Layouts
if($_POST['route'] == 'currentLayoutPath')
{
   $data = getCurrentLayoutPath($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'allLayoutNamesIDs')
{
  $data = getAllLayoutNamesIDs($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'LayoutPath'  && isset($_POST['LayoutID']))
{
  $data = getLayoutPathByID($database, $_POST['LayoutID']);
  echo json_encode($data);
}
else if($_POST['route'] == 'activateLayout'  && isset($_POST['layoutID']))
{
  $data = activateLayout($database, $_POST['layoutID']);
  echo json_encode($data);
}

else return null;
?>
