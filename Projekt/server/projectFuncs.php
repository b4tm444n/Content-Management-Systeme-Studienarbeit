<?php
require_once "db.lib.php";

function getAllProjects($database)
{
   $sql = "SELECT * FROM projekt";
   $projectData = dbsSelect($database, $sql);
   $projects = array();
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}

function getColumnFromAllProjects($database, $column)
{
   $sql = "SELECT $column FROM Projekt";
   //$projectData = dbsSelect($database, $sql);
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow[$column]);
   }
   return $projects;
}

function getCategorieProjects($database, $column, $categorie)
{
   $sql = "SELECT $column FROM projekt WHERE Kategorie=$categorie";
   //$projectData = dbsSelect($database, $sql);
   $projects = array();
   $projectData = $database->query($sql);
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
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
?>
