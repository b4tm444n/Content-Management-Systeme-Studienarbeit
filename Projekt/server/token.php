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
  if($user['Admin'])
  {
    $_SESSION['token'] = "isAdmin" . "," . time() . "," . $user['id'];
    $data = array('status' => true, 'type' => "admin");
  }
  else
  {
    $_SESSION['token'] = "isUser" . "," . time() . "," . $user['id'];
    $data = array('status' => true, 'type' => "user");
  }
}
else
{
  $data = array('status' => false, 'msg' => "Authentifizierung fehlgeschlagen");
}
echo json_encode($data);

?>
