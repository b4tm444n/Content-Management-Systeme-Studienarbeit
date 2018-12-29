<?php
session_start();

if(isset($_SESSION['token']))
{
  $token = explode(",", $_SESSION['token']);
  if(is_numeric($token[1]))
  {
    $type = "";
    switch ($token[0]) {
      case "isAdmin":
          $type = "admin";
          break;
      case "isAdmin2":
          $type = "admin2";
          break;
      case "isUser":
          $type = "user";
          break;
      }
    if(((time()-$token[1]) / 60) > 5)
    {
      if($_POST['mode'] == "notAdmin2")
      {
        $data = array('status' => true);
      }
      else
      {
        $data = array('status' => false);
      }
    }
    else if($_POST['mode'] == "registered")
    {
      if($type == "admin" || $type == "user" || $type == "admin2")
      {
        $data = array('status' => true, 'type' => $type);
      }
      else {
        $data = array('status' => false);
      }
    }
    else if($_POST['mode'] == "admin")
    {
      if($type == "admin" || $type == "admin2")
      {
        $data = array('status' => true, 'type' => $type);
      }
      else {
        $data = array('status' => false);
      }
    }
    else if($_POST['mode'] == "user")
    {
      if($type == "user")
      {
        $data = array('status' => true, 'type' => $type);
      }
      else {
        $data = array('status' => false);
      }
    }
    else if($_POST['mode'] == "admin2")
    {
      if($type == "admin2")
      {
        $data = array('status' => true, 'type' => $type);
      }
      else {
        $data = array('status' => false);
      }
    }
    else if($_POST['mode'] == "notAdmin2")
    {
      if(!($type == "admin2"))
      {
        $data = array('status' => true, 'type' => $type);
      }
      else {
        $data = array('status' => false);
      }
    }
  }
  else $data = array('status' => false);
  }
else if($_POST['mode'] == "notAdmin2") $data = array('status' => true);
else $data = array('status' => false);

echo json_encode($data);
?>
