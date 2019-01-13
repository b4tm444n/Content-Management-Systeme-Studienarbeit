<?php
require_once "db.lib.php";
require_once "themeLayoutFuncs.php";
// Router-Datei für die Theme und Layout Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der themeLayoutFuncs.php-Datei bezogen

// Route zur Rückgabe des Dateipfads des aktuellen Themes
if($_POST['route'] == 'currentThemePath')
{
   $data = getCurrentThemePath($database);
   echo json_encode($data);
}
// Route zur Rückgabe der ID des aktuellen Themes
if($_POST['route'] == 'currentThemeID')
{
   $data = getCurrentThemeID($database);
   echo json_encode($data);
}
// Route zur Rückgabe aller Namen und IDs aller Themes
else if($_POST['route'] == 'allThemeNamesIDs')
{
  $data = getAllThemeNamesIDs($database);
  echo json_encode($data);
}
// Route zur Rückgabe des Dateipfads eines Themes anhand der ID
else if($_POST['route'] == 'themePath'  && isset($_POST['themeID']))
{
  $data = getThemePathByID($database, $_POST['themeID']);
  echo json_encode($data);
}
// Route zum Setzen des aktuellen Themes
else if($_POST['route'] == 'activateTheme'  && isset($_POST['themeID']))
{
  $data = activateTheme($database, $_POST['themeID']);
  echo json_encode($data);
}
// Route zur Rückgabe des Dateipfads des aktuellen Layouts
else if($_POST['route'] == 'currentLayoutPath')
{
   $data = getCurrentLayoutPath($database);
   echo json_encode($data);
}
// Route zur Rückgabe der ID des aktuellen Layouts
else if($_POST['route'] == 'currentLayoutID')
{
   $data = getCurrentLayoutID($database);
   echo json_encode($data);
}
// Route zur Rückgabe aller Namen und IDs aller Layouts
else if($_POST['route'] == 'allLayoutNamesIDs')
{
  $data = getAllLayoutNamesIDs($database);
  echo json_encode($data);
}
// Route zur Rückgabe des Dateipfads eines Layouts anhand der ID
else if($_POST['route'] == 'LayoutPath'  && isset($_POST['LayoutID']))
{
  $data = getLayoutPathByID($database, $_POST['LayoutID']);
  echo json_encode($data);
}
// Route zum Setzen des aktuellen Layouts
else if($_POST['route'] == 'activateLayout'  && isset($_POST['layoutID']))
{
  $data = activateLayout($database, $_POST['layoutID']);
  echo json_encode($data);
}
// Route zum Uploaden einer Layoutdatei mit entsprechenden Datenbankeinträgen
else if($_POST['route'] == 'uploadLayout')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['layoutPath']) && !empty($_POST['layoutName']) && isset($_FILES['layoutFile']))
  {
    $data = uploadLayout($database, $_POST['layoutPath'], $_POST['layoutName'], $_FILES['layoutFile']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zum Uploaden einer Themedatei mit entsprechenden Datenbankeinträgen
else if($_POST['route'] == 'uploadTheme')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['themePath']) && !empty($_POST['themeName']) && isset($_FILES['themeFile']))
  {
    $data = uploadTheme($database, $_POST['themePath'], $_POST['themeName'], $_FILES['themeFile']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else return null;
?>
