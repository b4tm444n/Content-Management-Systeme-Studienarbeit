<?php
require_once "db.lib.php";

function getAllCategories($database)
{
   $sql = "SELECT * FROM kategorie";
   $categorieData = dbsSelect($database, $sql);
   $categories = array();
   while($dataRow = $categorieData->fetch_assoc())
   {
      array_push($categories, $dataRow);
   }
   return $categories;
}

function createCategorie($database, $categorieName)
{
  $sql = "INSERT INTO kategorie (KategorieName) VALUES ('".$categorieName."')";
  $execute = dbsExecuteSQL($database, $sql);
  return $execute;
}

function deleteCategorie($database, $id)
{
  $delCategorieSql = "DELETE FROM kategorie WHERE KategorieID=".$id;
  if(dbsBeginTransaction($database, $delCategorieSql))
  {
    $allProjectsWithCategory = dbsMultipleValues($database, "projekt_kategorie", "ProjektID", "KategorieID=".$id);
    if(isset($allProjectsWithCategory))
    {
      foreach ($allProjectsWithCategory as $key => $projectID)
      {
        if(dbsCheckIfSingleEntry($database, "projekt_kategorie", "ProjektID=".$projectID))
        {
          $delProjSql = "DELETE FROM projekt WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delProjSql)) return false;
          $delProjUserSql = "DELETE FROM projekt_nutzer WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delProjUserSql)) return false;
          $delChatSql = "DELETE FROM chatinhalt WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delChatSql)) return false;
          $delDesSql = "DELETE FROM beschreibung WHERE ProjektID=".$projectID;
          if(!dbsAddTransaction($database, $delDesSql)) return false;
        }
      }
    }
    $delProjCatSql = "DELETE FROM projekt_kategorie WHERE KategorieID=".$id;
    if(!dbsAddTransaction($database, $delProjCatSql)) return false;
    $database->commit();
    return true;
  }
}
?>
