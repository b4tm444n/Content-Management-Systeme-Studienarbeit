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
if($_POST['route'] == 'currentThemeID')
{
   $data = getCurrentThemeID($database);
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
if($_POST['route'] == 'currentLayoutID')
{
   $data = getCurrentLayoutID($database);
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
else if($_POST['route'] == 'uploadLayout')
{
  if(!empty($_POST['layoutPath']) && !empty($_POST['layoutName']) && isset($_FILES['layoutFile']))
  {
    $data = uploadLayout($database, $_POST['layoutPath'], $_POST['layoutName'], $_FILES['layoutFile']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'uploadTheme')
{
  if(!empty($_POST['themePath']) && !empty($_POST['themeName']) && isset($_FILES['themeFile']))
  {
    $data = uploadTheme($database, $_POST['themePath'], $_POST['themeName'], $_FILES['themeFile']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else return null;
?>
