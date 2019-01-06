<?php
require_once "db.lib.php";

function getCurrentLaguageLabels($database)
{
  $selectionSQL = //"SELECT * FROM projekt";
  "SELECT Text, Element.Html_ID
                   FROM ELEMENT_SPRACHE
                   INNER JOIN Sprache
                    ON ELEMENT_SPRACHE.SpracheID = Sprache.SpracheID
                   INNER JOIN Element
                    ON ELEMENT_SPRACHE.ElementID = Element.ElementID
                   WHERE Sprache.Standard = 1";

  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

function getAllLanguages($database)
{
  $selectionSQL = "SELECT DISTINCT Name, SpracheID FROM sprache";
  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

function activateLanguage($database, $languageID)
{
  $deactivateSQL = "UPDATE sprache SET Standard=0 WHERE Standard='1'";
  if(dbsBeginTransaction($database, $deactivateSQL))
  {
    $activateSQL = "UPDATE sprache SET Standard='1' WHERE SpracheID=".$languageID;
    if(dbsEndTransaction($database, $activateSQL)) return true;
  }
  return false;
}

?>
