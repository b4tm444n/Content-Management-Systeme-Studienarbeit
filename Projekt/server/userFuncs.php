<?php
require_once "db.lib.php";

// getAllUsers: Gibt die Daten aller Nutzer(außer der eigenen Daten) zurück.
function getAllUsers($database, $ownID)
{
  // Erzeuge SQL-Befehl und starte Datenbankabfrage
   $sql = "SELECT * FROM nutzer WHERE NutzerID<>".$ownID;
   $projectData = dbsSelect($database, $sql);
   $projects = array();
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($projects, $dataRow);
   }
   return $projects;
}

// getColumnFromAllUsers: Gibt die Daten eines Felds für alle Nutzer zurück.
function getColumnFromAllUsers($database, $column)
{
  return dbsMultipleValuesNoClause($database, 'nutzer', $column);
}

// getUserName: Liefer den Vor- und Nachnamen eines Nutzers anhand der über-
// gebenen ID zurück.
function getUserName($database, $id)
{
   // Erzeuge SQL-Befehl und starte Datenbankupdate
   $sql = "SELECT Vorname, Nachname FROM nutzer WHERE NutzerID=$id";
   $userData = dbsSelect($database, $sql);
   $names = array();
   if($userData != null)
   {
     while($dataRow = $userData->fetch_assoc())
     {
        array_push($names, $dataRow);
     }
   }
   return $names;
}
// createUser: Fügt einen neuen Nutzer in die Datenbank ein.
function createUser($database, $pw, $name, $lastname, $username)
{
  // Erzeuge SQL-Befehl und starte Datenbankupdate
  //$sql = "INSERT INTO Nutzer (Passwort, Vorname, Nachname, Username, admin, ThemeID, LayoutID) VALUES ('".$pw."', '".$name."', '".$lastname."', '".$username."', 0, 1, 1)";
  $sql = "INSERT INTO Nutzer (Passwort, Vorname, Nachname, Username, admin) VALUES ('".$pw."', '".$name."', '".$lastname."', '".$username."', 0)";
  $execute = dbsExecuteSQL($database, $sql);
  return $execute;
}

// setUserType: Ändert den Typ eines Nutzers anhand der übergebenen Nutzer-
// ID und der Typ-ID(Nutzer, Redakteur, Admin).
function setUserType($database, $id, $userTypeID)
{
  // Erzeuge SQL-Befehl und starte Datenbankupdate
  $sql = "UPDATE nutzer SET admin=".$userTypeID." WHERE NutzerID=".$id;
  $execute = dbsExecuteSQL($database, $sql);
  return $execute;
}

// deleteUser: Löscht alle zugehörigen Datenbankeinträge eines Nutzers anhand
// der übergebenen ID.
function deleteUser($database, $id)
{
  // Lösche Nutzereintrag in einer Transaktion
  $delUserSql = "DELETE FROM nutzer WHERE NutzerID=".$id;
  if(dbsBeginTransaction($database, $delUserSql))
  {
    // Suche alle Projekte, bei denen der Nutzer Projektleiter ist
    $allProjectIDs = dbsMultipleValues($database, "projekt", "ProjektID", "Projektleiter=".$id);
    if(isset($allProjectIDs))
    {
      // Lösche die relevanten Projektdaten aus der Datenbank
      foreach ($allProjectIDs as $key => $projectID)
      {
        $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjSql)) return false;
        $delProjCatSql = "DELETE FROM projekt_kategorie WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjCatSql)) return false;
        $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delProjUserSql)) return false;
        $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
        if(!dbsAddTransaction($database, $delDesSql)) return false;
      }
    }
    $database->commit();
    return true;
  }
}
?>
