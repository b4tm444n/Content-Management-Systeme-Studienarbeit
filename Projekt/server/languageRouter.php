<?php
require_once "db.lib.php";
require_once "languageFuncs.php";
// Router-Datei für die Sprach Methoden
session_start();
$database = dbsConnect();

// Methoden werden aus der languageFuncs.php-Datei bezogen

// Route zur Abfrage des Namens der aktuellen Sprache
if($_POST['route'] == 'currentLaguage')
{
   $data = getCurrentLanguage($database);
   echo json_encode($data);
}
// Route zur Abfrage der Texte für HTML-Elemente eines bestimmten Webseitenbereichs
else if($_POST['route'] == 'currentLaguageLabels' && isset($_POST['website']))
{
   $data = getCurrentLaguageLabels($database, $_POST['website']);
   echo json_encode($data);
}
// Route zur Abfrage der Texte für HTML-Elemente eines bestimmten Webseitenbereichs
// anhand einer angegebenen Sprache
else if($_POST['route'] == 'languageLabels')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['language']) && !empty($_POST['website']))
  {
   $data = getLaguageLabels($database, $_POST['language'], $_POST['website']);
   echo json_encode($data);
  }
  else echo('Nicht alle nötigen Daten übergeben.');
}
// Route zur Abfrage der Namen und der ID aller Sprachen
else if($_POST['route'] == 'getAllLanguages')
{
   $data = getAllLanguages($database);
   echo json_encode($data);
}
// Route zum Setzen der aktuell verwendeten Sprache
else if($_POST['route'] == 'activateLanguage'  && isset($_POST['languageID']))
{
  $data = activateLanguage($database, $_POST['languageID']);
  echo json_encode($data);
}
// Route zum Hinzufügen einer Sprache
else if ($_POST['route'] == 'insertLanguage')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(!empty($_POST['languageData']) && isset($_POST['standardLanguage']))
  {
    $data = insertLanguage($database, $_POST['languageData'], $_POST['standardLanguage']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zum Einfügen der Texte einer Sprache für bestimmte HTML-Elemente
else if($_POST['route'] == 'insertLanguageElements')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(isset($_POST['allElementsArray']))
  {
    $data = insertLanguageElements($database, $_POST['allElementsArray']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zur Rückgabe eines Arrays mit allen Sprachtexten und deren IDs
else if($_POST['route'] == 'getLanguageItems')
{
  //Prüfe ob benötigte Parameter übergeben wurden
  if(isset($_POST['languageID']))
  {
    $data = getLanguageItems($database, $_POST['languageID']);
    echo json_encode($data);
  }
  else echo json_encode(null);
}
// Route zum setzen der Session-Sprache
else if($_POST['route'] == 'setSessionLanguage')
{
  if(is_numeric($_POST['languageID']))
  {
    $_SESSION['language'] = $_POST['languageID'];
    echo json_encode(true);
  }
  else echo json_encode(false);
}
// Route zur Abfrage der Session-Sprache
else if($_POST['route'] == 'getSessionLanguage')
{
  if(isset($_SESSION['language'])) echo json_encode($_SESSION['language']);
  else {
    $data = getCurrentLanguageID($database);
    echo json_encode($data);
  }
}
else echo json_encode(null);
?>
