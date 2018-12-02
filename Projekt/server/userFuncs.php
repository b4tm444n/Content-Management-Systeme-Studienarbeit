<?php
require_once "db.lib.php";

function getAllUsers($database, $ownID)
{
   $sql = "SELECT * FROM nutzer WHERE NutzerID<>".$ownID;
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

function deleteUser($database, $id)
{
  $delUserSql = "DELETE FROM nutzer WHERE NutzerID=".$id;
  if(dbsBeginTransaction($database, $delUserSql))
  {
    $allProjectIDs = dbsMultipleValues($database, "projekt", "ProjektID", "Projektleiter=".$id);
    if(isset($allProjectIDs))
    {
      foreach ($allProjectIDs as $key => $projectID)
      {
        $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjSql)) return false;
        $delProjCatSql = "DELETE FROM projekt_kategorie WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjCatSql)) return false;
        $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjUserSql)) return false;
        $delChatSql = "DELETE FROM chatinhalt WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delChatSql)) return false;
        $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delDesSql)) return false;
      }
    }
    $database->commit();
    return true;
  }
}
?>
