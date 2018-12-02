<?php
require_once "db.lib.php";

function getAllProjects($database)
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
   $sql = "SELECT projekt.Benennung AS name, beschreibung.Text AS description FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID";
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
   $sql = "SELECT projekt.Benennung AS Benennung, beschreibung.Text AS beschreibung FROM projekt INNER JOIN beschreibung ON projekt.ProjektID = beschreibung.ProjektID INNER JOIN projekt_kategorie ON projekt.ProjektID = projekt_kategorie.ProjektID INNER JOIN kategorie ON projekt_kategorie.KategorieID = kategorie.KategorieID WHERE kategorie.KategorieName='$categorie'";
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
     $sql = "SELECT * FROM projekt WHERE Projektleiter=$NutzerID";
     $projectData = dbsSelect($database, $sql);
     $projects = array();
     while($dataRow = $projectData->fetch_assoc())
     {
        array_push($projects, $dataRow);
     }
     return $projects;
   }
   return null;
}

function createProject($database, $projectLeader, $picturePath, $pictureType, $projectName, $description, $desLanguage, $knowHow, $state, $rights, $webLink, $gitLink, $projCategoryIDs, $pictureFile)
{
  $pictureType = pathinfo($pictureFile['name'], PATHINFO_EXTENSION);
  $result = false;
  $pictureSQL = "INSERT INTO titelbild (Pfad, Dateityp) VALUES ('".$picturePath."', '".$pictureType."')";
  if(dbsBeginTransaction($database, $pictureSQL))
  {
    $pictureID = $database->insert_id;
    if(dbsUploadFile($pictureFile, $pictureID.".jpg", $picturePath))
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
