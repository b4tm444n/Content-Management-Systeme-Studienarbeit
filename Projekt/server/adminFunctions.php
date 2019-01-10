<?php
  require_once "db.lib.php";
  //require_once "projectFuncs.php";
  session_start();
  $database = dbsConnect();

  //$pfad = $POST['pfad'];
  //$dateityp = $POST['dateityp'];
  //$sql = "INSERT INTO Titelbild ('titelbildID','Pfad','Dateityp') VALUES('2', $pfad, $dateityp)";
  //dbsExecuteSQL($database, $sql);

 //function getIndexPicture ($database){
   $sql = "SELECT * FROM IndexTitelbild";
   $projectData = dbsSelect($database, $sql);
   $pictures = array();
   while($dataRow = $projectData->fetch_assoc())
   {
      array_push($pictures, $dataRow);
   }
   echo json_encode($pictures);
 //}

?>
