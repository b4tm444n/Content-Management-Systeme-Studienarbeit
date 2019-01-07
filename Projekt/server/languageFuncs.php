<?php
require_once "db.lib.php";

function getCurrentLanguage($database)
{
  $data = dbsSingleValue($database, "Sprache", "Name", "Standard='1'");
  return($data);
}

function getCurrentLaguageLabels($database, $website)
{
  $selectionSQL = //"SELECT * FROM projekt";
  "SELECT Text, Element.Html_ID
                   FROM ELEMENT_SPRACHE
                   INNER JOIN Sprache
                    ON ELEMENT_SPRACHE.SpracheID = Sprache.SpracheID
                   INNER JOIN Element
                    ON ELEMENT_SPRACHE.ElementID = Element.ElementID
                   WHERE Sprache.Standard = 1 AND Element.HtmlSeite='".$website."'";

  $entrys = dbsSelect($database, $selectionSQL);
  $themeArray = array();
  while($row = $entrys->fetch_assoc())
  {
    array_push($themeArray, $row);
  }
  return($themeArray);
}

function getLaguageLabels($database, $language, $website)
{
  $selectionSQL = //"SELECT * FROM projekt";
  "SELECT Text, Element.Html_ID
                   FROM ELEMENT_SPRACHE
                   INNER JOIN Sprache
                    ON ELEMENT_SPRACHE.SpracheID = Sprache.SpracheID
                   INNER JOIN Element
                    ON ELEMENT_SPRACHE.ElementID = Element.ElementID
                   WHERE Sprache.Name ='".$language."' AND Element.HtmlSeite='".$website."'";

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

function insertLanguage($database, $languageData)
{
  $SQL = "INSERT INTO Sprache VALUES (".$languageData.")";
  $result = dbsExecuteSQL($database, $SQL);
  if($result) echo json_encode(true);
  else echo json_encode(false);
}

?>
