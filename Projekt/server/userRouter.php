<?php
require_once "db.lib.php";
require_once "userFuncs.php";
// Router-Datei für die Nutzer Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der userFuncs.php-Datei bezogen

// Route zur Rückgabe der Nutzerdaten aller Nutzer(ausgeschlossen: Eigene Nutzerdaten)
if($_POST['route'] == 'all')
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    $data = getAllUsers($database, $userid);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zur Rückgabe aller Nutzernamen
else if($_POST['route'] == 'allUsernames')
{
  $data = getColumnFromAllProjects($database, 'Username');
  echo json_encode($data);
}
// Route zur Rückgabe des Vor- und Nachnamens eines Nutzers anhand der ID
else if($_POST['route'] == 'name' && isset($_POST['id']))
{
   $data = getUserName($database, $_POST['id']);
   echo json_encode($data);
}
// Route zur Rückgabe des Vor- und Nachnamens des angemeldeten Nutzers
else if($_POST['route'] == 'currentName')
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    $data = getUserName($database, $userid);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zum Erstellen eines Nutzers
else if($_POST['route'] == 'create')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['Passwort']) && !empty($_POST['Vorname']) && !empty($_POST['Nachname']) && !empty($_POST['Username']))
  {
    $result = createUser($database, $_POST['Passwort'], $_POST['Vorname'], $_POST['Nachname'], $_POST['Username']);
    if($result) echo ('Erfolg');
    else echo('Registrierung fehlgeschlagen');
  }
  else echo('Nicht alle nötigen Daten übergeben.');
}
// Route um den Typen eines Nutzers zu ändern
else if($_POST['route'] == 'setType' && !empty($_POST['id']) && isset($_POST['typeID']))
{
  $data = setUserType($database, $_POST['id'], $_POST['typeID']);
  echo json_encode($data);
}
// Route um einen Nutzer zu löschen
else if($_POST['route'] == 'delete' && !empty($_POST['id']))
{
  $data = deleteUser($database, $_POST['id']);
  echo json_encode($data);
}
else return null;
?>
