<?php
require "db.lib.php";

session_start();
//Verbindung herstellen
$db = dbsConnect();
//Nach Eintrag des Nutzers suchen
$user = dbsSingleRow($db, "SELECT Passwort AS pw, Admin, NutzerID AS id FROM nutzer WHERE Username='".$_POST['name']."'");
//User authentifizieren
if($user != null && $user['pw'] == $_POST['pw'])
{
  if($user['Admin']=="1")
  {
    $_SESSION['token'] = "isAdmin" . "," . time() . "," . $user['id'];
    $data = array('status' => true, 'type' => "admin");
  }
  else if($user['Admin']=="2"){
    $_SESSION['token'] = "isAdmin2" . "," . time() . "," . $user['id'];
    $data = array('status' => true, 'type' => "admin2");
  }
  else if($user['Admin']=="0")
  {
    $_SESSION['token'] = "isUser" . "," . time() . "," . $user['id'];
    $data = array('status' => true, 'type' => "user");
  }
  else{
  }
}
else
{
  $data = array('status' => false, 'msg' => "Authentifizierung fehlgeschlagen");
}
echo json_encode($data);

?>
