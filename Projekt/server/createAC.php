<?php
require "db.lib.php";

session_start();
//Verbindung herstellen
$database = dbsConnect();

$sql = "INSERT INTO Nutzer (Passwort, Vorname, Nachname, Username, admin, ThemeID, LayoutID) VALUES ('".$_POST['Passwort']."', '".$_POST['Vorname']."', '".$_POST['Nachname']."', '".$_POST['Username']."', 0, 1, 1)";

$execute = dbsExecuteSQL($database, $sql);

if ( $execute == true){
  echo ('erfolg');
}
else {
  echo $sql;
}

?>
