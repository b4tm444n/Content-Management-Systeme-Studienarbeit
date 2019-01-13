<?php
require_once "db.lib.php";

// getAllCategories: Liefert alle Daten von allen Kategorien zurück.
function getAllCategories($database)
{
   // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT * FROM kategorie";
   $categorieData = dbsSelect($database, $sql);
   $categories = array();
   while($dataRow = $categorieData->fetch_assoc())
   {
      array_push($categories, $dataRow);
   }
   return $categories;
}

// createCategorie: Erstellt die Datenbankeinträge für eine neue Kategorie.
function createCategorie($database, $categorieName)
{
  $sql = "INSERT INTO kategorie (KategorieName) VALUES ('".$categorieName."')";
  $execute = dbsExecuteSQL($database, $sql);
  return $execute;
}

// deleteCategorie: Löscht alle zugehörigen Daten einer Kategorie anhand der
// übergebenen ID aus der Datenbank.
function deleteCategorie($database, $id)
{
  // Versuche den Kategorieeintrag in einer Transaktion zu löschen
  $delCategorieSql = "DELETE FROM kategorie WHERE KategorieID=".$id;
  if(dbsBeginTransaction($database, $delCategorieSql))
  {
    // Sammle alle IDs der Projekt die dieser Kategorie zugeordnet sind
    $allProjectsWithCategory = dbsMultipleValues($database, "projekt_kategorie", "ProjektID", "KategorieID=".$id);
    if(isset($allProjectsWithCategory))
    {
      foreach ($allProjectsWithCategory as $key => $projectID)
      {
        // Wenn das Projekt nur dieser gelöschten Kategorie zugeordnet ist, lösche
        // weitere zugehörige Projektdaten aus der Datenbank
        if(dbsCheckIfSingleEntry($database, "projekt_kategorie", "ProjektID=".$projectID))
        {
          $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delProjSql)) return false;
          $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delProjUserSql)) return false;
          $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delDesSql)) return false;
        }
      }
    }
    // Lösche alle Zuordnungen zu der gelöschten Kategorie
    $delProjCatSql = "DELETE FROM projekt_kategorie WHERE KategorieID=".$id;
    if(!dbsAddTransaction($database, $delProjCatSql)) return false;
    $database->commit();
    return true;
  }
}
?>
