<?php
require_once "db.lib.php";

// getCurrentThemePath: Gibt den aktuellen Dateipfad der entsprechenden
// css-Datei für das aktuell gewählte Theme zurück.
function getCurrentThemePath($database)
{
  $data = dbsSingleValue($database, "Theme", "ThemeDateiPfad", "Verwendet=1");
  return($data);
}

// getCurrentThemeID: Gibt die ID des aktuellen Themes zurück.
function getCurrentThemeID($database)
{
  $data = dbsSingleValue($database, "Theme", "ThemeID", "Verwendet=1");
  return($data);
}

// getAllThemeNamesIDs: Gibt alle Themeeinträge zurück. Jeweils Name,
// Dateipfad und ID.
function getAllThemeNamesIDs($database)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $selectionSQL = "SELECT Name, ThemeDateiPfad,  ThemeID FROM theme";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

// getThemePathByID: Gibt den Dateipfad anhand der Theme-ID zurück.
function getThemePathByID($database, $themeID)
{
  $data = dbsSingleValue($database, "theme", "ThemeDateiPfad", "ThemeID=".$themeID);
  return($data);
}

// activateTheme: Deaktiviert das aktuelle Theme und aktiviert das gewünschte
// Theme anhand dessen ID.
function activateTheme($database, $themeID)
{
  // Deaktiviere aktuelles Theme
  $deactivateSQL = "UPDATE theme SET Verwendet=0 WHERE Verwendet=1";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    // Aktiviere gewünschtes Theme
    $activateSQL = "UPDATE theme SET Verwendet=1 WHERE ThemeID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}


// getCurrentLayoutPath: Gibt den aktuellen Dateipfad der entsprechenden
// css-Datei für das aktuell gewählte Layout zurück.
function getCurrentLayoutPath($database)
{
  $data = dbsSingleValue($database, "layout", "LayoutDateiPfad", "Verwendet=1");
  return($data);
}

// getCurrentLayoutID: Gibt die ID des aktuellen Layouts zurück.
function getCurrentLayoutID($database)
{
  $data = dbsSingleValue($database, "layout", "LayoutID", "Verwendet=1");
  return($data);
}

// getAllLayoutNamesIDs: Gibt alle Themeeinträge zurück. Jeweils Name,
// Dateipfad und ID.
function getAllLayoutNamesIDs($database)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $selectionSQL = "SELECT Name, LayoutDateiPfad,  LayoutID FROM layout";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

// getLayoutPathByID: Gibt den Dateipfad anhand der Theme-ID zurück.
function getLayoutPathByID($database, $themeID)
{
  $data = dbsSingleValue($database, "layout", "LayoutDateiPfad", "LayoutID=".$themeID);
  return($data);
}

// activateLayout: Deaktiviert das aktuelle Layout und aktiviert das gewünschte
// Layout anhand dessen ID.
function activateLayout($database, $themeID)
{
  // Deaktiviere aktuelles Layout
  $deactivateSQL = "UPDATE layout SET Verwendet=0 WHERE Verwendet=1";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    // Aktiviere gewünschtes Layout
    $activateSQL = "UPDATE layout SET Verwendet=1 WHERE LayoutID=".$themeID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}

// uploadLayout: Lädt die übergebene Datei in einen Ordner(layoutFiles) des Projekts hoch
// und führt die entsprechenden Datenbankeinträge für das neue Layout durch.
function uploadLayout($database, $layoutPath, $layoutName, $layoutFile)
{
  // Frage Wert des letzten Tabelleneintrags ab
  $maxIDSQL = "SELECT MAX(LayoutID) AS maxID FROM layout";
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    $maxID = $maxID->fetch_assoc();
    // Erhöhe den Wert um 1 und erzeuge Dateinamen/-pfad
    $curID = intval($maxID['maxID']) + 1;
    $layoutType = pathinfo($layoutFile['name'], PATHINFO_EXTENSION);
    $finalPath = $layoutPath.$layoutName."_".strval($curID).".".$layoutType;
    // Erzeuge Datenbankeintrag und lade Datei hoch
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

// uploadTheme: Lädt die übergebene Datei in einen Ordner(themeFiles) des Projekts hoch
// und führt die entsprechenden Datenbankeinträge für das neue Theme durch.
function uploadTheme($database, $themePath, $themeName, $themeFile)
{
  // Frage Wert des letzten Tabelleneintrags ab
  $maxIDSQL = "SELECT MAX(ThemeID) AS maxID FROM theme";
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    $maxID = $maxID->fetch_assoc();
    // Erhöhe den Wert um 1 und erzeuge Dateinamen/-pfad
    $curID = intval($maxID['maxID']) + 1;
    $themeType = pathinfo($themeFile['name'], PATHINFO_EXTENSION);
    $finalPath = $themePath.$themeName."_".strval($curID).".".$themeType;
    // Erzeuge Datenbankeintrag und lade Datei hoch
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
