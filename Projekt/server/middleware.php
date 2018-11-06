<?php
session_start();

$token = explode(",", $_SESSION['token']);

if(is_numeric($token[1]))
{
  $type = "";
  switch ($token[0]) {
    case "isAdmin":
        $type = "admin";
        break;
    case "isUser":
        $type = "user";
        break;
    }
  if(((time()-$token[1]) / 60) > 2)
  {
    $data = array('status' => false);
  }
  else if($_POST['mode'] == "registered")
  {
    if($type == "admin" || $type == "user")
    {
      $data = array('status' => true, 'type' => $type);
    }
    else {
      $data = array('status' => false);
    }
  }
  else if($_POST['mode'] == "admin")
  {
    if($type == "admin")
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
}
else $data = array('status' => false);

echo json_encode($data);
?>
