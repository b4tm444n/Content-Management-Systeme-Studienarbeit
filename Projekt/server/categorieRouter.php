<?php
require_once "db.lib.php";
require_once "categorieFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'all')
{
  $data = getAllCategories($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'create')
{
  if(!empty($_POST['categorieName']))
  {
    $result = createCategorie($database, $_POST['categorieName']);
    if($result) echo json_encode(true);
    else echo json_encode(false);
  }
  else echo json_encode(false);
}
else if($_POST['route'] == 'delete' && !empty($_POST['id']))
{
  $data = deleteCategorie($database, $_POST['id']);
  echo json_encode($data);
}
else return null;
?>
