<?php
session_start();

$_SESSION['name'] = $_POST['name'];

if($_POST['name'] == "admin" && $_POST['pw'] == "admin")
{
  $_SESSION['token'] = "isAdmin" . "," . time();
  $data = array('status' => true, 'type' => "admin");
}
else if($_POST['name'] == "user" && $_POST['pw'] == "user")
{
  $_SESSION['token'] = "isUser" . "," . time();
  $data = array('status' => true, 'type' => "user");
}
else
{
  $data = array('status' => false, 'msg' => "Authentifizierung fehlgeschlagen");
}
echo json_encode($data);
?>
