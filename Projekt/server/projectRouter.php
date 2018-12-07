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
  if(isset($categorie))
  {
    $data = getCategorieProjects($database, 'Benennung', $categorie);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'allCategories')
{
  if(empty($_POST['exclCats'])) $_POST['exclCats'] = null;
  $data = getCategories($database, $_POST['exclCats']);
  echo json_encode($data);
}
else if($_POST['route'] == 'details' && isset($_POST['id']))
{
   $data = getProjectDetails($database, $_POST['id']);
   echo json_encode($data);
}
else if($_POST['route'] == 'user')
{
  $token = explode(",", $_SESSION['token']);
  $userid = $token[2];
  if(isset($userid))
  {
   $data = getUserProjects($database, $userid);
   echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'create')
{
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
else if($_POST['route'] == 'join' && isset($_POST['projectID']))
{
  $token = explode(",", $_SESSION['token']);
  $userid = $token[2];
  if(isset($userid))
  {
   $data = joinProject($database, $userid, $_POST['projectID']);
   echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'details' && isset($_POST['projectID']))
{
  $data = getProjectInformation($database, $_POST['projectID']);
  echo json_encode($data);
}
else if($_POST['route'] == 'delete' && isset($_POST['id']))
{
   $data = deleteProject($database, $_POST['id']);
   echo json_encode($data);
}
else return null;
?>
