<?php
  require_once "db.lib.php";
  //require_once "projectFuncs.php";
  session_start();
  $database = dbsConnect();

  $pfad = $POST['pfad'];
  $dateityp = $POST['dateityp'];
  $sql = "INSERT INTO Titelbild ('titelbildID','Pfad','Dateityp') VALUES('2', $pfad, $dateityp)";
  dbsExecuteSQL($database, $sql);
  echo
?>
