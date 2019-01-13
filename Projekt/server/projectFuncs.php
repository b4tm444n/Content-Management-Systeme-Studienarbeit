<?php
require_once "db.lib.php";

// getAllProjects: Gibt alle Projektdaten und die Beschreibungen für
// alle Projekteinträge zurück.
function getAllProjects($database)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT projekt.*, beschreibung.text FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID";
   $projectData = dbsSelect($database, $sql);
   $projects = array();
   if(isset($projectData))
   {
     while($dataRow = $projectData->fetch_assoc())
     {
        array_push($projects, $dataRow);
     }
   }
   return $projects;
}

// getColumnFromAllProjects: Liefert Daten eines Feldes für alle Projekte zurück.
function getColumnFromAllProjects($database, $column)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT $column FROM projekt";
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow[$column]);
   }
   return $projects;
}

// getNameDesProjects: Liefert Namen, ID, Zustand und Beschreibung aller Projekte.
function getNameDesProjects($database)
{
   // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT projekt.Benennung AS name, projekt.ProjektID AS id, projekt.Zustand AS state, beschreibung.Text AS description FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID";
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}
// getCategorieProjects: Liefert Namen, ID, Zustand und Beschreibung aller Projekte
// einer bestimmten Kategorie
function getCategorieProjects($database, $column, $categorie)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT projekt.Benennung AS Benennung, projekt.ProjektID AS id, projekt.Zustand AS state, beschreibung.Text AS beschreibung FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID INNER JOIN projekt_kategorie ON projekt.ProjektID = projekt_kategorie.ProjektID INNER JOIN kategorie ON projekt_kategorie.KategorieID = kategorie.KategorieID WHERE kategorie.KategorieName='$categorie'";
   if($projectData = dbsSelect($database, $sql))
   {
     $projects = array();
     while($dataRow = $projectData->fetch_assoc())
     {
        array_push($projects, $dataRow);
     }
     return $projects;
   }
   return null;
}

// getCategories: Liefert alle Kategorien ausschließlich der übergebenen IDs
// zurück.
function getCategories($database, $exclCats)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT KategorieID AS CatID, KategorieName AS CatName FROM kategorie";
   if(!empty($exclCats))
   {
     // Schließe Kategorien aus
     $sql .= " WHERE KategorieID<>".$exclCats[0];
     for ($i = 1; $i < count($exclCats); $i++) {
       $sql .= " AND KategorieID<>".$exclCats[$i];
     }
   }
   $categories = array();
   if($categoriesData = dbsSelect($database, $sql))
   {
     while($dataRow = $categoriesData->fetch_assoc())
     {
        array_push($categories, $dataRow);
     }
   }
   return $categories;
}

// getProjectDetails: Liefert alle Projektdaten eines Projekts anhand der
// übergebenen ID.
function getProjectDetails($database, $id)
{
  // Überprüfe ob übergebene ID numerisch
   if(is_numeric($id))
   {
     // Erzeuge SQL-Befehl und starte Datenbankabfrage
     $sql = "SELECT * FROM projekt WHERE ProjektID=$id";
      $projectData = dbsSingleRow($database);
      return $projectData;
   }
   return null;

}

// getUserProjects: Liefert Namen, Zustand, ID und Beschreibung aller
// Projekte von denen der Nutzer Projektleiter ist.
function getUserProjects($database, $NutzerID)
{
  // Überprüfe ob übergebene ID numerisch
   if(is_numeric($NutzerID))
   {
     // Erzeuge SQL-Befehl und starte Datenbankabfrage
     $sql = "SELECT projekt.Benennung AS Benennung, projekt.ProjektID AS id, projekt.Zustand AS state, beschreibung.Text AS beschreibung FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID WHERE projekt.Projektleiter=$NutzerID";
     $projectData = dbsSelect($database, $sql);
     $projects = array();
     if($projectData != null)
     {
       while($dataRow = $projectData->fetch_assoc())
       {
          array_push($projects, $dataRow);
       }
     }
     return $projects;
   }
   return null;
}

