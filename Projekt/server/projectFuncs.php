<?php
require_once "db.lib.php";

/*function getAllProjects($database)
{
   $sql = "SELECT * FROM projekt";
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
}*/

function getAllProjects($database)
{
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

function getColumnFromAllProjects($database, $column)
{
   $sql = "SELECT $column FROM projekt";
   //$projectData = dbsSelect($database, $sql);
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow[$column]);
   }
   return $projects;
}

function getNameDesProjects($database)
{
   $sql = "SELECT projekt.Benennung AS name, projekt.ProjektID AS id, beschreibung.Text AS description FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID";
   //$projectData = dbsSelect($database, $sql);
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}

function getCategorieProjects($database, $column, $categorie)
{
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

function getCategories($database, $exclCats)
{
   $sql = "SELECT KategorieID AS CatID, KategorieName AS CatName FROM kategorie";
   if(!empty($exclCats))
   {
     $sql .= " WHERE KategorieID<>".$exclCats[0];
     for ($i = 1; $i < count($exclCats); $i++) {
       $sql .= " AND KategorieID<>".$exclCats[$i];
     }
   }
   //$projectData = dbsSelect($database, $sql);
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
/* Funktion um nur Projekte zu einer Kategorie auszugeben
*
*/

function getProjectDetails($database, $id)
{
   if(is_numeric($id))
   {
     $sql = "SELECT * FROM projekt WHERE ProjektID=$id";
      $projectData = dbsSingleRow($database);
      return $projectData;
   }
   return null;

}

function getUserProjects($database, $NutzerID)
{
   if(is_numeric($NutzerID))
   {
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

function checkForProjectMembership($database, $projectID, $nutzerID)
{
  if(is_numeric($projectID) && is_numeric($nutzerID))
  {
    $checkLeaderSQL = "SELECT * FROM projekt WHERE Projektleiter=$nutzerID AND ProjektID=$projectID";
    $checkMemberSQL = "SELECT * FROM projekt_nutzer WHERE NutzerID=$nutzerID AND ProjektID=$projectID";
    $leaderEntry = dbsSelect($database, $checkLeaderSQL);
    $memberEntry = dbsSelect($database, $checkMemberSQL);
    if($leaderEntry != null || $memberEntry != null)
    {
      return true;
    }
    return false;
  }
}

function getMemberProjects($database, $NutzerID)
{
   if(is_numeric($NutzerID))
   {
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
     $userProjects = getUserProjects($database, $NutzerID);
     foreach ($userProjects as $key => $userProject) {
       array_push($projects, $userProject);
     }
     return $projects;
   }
   return null;
}

function createProject($database, $projectLeader, $picturePath, $pictureType, $projectName, $description, $desLanguage, $knowHow, $state, $rights, $webLink, $gitLink, $projCategoryIDs, $pictureFile)
{
  $projCategoryIDs = explode(",",$projCategoryIDs);
  $pictureType = pathinfo($pictureFile['name'], PATHINFO_EXTENSION);
  $result = false;
  $pictureSQL = "INSERT INTO titelbild (Pfad, Dateityp) VALUES ('".$picturePath."', '".$pictureType."')";
  if(dbsBeginTransaction($database, $pictureSQL))
  {
    $pictureID = $database->insert_id;
    if(dbsUploadFile($pictureFile, $pictureID.".".$pictureType, $picturePath))
    {
      $projectSQL = "INSERT INTO projekt (Projektleiter, Zustand, TitelbildID, Benennung, Rechte, GesuchtesKnowHow, TrelloTasks, WebpageLink, GitHubLink) VALUES ($projectLeader, '".$state."', $pictureID, '".$projectName."', $rights, '".$knowHow."', 0, '".$webLink."', '".$gitLink."')";
      if(dbsAddTransaction($database, $projectSQL))
      {
        $projectID = $database->insert_id;
        $descriptionSQL = "INSERT INTO beschreibung(ProjektID, Sprache, Text) VALUES ('".$projectID."', '".$desLanguage."', '".$description."')";
        if(dbsAddTransaction($database, $descriptionSQL))
        {
          for($i = 0; $i < count($projCategoryIDs); ++$i) {
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

function joinProject($database, $userid, $projectID)
{
  $insertUserProjectSql = "INSERT INTO projekt_nutzer (NutzerID, ProjektID)
                          VALUES ($userid, $projectID) ";
  return dbsExecuteSQL($database, $insertUserProjectSql);
}

function getProjectInformation($database, $projectID)
{
  $projectMemberIDs = dbsMultipleValues($database, "projekt_nutzer", "NutzerID", "ProjektID=".$projectID);
  $result = false;
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
  $projIDNameDesLeaderSql = "SELECT projekt.Benennung AS name, projekt.TitelbildID AS picID, projekt.Zustand AS state, projekt.Projektleiter AS projectLeaderID, projekt.GesuchtesKnowHow AS knowHow, projekt.GitHubLink AS git, projekt.WebpageLink AS web, beschreibung.Text AS description FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID WHERE projekt.ProjektID=".$projectID;
  $projIDNameAndDesLeaderData = $database->query($projIDNameDesLeaderSql);
  $projIDNameAndDesLeader = null;
  $projLeader = null;
  if(isset($projIDNameAndDesLeaderData) && $projIDNameAndDesLeaderData != false)
  {
    while($entryData = $projIDNameAndDesLeaderData->fetch_assoc())
    {
      $projIDNameAndDesLeader = $entryData;
      $projLeader = dbsSingleValue($database, "nutzer", "Username", "NutzerID=".$entryData['projectLeaderID']);
    }
    if(isset($projIDNameAndDesLeader))
    {
      error_log($projIDNameAndDesLeader['picID']);
      $projImagePathSql = "SELECT TitelbildID AS name, Pfad AS directory, Dateityp AS filetype FROM titelbild WHERE TitelbildID=".$projIDNameAndDesLeader['picID'];
      $projImagePathData = $database->query($projImagePathSql);
      if(isset($projImagePathData) && $projImagePathData != false)
      {
        while($entryData = $projImagePathData->fetch_assoc())
        {
          $projImagePath = $entryData['directory'] . $entryData['name'] . "." . $entryData['filetype'];
        }
        $result = array('projectID' => $projectID, 'projectName' => $projIDNameAndDesLeader['name'], 'projectDescription' => $projIDNameAndDesLeader['description'],
                        'state' => $projIDNameAndDesLeader['state'], 'projectLeader' => $projLeader, 'projectMembers' => $memberNamesArray,
                        'knowHow' => $projIDNameAndDesLeader['knowHow'], 'gitLink' => $projIDNameAndDesLeader['git'], 'webLink' => $projIDNameAndDesLeader['web'],
                        'picturePath' => $projImagePath);
      }
    }
  }
  return $result;
}

function deleteProject($database, $projectID)
{
  $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
  if(!dbsBeginTransaction($database, $delProjSql)) return false;
  $delProjCatSql = "DELETE FROM projekt_kategorie WHERE ProjektID=".$projectID;
  if(!dbsAddTransaction($database, $delProjCatSql)) return false;
  $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
  if(!dbsAddTransaction($database, $delProjUserSql)) return false;
  $delChatSql = "DELETE FROM chatinhalt WHERE ProjektID=".$projectID;
  if(!dbsAddTransaction($database, $delChatSql)) return false;
  $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
  if(!dbsEndTransaction($database, $delDesSql)) return false;
  return true;
}
?>
