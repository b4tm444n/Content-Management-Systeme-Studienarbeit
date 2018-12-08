<?php
require_once "db.lib.php";
require_once "userFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'all')
{
  if(isset($_SESSION['token']))
  {
    $token = explode(",", $_SESSION['token']);
    $userid = $token[2];
    $data = getAllUsers($database, $userid);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'allUsernames')
{
  $data = getColumnFromAllProjects($database, 'Username');
  echo json_encode($data);
}
else if($_POST['route'] == 'name' && isset($_POST['id']))
{
   $data = getUserName($database, $_POST['id']);
   echo json_encode($data);
}
else if($_POST['route'] == 'currentName')
{
  error_log($_SESSION['token']);
  $token = explode(",", $_SESSION['token']);
  $userid = $token[2];
  $data = getUserName($database, $userid);
  echo json_encode($data);
}
else if($_POST['route'] == 'create')
{
  if(!empty($_POST['Passwort']) && !empty($_POST['Vorname']) && !empty($_POST['Nachname']) && !empty($_POST['Username']))
  {
    $result = createUser($database, $_POST['Passwort'], $_POST['Vorname'], $_POST['Nachname'], $_POST['Username']);
    if($result) echo ('Erfolg');
    else echo('Registrierung fehlgeschlagen');
  }
  else echo('Nicht alle nötigen Daten übergeben.');
}
else if($_POST['route'] == 'setType' && !empty($_POST['id']) && isset($_POST['typeID']))
{
  $data = setUserType($database, $_POST['id'], $_POST['typeID']);
  echo json_encode($data);
}
else if($_POST['route'] == 'delete' && !empty($_POST['id']))
{
  $data = deleteUser($database, $_POST['id']);
  echo json_encode($data);
}
else return null;
?>
