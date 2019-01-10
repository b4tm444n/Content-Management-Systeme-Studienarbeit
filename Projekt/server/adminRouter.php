<?php
require_once "db.lib.php";
require_once "adminFuncs.php";
session_start();
$database = dbsConnect();

if($_POST['route'] == 'setTitlePic')
{
  if(isset($_POST['picID']))
  {
    $data = setTitlePic($database, $_POST['picID']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
else if($_POST['route'] == 'getIndexPicture')
{
  $data = getIndexPicture($database);
  echo json_encode($data);
}
else if($_POST['route'] == 'uploadTitlePic')
{
  if(!empty($_POST['picPath']) && !empty($_POST['name']) && isset($_FILES['picFile']))
  {
    echo json_encode(true);
  }
  else echo json_encode(null);
}
else return null;
?>
