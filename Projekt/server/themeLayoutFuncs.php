<?php
require_once "db.lib.php";

//Funktionen für Themes
function getCurrentThemePath($database)
{
  $data = dbsSingleValue($database, "Theme", "ThemeDateiPfad", "Verwendet='1'");
  return($data);
}

function getAllThemeNamesIDs($database)
{
  $selectionSQL = "SELECT Name, ThemeDateiPfad,  ThemeID FROM theme";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

function getThemePathByID($database, $themeID)
{
  $data = dbsSingleValue($database, "theme", "ThemeDateiPfad", "ThemeID=".$themeID);
  return($data);
}

function activateTheme($database, $themeID)
{
  $deactivateSQL = "UPDATE theme SET Verwendet=0 WHERE Verwendet='1'";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    $activateSQL = "UPDATE theme SET Verwendet='1' WHERE ThemeID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}


//Funktionen für Layouts
function getCurrentLayoutPath($database)
{
  $data = dbsSingleValue($database, "layout", "LayoutDateiPfad", "Verwendet='1'");
  return($data);
}

function getAllLayoutNamesIDs($database)
{
  $selectionSQL = "SELECT Name, LayoutDateiPfad,  LayoutID FROM layout";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

function getLayoutPathByID($database, $themeID)
{
  $data = dbsSingleValue($database, "layout", "LayoutDateiPfad", "LayoutID=".$themeID);
  return($data);
}

function activateLayout($database, $themeID)
{
  $deactivateSQL = "UPDATE layout SET Verwendet=0 WHERE Verwendet='1'";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    $activateSQL = "UPDATE layout SET Verwendet='1' WHERE LayoutID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}

?>