// setProjectState: Ändert den Zustandseintrag eines Projekts anhand der
// übergebenen ID.
function setProjectState($database, $projectID, $state)
{
  // Überprüfe ob übergebene ID numerisch
  if(is_numeric($projectID))
  {
    // Erzeuge SQL-Befehl und starte Datenbankupdate
    $stateSQL = "UPDATE projekt SET Zustand='".$state."' WHERE ProjektID=".$projectID;
    if(dbsExecuteSQL($database, $stateSQL))
    {
      return true;
    }
    else return false;
  }
}

// checkProjectLeadership: Überprüft anhand der übergebenen ID, ob der
// aktuelle Nutzer der Projektleiter eines Projekts ist.
function checkForProjectLeadership($database, $projectID, $nutzerID)
{
  // Überprüfe ob übergebene IDs numerisch
  if(is_numeric($projectID) && is_numeric($nutzerID))
  {
    // Erzeuge SQL-Befehl und starte Datenbankabfrage
    $checkLeaderSQL = "SELECT * FROM projekt WHERE Projektleiter=$nutzerID AND ProjektID=$projectID";
    $leaderEntry = dbsSelect($database, $checkLeaderSQL);
    if($leaderEntry != null)
    {
      return true;
    }
  }
  return false;
}

// checkProjectMembership: Überprüft anhand der übergebenen ID, ob der
// aktuelle Nutzer an einem Projekt teilnimmt oder dessen Projektleiter ist.
function checkForProjectMembership($database, $projectID, $nutzerID)
{
  // Überprüfe ob übergebene IDs numerisch
  if(is_numeric($projectID) && is_numeric($nutzerID))
  {
    // Erzeuge SQL-Befehl und starte Datenbankabfrage
    $checkMemberSQL = "SELECT * FROM projekt_nutzer WHERE NutzerID=$nutzerID AND ProjektID=$projectID";
    $memberEntry = dbsSelect($database, $checkMemberSQL);
    // Prüfe zusätzlich ob Projektleiter
    if(checkForProjectLeadership($database, $projectID, $nutzerID) || $memberEntry != null)
    {
      return true;
    }
  }
  return false;
}

// getMemberProjects: Liefert Namen, Zustand, ID und Beschreibung aller
// Projekte an denen der Nutzer beteiligt ist.
function getMemberProjects($database, $NutzerID)
{
  // Überprüfe ob übergebene ID numerisch
   if(is_numeric($NutzerID))
   {
     // Suche nach Projekten bei denen der Nutzer Teilnehmer ist
     // Erzeuge SQL-Befehl und starte Datenbankabfrage
     $memberSQL = "SELECT ProjektID AS id FROM projekt_nutzer WHERE NutzerID=$NutzerID";
     $memberData = dbsSelect($database, $memberSQL);
     $projectIDs = array();
     if($memberData != null)
     {
       while($row = $memberData->fetch_assoc())
       {
         array_push($projectIDs, $row['id']);
       }
     }
     // Verwende die IDs der Projekte um die zugehörigen Projektdaten abzufragen
     $sqlProjectIDs = join("','", $projectIDs);
     $sql = "SELECT projekt.Benennung AS Benennung, projekt.ProjektID AS id, projekt.Zustand AS state, beschreibung.Text AS beschreibung FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID WHERE projekt.ProjektID IN ('$sqlProjectIDs')";
     $projectData = dbsSelect($database, $sql);
     $projects = array();
     if($projectData != null)
     {
       while($dataRow = $projectData->fetch_assoc())
       {
          array_push($projects, $dataRow);
       }
     }
     // Lade zusätzlich die Projekte, bei denen der Nutzer Projektleiter ist
     $userProjects = getUserProjects($database, $NutzerID);
     foreach ($userProjects as $key => $userProject) {
       array_push($projects, $userProject);
     }
     return $projects;
   }
   return null;
}

