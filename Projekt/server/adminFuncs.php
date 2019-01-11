<?php
require_once "db.lib.php";

function getIndexPicture($database)
{
  $sql = "SELECT * FROM IndexTitelbild";
  $pictureData = dbsSelect($database, $sql);
  $resultArray = array();
  $pictures = array();
  if(isset($pictureData))
  {
    while($dataRow = $pictureData->fetch_assoc())
    {
       array_push($pictures, $dataRow);
    }
    $currentID = dbsSingleValue($database, "indextitelbild", "IndexTitelbildID", "Verwendet=1");
    $resultArray = array("picData" => $pictures, "curID" => $currentID);
  }
  return $resultArray;
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

function uploadTitlePic($database, $picturePath, $pictureName, $pictureFile)
{
  $maxIDSQL = "SELECT MAX(IndexTitelbildID) AS maxID FROM indextitelbild";
  error_log("getting ID");
  if($maxID = dbsSelect($database, $maxIDSQL))
  {
    $maxID = $maxID->fetch_assoc();
    error_log($maxID['maxID']);
    $curID = intval($maxID['maxID']) + 1;
    error_log("id says: ".$curID);
    $picType = pathinfo($pictureFile['name'], PATHINFO_EXTENSION);
    $finalPath = $picturePath.$pictureName."_".strval($curID).".".$picType;
    $pictureSQL = "INSERT INTO indextitelbild(BildDateiPfad, Verwendet, Name) VALUES ('".$finalPath."', 0, '".$pictureName."')";
    if(dbsBeginTransaction($database, $pictureSQL))
    {
      error_log("uploadingFile");
      if(dbsUploadFile($pictureFile, $pictureName."_".strval($curID).".".$picType, $picturePath))
      {
        $database->commit();
        return true;
      }
      else
      {
        $database->rollback();
        return false;
      }
    }
  }
  else return false;
}

function getCurrentIndexPicture($database)
{
  return dbsSingleValue($database, "indextitelbild", "BildDateiPfad", "Verwendet=1");
}

?>
