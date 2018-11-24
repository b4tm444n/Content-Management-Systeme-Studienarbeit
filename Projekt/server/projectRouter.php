<?php
require_once "db.lib.php";
require_once "projectFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'all')
{
   $data = getAllProjects($database);
   echo json_encode($data);
}
else if($_POST['route'] == 'allNames')
{
  $data = getColumnFromAllProjects($database, 'Benennung');
  echo json_encode($data);
}
else if($_POST['route'] == 'allNamesDes')
{
  $data = getNameDesProjects($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'KategorieNames')
{
  $categorie = $_POST['categorie'];
  error_log($categorie);
  $data = getCategorieProjects($database, 'Benennung', $categorie);
  echo json_encode($data);
}
else if($_POST['route'] == 'allCategories')
{
  error_log("Try to get");
  $data = getCategories($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'details' && isset($_POST['id']))
{
   $data = getProjectDetails($database, $_POST['id']);
   echo json_encode($data);
}
else if($_POST['route'] == 'user')
{
  error_log($_SESSION['token']);
  $token = explode(",", $_SESSION['token']);
  $userid = $token[2];
   $data = getUserProjects($database, $userid);
   echo json_encode($data);
}
else if($_POST['route'] == 'create')
{
  $token = explode(",", $_SESSION['token']);
  $userid = $token[2];
  $data = createProject($database, $userid, $_POST['picturePath'], $_POST['pictureType'], $_POST['projectName'], $_POST['description'], $_POST['descriptionLanguage'], $_POST['knowHow'], $_POST['state'], $_POST['rights'],
  $_POST['webLink'], $_POST['gitLink'], $_POST['categoryID']);
  echo json_encode($data);
}
else return null;
?>
