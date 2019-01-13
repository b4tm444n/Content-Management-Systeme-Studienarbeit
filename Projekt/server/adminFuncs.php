<?php
require_once "db.lib.php";

// getIndexPicture: Liefert die Daten aller Titelbilder für die Webseite und
// zusätzlich die ID des aktuell ausgewählten Titelbilds zurück.
function getIndexPicture($database)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
  $sql = "SELECT * FROM IndexTitelbild";
  $pictureData = dbsSelect($database, $sql);
  $resultArray = array();
  $pictures = array();
  // Überprüfe ob Daten gefunden
  if(isset($pictureData))
  {
    while($dataRow = $pictureData->fetch_assoc())
    {
       array_push($pictures, $dataRow);
    }
    // Rufe zusätzlich die ID des aktuellen Titelbilds ab
    $currentID = dbsSingleValue($database, "indextitelbild", "IndexTitelbildID", "Verwendet=1");
    $resultArray = array("picData" => $pictures, "curID" => $currentID);
  }
  return $resultArray;
}

// setTitlePic: Deaktiviert das aktuelle Titelbild und aktiviert das gewünschte
// Titelbild anhand der übergebenen ID.
function setTitlePic($database, $index)
{
  // Überprüfe, ob übergebener Parameter korrekt ist
  if(is_numeric($index))
  {
    // Deaktiviere aktuelles Titelbild
    $sql = "UPDATE indextitelbild SET Verwendet='0' WHERE IndexTitelbildID<>'".$index."'";
    if(dbsBeginTransaction($database, $sql))
    {
      // Aktiviere Titelbild anhand der übergebenen ID
      $setTitlepicSQL = "UPDATE indextitelbild SET Verwendet='1' WHERE IndexTitelbildID='".$index."'";
      return dbsEndTransaction($database, $setTitlepicSQL);
    }
    return false;
  }
  return false;
}

// uploadTitlePic: Erstellt die benötigten Tabelleneinträge für ein Titelbild
// und lädt die übergebene Datei in einen Ordner(titleImages) im Projekt hoch.
function uploadTitlePic($database, $picturePath, $pictureName, $pictureFile)
{
  // Frage ID des letzten Tabelleneintrags ab
  $maxIDSQL = "SELECT MAX(IndexTitelbildID) AS maxID FROM indextitelbild";
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    // Erhöhe ID um 1 und erzeuge den Dateinamen/-pfad
    $maxID = $maxID->fetch_assoc();
    $curID = intval($maxID['maxID']) + 1;
    $picType = pathinfo($pictureFile['name'], PATHINFO_EXTENSION);
    $finalPath = $picturePath.$pictureName."_".strval($curID).".".$picType;
    // Füge Dateidaten in die Datenbank ein
    $pictureSQL = "INSERT INTO indextitelbild(BildDateiPfad, Verwendet, Name) VALUES ('".$finalPath."', 0, '".$pictureName."')";
    if(dbsBeginTransaction($database, $pictureSQL))
    {
      // Lade Datei in den angegebenen Ordner hoch
      if(dbsUploadFile($pictureFile, $pictureName."_".strval($curID).".".$picType, $picturePath))
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

// getCurrentIndexPicture: Liefert den Dateipfad des aktuellen aktivierten
// Titelbilds zurück.
function getCurrentIndexPicture($database)
{
  return dbsSingleValue($database, "indextitelbild", "BildDateiPfad", "Verwendet=1");
}

?>