// createProject: Erzeugt die benötigten Einträge für das Projekt in der
// Datenbank und lädt das gewünschte Projektbild in einen Ordner im
// Projekt(projectImages) hoch.
function createProject($database, $projectLeader, $picturePath, $pictureType, $projectName, $description, $desLanguage, $knowHow, $state, $rights, $webLink, $gitLink, $projCategoryIDs, $pictureFile)
{
  // Extrahiere IDs der gewünschten Kategorien
  $projCategoryIDs = explode(",",$projCategoryIDs);
  // Lese Dateityp aus
  $pictureType = pathinfo($pictureFile['name'], PATHINFO_EXTENSION);
  $result = false;
  // Mache sämtliche Datenbankeinträge innerhalb einer Transaktion und lade dabei
  // die Bilddatei hoch
  // Projektbildeintrag
  $pictureSQL = "INSERT INTO titelbild (Pfad, Dateityp) VALUES ('".$picturePath."', '".$pictureType."')";
  if(dbsBeginTransaction($database, $pictureSQL))
  {
    $pictureID = $database->insert_id;
    // Bilddateiupload
    if(dbsUploadFile($pictureFile, $pictureID.".".$pictureType, $picturePath))
    {
      // Projekteintrag
      $projectSQL = "INSERT INTO projekt (Projektleiter, Zustand, TitelbildID, Benennung, Rechte, GesuchtesKnowHow, TrelloTasks, WebpageLink, GitHubLink) VALUES ($projectLeader, '".$state."', $pictureID, '".$projectName."', $rights, '".$knowHow."', 0, '".$webLink."', '".$gitLink."')";
      if(dbsAddTransaction($database, $projectSQL))
      {
        $projectID = $database->insert_id;
        // Projektbeschreibungseintrag
        $descriptionSQL = "INSERT INTO beschreibung(ProjektID, Sprache, Text) VALUES ('".$projectID."', '".$desLanguage."', '".$description."')";
        if(dbsAddTransaction($database, $descriptionSQL))
        {
          // Eintrag der Projektkategorien
          for($i = 0; $i < count($projCategoryIDs); ++$i) {
            // Wenn letzter Kategorieeintrag beende die Transaktion
            if($i == (count($projCategoryIDs)-1))
            {
              $categorySQL = "INSERT INTO projekt_kategorie(ProjektID, KategorieID) VALUES ('".$projectID."', '".$projCategoryIDs[$i]."')";
              $result = dbsEndTransaction($database, $categorySQL);
            }
            else
            {
              $categorySQL = "INSERT INTO projekt_kategorie(ProjektID, KategorieID) VALUES ('".$projectID."', '".$projCategoryIDs[$i]."')";
              if(!dbsAddTransaction($database, $categorySQL))
              {
                $result = false;
                break;
              }
            }
          }
        }
      }
    }
  }
  return $result;
}

// leaveProject: Entfernt den aktuellen Nutzer aus der Teilnehmerliste eines
// Projekts anhand der übergebenen ID.
function leaveProject($database, $userid, $projectID)
{
  // Erzeuge SQL-Befehl und starte Datenbankupdate
  $insertUserProjectSql = "DELETE FROM projekt_nutzer WHERE NutzerID=$userid AND ProjektID=$projectID";
  return dbsExecuteSQL($database, $insertUserProjectSql);
}

// joinProject: Fügt den aktuellen Nutzer als Teilnehmer eines Projekts
// anhand der übergebenen ID hinzu.
function joinProject($database, $userid, $projectID)
{
  // Erzeuge SQL-Befehl und starte Datenbankupdate
  $insertUserProjectSql = "INSERT INTO projekt_nutzer (NutzerID, ProjektID)
                          VALUES ($userid, $projectID) ";
  return dbsExecuteSQL($database, $insertUserProjectSql);
}

