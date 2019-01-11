<?php
require_once "db.lib.php";

//Funktionen für Themes
function getCurrentThemePath($database)
{
  $data = dbsSingleValue($database, "Theme", "ThemeDateiPfad", "Verwendet=1");
  return($data);
}

  //ID des verwendeten themes
function getCurrentThemeID($database)
{
  $data = dbsSingleValue($database, "Theme", "ThemeID", "Verwendet=1");
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
  $deactivateSQL = "UPDATE theme SET Verwendet=0 WHERE Verwendet=1";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    $activateSQL = "UPDATE theme SET Verwendet=1 WHERE ThemeID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}


//Funktionen für Layouts
function getCurrentLayoutPath($database)
{
  $data = dbsSingleValue($database, "layout", "LayoutDateiPfad", "Verwendet=1");
  return($data);
}

function getCurrentLayoutID($database)
{
  $data = dbsSingleValue($database, "layout", "LayoutID", "Verwendet=1");
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
  $deactivateSQL = "UPDATE layout SET Verwendet=0 WHERE Verwendet=1";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    $activateSQL = "UPDATE layout SET Verwendet=1 WHERE LayoutID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}

function uploadLayout($database, $layoutPath, $layoutName, $layoutFile)
{
  $maxIDSQL = "SELECT MAX(LayoutID) AS maxID FROM layout";
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    $maxID = $maxID->fetch_assoc();
    $curID = intval($maxID['maxID']) + 1;
    $layoutType = pathinfo($layoutFile['name'], PATHINFO_EXTENSION);
    $finalPath = $layoutPath.$layoutName."_".strval($curID).".".$layoutType;
    $layoutSQL = "INSERT INTO layout (LayoutDateiPfad, Verwendet, Name) VALUES ('".$finalPath."', 0, '".$layoutName."')";
    if(dbsBeginTransaction($database, $layoutSQL))
    {
      if(dbsUploadFile($layoutFile, $layoutName."_".strval($curID).".".$layoutType, $layoutPath))
      {
        $database->commit();
        return true;
      }
      else
      {
        $database->rollback();
        return false;
      }
    }
  }
  else return false;
}

function uploadTheme($database, $themePath, $themeName, $themeFile)
{
  $maxIDSQL = "SELECT MAX(ThemeID) AS maxID FROM theme";
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    $maxID = $maxID->fetch_assoc();
    $curID = intval($maxID['maxID']) + 1;
    $themeType = pathinfo($themeFile['name'], PATHINFO_EXTENSION);
    $finalPath = $themePath.$themeName."_".strval($curID).".".$themeType;
    $themeSQL = "INSERT INTO theme (ThemeDateiPfad, Verwendet, Name) VALUES ('".$finalPath."', 0, '".$themeName."')";
    if(dbsBeginTransaction($database, $themeSQL))
    {
      if(dbsUploadFile($themeFile, $themeName."_".strval($curID).".".$themeType, $themePath))
      {
        $database->commit();
        return true;
      }
      else
      {
        $database->rollback();
        return false;
      }
    }
  }
  else return false;
}

?>
