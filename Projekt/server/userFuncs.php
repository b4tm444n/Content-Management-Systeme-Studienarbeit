<?php
require_once "db.lib.php";

function getAllUsers($database)
{
   $sql = "SELECT * FROM nutzer";
   $projectData = dbsSelect($database, $sql);
   $projects = array();
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}

function getColumnFromAllUsers($database, $column)
{
  return dbsMultipleValuesNoClause($database, 'nutzer', $column);
}

function getUserName($database, $id)
{
   $sql = "SELECT Vorname, Nachname FROM nutzer WHERE Kategorie=$id";
   $projectData = dbsSelect($database, $sql);
   $projects = array();
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}

function createUser($database, $pw, $name, $lastname, $username)
{
  $sql = "INSERT INTO Nutzer (Passwort, Vorname, Nachname, Username, admin, ThemeID, LayoutID) VALUES ('".$pw."', '".$name."', '".$lastname."', '".$username."', 0, 1, 1)";
  $execute = dbsExecuteSQL($database, $sql);
  return $execute;
}
?>
