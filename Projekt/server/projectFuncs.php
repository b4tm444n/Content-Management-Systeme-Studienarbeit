<?php
require_once "db.lib.php";
session_start();

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
