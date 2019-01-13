<?php
session_start();

// Datei zum Überprüfen der Gültigkeit des Tokens

// Überprüfe ob ein Token existiert
if(isset($_SESSION['token']))
{
  // Spalte das Token in seine verschiedenen Elemente
  // [0] = TokenTyp, [1] = Zeitstempel, [2] = NutzerID
  $token = explode(",", $_SESSION['token']);

  // Überprüfe ob der Zeitstempel numerisch ist
  if(is_numeric($token[1]))
  {
    // Lese den Typ des Tokens aus und Speichere ihn
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
    // Überprüfe ob die Gültigkeitsdauer des Tokens abgelaufen ist
    // - Hier 5 Minuten Gültigkeit
    if(((time()-$token[1]) / 60) > 5)
    {
      // Bei Seiten, auf die alle außer der Admin zugreifen können spielt die
      // Dauer des Tokens keine Rolle
      if($_POST['mode'] == "notAdmin2")
      {
        $_SESSION['token'] = null;
        session_destroy();
        $data = array('status' => true);
      }
      // Ansonsten gebe false zurück wenn das Token abgelaufen ist
      else
      {
        $_SESSION['token'] = null;
        session_destroy();
        $data = array('status' => false);
      }
    }
    // Überprüft ob der Nutzer angemeldet ist -> Jeder Typ ist erlaubt
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
    // Überprüft ob der Nutzer mindestens den Status eines Redakteurs hat
    // -> Redakteur und Admin erlaubt
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
    // Überprüft ob es sich um einen Normalen Nutzer handelt
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
    // Überprüft ob es sich um den Admin handelt
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
    // Überprüft ob der Anwender kein Admin ist
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
// Sollte kein Token verfügbar sein und nur der Admin ausgeschlossen sein, dann
// gebe true zurück
else if($_POST['mode'] == "notAdmin2") $data = array('status' => true);
else $data = array('status' => false);

echo json_encode($data);
?>