// getProjectDetails: Liefert alle Projektdaten eines Projekts anhand der
// übergebenen ID.
function getProjectInformation($database, $projectID)
{
  $result = false;
  // Suche alle Projektteilnehmer und frage dessen Nutzernamen ab
  $projectMemberIDs = dbsMultipleValues($database, "projekt_nutzer", "NutzerID", "ProjektID=".$projectID);
  $memberNamesArray = array();
  if(isset($projectMemberIDs))
  {
    foreach ($projectMemberIDs as $key => $memberID)
    {
      $memberNamesSql = "SELECT Username AS username FROM nutzer WHERE NutzerID=".$memberID;
      $memberData = dbsSelect($database, $memberNamesSql);
      while($row = $memberData->fetch_assoc())
      {
        array_push($memberNamesArray, $row['username']);
      }
    }
  }
  // Frage die benötigten Projektdaten ab
  $projIDNameDesLeaderSql = "SELECT projekt.Benennung AS name, projekt.TitelbildID AS picID, projekt.Zustand AS state, projekt.Projektleiter AS projectLeaderID, projekt.GesuchtesKnowHow AS knowHow, projekt.GitHubLink AS git, projekt.WebpageLink AS web, beschreibung.Text AS description FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID WHERE projekt.ProjektID=".$projectID;
  $projIDNameAndDesLeaderData = $database->query($projIDNameDesLeaderSql);
  $projIDNameAndDesLeader = null;
  $projLeader = null;
  if(isset($projIDNameAndDesLeaderData) && $projIDNameAndDesLeaderData != false)
  {
    while($entryData = $projIDNameAndDesLeaderData->fetch_assoc())
    {
      $projIDNameAndDesLeader = $entryData;
      // Frage Nutzernamen des Projektleiters ab
      $projLeader = dbsSingleValue($database, "nutzer", "Username", "NutzerID=".$entryData['projectLeaderID']);
    }
    if(isset($projIDNameAndDesLeader))
    {
      // Frage Informationen über das Projektbild ab
      $projImagePathSql = "SELECT TitelbildID AS name, Pfad AS directory, Dateityp AS filetype FROM titelbild WHERE TitelbildID=".$projIDNameAndDesLeader['picID'];
      $projImagePathData = $database->query($projImagePathSql);
      if(isset($projImagePathData) && $projImagePathData != false)
      {
        while($entryData = $projImagePathData->fetch_assoc())
        {
          // Erzeuge Dateipfad des Projektbilds
          $projImagePath = $entryData['directory'] . $entryData['name'] . "." . $entryData['filetype'];
        }
        // Fertige Ergebnisarray an
        $result = array('projectID' => $projectID, 'projectName' => $projIDNameAndDesLeader['name'], 'projectDescription' => $projIDNameAndDesLeader['description'],
                        'state' => $projIDNameAndDesLeader['state'], 'projectLeader' => $projLeader, 'projectMembers' => $memberNamesArray,
                        'knowHow' => $projIDNameAndDesLeader['knowHow'], 'gitLink' => $projIDNameAndDesLeader['git'], 'webLink' => $projIDNameAndDesLeader['web'],
                        'picturePath' => $projImagePath);
      }
    }
  }
  return $result;
}

// deleteProject: Löscht alle zugehörigen Datenbankeinträge eines Projekts
// aus der Datenbank anhand der übergebenen ID.
function deleteProject($database, $projectID)
{
  // Erzeuge SQL-Befehle und starte Datenbankupdates in einer Transaktion
  $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
  if(!dbsBeginTransaction($database, $delProjSql)) return false;
  $delProjCatSql = "DELETE FROM projekt_kategorie WHERE ProjektID=".$projectID;
  if(!dbsAddTransaction($database, $delProjCatSql)) return false;
  $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
  if(!dbsAddTransaction($database, $delProjUserSql)) return false;
  $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
  if(!dbsEndTransaction($database, $delDesSql)) return false;
  return true;
}
?>
