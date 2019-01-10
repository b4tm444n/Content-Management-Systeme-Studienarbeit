<?php
require_once "db.lib.php";

function getIndexPicture($database)
{
  $sql = "SELECT * FROM IndexTitelbild";
  $pictureData = dbsSelect($database, $sql);
  $pictures = array();
  if(isset($pictureData))
  {
    while($dataRow = $pictureData->fetch_assoc())
    {
       array_push($pictures, $dataRow);
    }
  }
  return $pictures;
}

function setTitlePic($database, $index)
{
  if(is_numeric($index))
  {
    error_log("indexnummer ".$index);
    $sql = "UPDATE indextitelbild SET Verwendet='0' WHERE IndexTitelbildID<>'".$index."'";
    if(dbsBeginTransaction($database, $sql))
    {
      $setTitlepicSQL = "UPDATE indextitelbild SET Verwendet='1' WHERE IndexTitelbildID='".$index."'";
      return dbsEndTransaction($database, $setTitlepicSQL);
    }
    return false;
  }
  return false;
}

?>
