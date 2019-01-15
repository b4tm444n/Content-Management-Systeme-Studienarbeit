<?php
require_once "db.lib.php";

// getCurrentLanguage: Liefert den Namen der aktuellen Sprache zurück.
function getCurrentLanguage($database)
{
  $data = dbsSingleValue($database, "Sprache", "Name", "Standard=1");
  return($data);
}

// getCurrentLanguage: Liefert die ID der aktuellen Sprache zurück.
function getCurrentLanguageID($database)
{
  $data = dbsSingleValue($database, "Sprache", "SpracheID", "Standard=1");
  return($data);
}

// getCurrentLanguageLabels: Liefert die Textwerte für HTML-Elemente eines
// bestimmten Webseitenbereichs zurück.
function getCurrentLaguageLabels($database, $website)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $selectionSQL = "SELECT Text, Element.Html_ID
                   FROM ELEMENT_SPRACHE
                   INNER JOIN Sprache
                    ON ELEMENT_SPRACHE.SpracheID = Sprache.SpracheID
                   INNER JOIN Element
                    ON ELEMENT_SPRACHE.ElementID = Element.ElementID
                   WHERE Sprache.Standard = 1 AND Element.HtmlSeite='".$website."'";

  $entrys = dbsSelect($database, $selectionSQL);
  $languageLabelArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($languageLabelArray, $row);
  }
  return($languageLabelArray);
}

// getLanguageLabels: Liefert die Textwerte für HTML-Elemente eines
// bestimmten Webseitenbereichs anhand der übergebenen Sprache zurück.
function getLaguageLabels($database, $language, $website)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $selectionSQL = "SELECT Text, Element.Html_ID
                   FROM ELEMENT_SPRACHE
                   INNER JOIN Sprache
                    ON ELEMENT_SPRACHE.SpracheID = Sprache.SpracheID
                   INNER JOIN Element
                    ON ELEMENT_SPRACHE.ElementID = Element.ElementID
                   WHERE Sprache.Name ='".$language."' AND Element.HtmlSeite='".$website."'";

  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

// getAllLanguages: Liefert den Namen und die ID aller Spracheinträge aus
// der Datenbank.
function getAllLanguages($database)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $selectionSQL = "SELECT DISTINCT Name, SpracheID FROM sprache";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

// activateLanguage: Deaktiviert die aktuelle Sprache und aktiviert die
// gewünschte Sprache anhand der übergebenen ID.
function activateLanguage($database, $languageID)
{
  // Deaktiviere die aktuelle Sprache
  $deactivateSQL = "UPDATE sprache SET Standard=0 WHERE Standard=1";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    // Aktiviere die gewünschte Sprache
    $activateSQL = "UPDATE sprache SET Standard=1 WHERE SpracheID=".$languageID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}

// insertLanguage: Fügt die gewünschte Sprache in die Datenbank ein.
function insertLanguage($database, $languageData, $standardLanguage)
{
  // Erzeuge SQL-Befehl und starte Datenbankupdate
  $SQL = "INSERT INTO Sprache (Name, Standard) VALUES ('".$languageData."', $standardLanguage)";
  $result = dbsExecuteSQL($database, $SQL);

  if($result){
    // Gebe die ID der eingefügten Sprache zurück
    $lastID = $database->insert_id;
    return $lastID;
  }
  else
  {
    return null;
  }
}

// insertLanguageElements: Fügt die Texte einer Sprache für die HTML-Elemente
// in die Datenbank ein.
function insertLanguageElements($database, $allElements)
{
  $database->begin_transaction();
  $database->autocommit(FALSE);
  foreach ($allElements as $key => $element) {
    // Füge die Daten für jedes einzelne übergebene Element in die Datenbank ein
    $insertElementSQL = "INSERT INTO element_sprache (SpracheID, ElementID, Text) VALUES ('".$element['lanID']."', '".$element['eleID']."', '".$element['eleText']."')";
    if(!dbsAddTransaction($database, $insertElementSQL))
    {
      return false;
    }
  }
  $database->commit();
  return true;
}

// getLanguageItems: Gibt ein Array mit den ElementIDs und den zugehörigen
// Texten der gewünschten Sprache anhand der ID zurück.
function getLanguageItems($database, $id)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $languageItemsSQL = "SELECT ElementID AS id, Text AS text FROM element_sprache WHERE SpracheID=".$id;
  $languageItems = dbsSelect($database, $languageItemsSQL);
  $allItems = array();
  if(isset($languageItems))
  {
    while($row = $languageItems->fetch_assoc())
    {
      $allItems[$row['id']] = $row['text'];
    }
    return $allItems;
  }
  else return null;
}

?>
