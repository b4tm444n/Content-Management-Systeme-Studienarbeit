<?php
require_once "db.lib.php";
require_once "projectFuncs.php";

$database = dbsConnect();

if($_POST['route'] == 'all')
{
   $data = getAllProjects($database);
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
   $data = getUserProjects($database, $userid);
   echo json_encode($data);
}
else return null;
?>
