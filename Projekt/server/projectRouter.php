<?php
require_once "db.lib.php";
require_once "projectFuncs.php";
// Router-Datei für die Projekt Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der projectFuncs.php-Datei bezogen

// Route zur Rückgabe der Projektdaten und der Beschreibung aller Projekte
if($_POST['route'] == 'all')
{
   $data = getAllProjects($database);
   echo json_encode($data);
}
// Route zur Rückgabe der Namen aller Projekte
else if($_POST['route'] == 'allNames')
{
  $data = getColumnFromAllProjects($database, 'Benennung');
  echo json_encode($data);
}
// Route zur Rückgabe des Namens, ID, Zustands und Beschreibung aller Projekte
else if($_POST['route'] == 'allNamesDes')
{
  $data = getNameDesProjects($database);
  echo json_encode($data);
}
// Route zur Rückgabe des Namens, ID, Zustands und Beschreibung aller Projekte
// einer bestimmten Kategorie
else if($_POST['route'] == 'KategorieNames')
{
  $categorie = $_POST['categorie'];
  //Prüfe ob benötigte Parameter übergeben wurden
  if(isset($categorie))
  {
    $data = getCategorieProjects($database, 'Benennung', $categorie);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zur Rückgabe aller Kategorien ausschließlich der übergebenen Kategorien
else if($_POST['route'] == 'allCategories')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(empty($_POST['exclCats'])) $_POST['exclCats'] = null;
  $data = getCategories($database, $_POST['exclCats']);
  echo json_encode($data);
}
// Route zur Rückgabe der Projektdaten eines Projekts anhand der ID
else if($_POST['route'] == 'details' && isset($_POST['id']))
{
   $data = getProjectDetails($database, $_POST['id']);
   echo json_encode($data);
}
// Route zur Rückgabe aller Projekte bei denen der Nutzer der Projektleiter ist
else if($_POST['route'] == 'user')
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     $data = getUserProjects($database, $userid);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route zur Rückgabe des Namens, ID, Zustands und Beschreibung von Projekten
// an denen der Nutzer teilnimmt
else if($_POST['route'] == 'member')
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     $data = getMemberProjects($database, $userid);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route zum Erstellen eines Projekts
else if($_POST['route'] == 'create')
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
      $data = createProject($database, $userid, $_POST['picturePath'], $_POST['pictureType'], $_POST['projectName'], $_POST['description'], $_POST['descriptionLanguage'], $_POST['knowHow'], $_POST['state'], $_POST['rights'],
      $_POST['webLink'], $_POST['gitLink'], $_POST['categoryIDs'], $_FILES['picFile']);
      echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route um einen Nutzer zu einem Projekt als Teilnehmer hinzuzufügen
else if($_POST['route'] == 'join' && isset($_POST['projectID']))
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     error_log("Stufe1");
     $data = joinProject($database, $userid, $_POST['projectID']);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route um einen Nutzer von einem Projekt als Teilnehmer zu entfernen
else if ($_POST['route'] == 'leave' && isset($_POST['projectID']))
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     $data = leaveProject($database, $userid, $_POST['projectID']);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route um zu Überprüfen ob der Nutzer an einem Projekt teilnimmt oder Leiter
// davon ist
else if($_POST['route'] == 'checkMembership' && isset($_POST['projectID']))
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     $data = checkForProjectMembership($database, $_POST['projectID'], $userid);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route um zu Überprüfen ob der Nutzer der Projektleiter des Projekts ist
else if($_POST['route'] == 'checkLeadership' && isset($_POST['projectID']))
{
  // Überprüfe ob Token vorhanden
  if(isset($_SESSION['token']))
  {
    // Hole NutzerID und führe Funktion aus
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    if(isset($userid))
    {
     $data = checkForProjectLeadership($database, $_POST['projectID'], $userid);
     echo json_encode($data);
    }
    else echo json_encode(null);
  }
  else echo json_encode(null);
}
// Route um alle relevanten Projektdetails zu einem Projekt abzufragen
else if($_POST['route'] == 'details' && isset($_POST['projectID']))
{
  $data = getProjectInformation($database, $_POST['projectID']);
  echo json_encode($data);
}
// Route um ein Projekt zu löschen
else if($_POST['route'] == 'delete' && isset($_POST['id']))
{
   $data = deleteProject($database, $_POST['id']);
   echo json_encode($data);
}
// Route um den Zustand eines Projekts zu verändern
else if($_POST['route'] == 'setState' && isset($_POST['projectID']) && !empty($_POST['state']))
{
  error_log($_POST['state']);
  $data = setProjectState($database, $_POST['projectID'], $_POST['state']);
  echo json_encode($data);
}
else return null;
?>
