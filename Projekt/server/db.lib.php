<?php
//Verbindung zur Datenbank herstellen
function dbsConnect()
{
  $conn = new mysqli("localhost", "root", "", "contentmanagementsysteme");
  return $conn;
}

/*Funktion zur Überprüfung ob ein Tabelleneintrag existiert
* Input:  $database - Datenbankverbindung
*         $table - Zu durchsuchende Tabelle
*         $clause - WHERE-Statement einer SQL-Anfrage
* Output: boolean - true(Eintrag existiert)/false(Eintrag existiert nicht)
* Beispiel $clause: "id=1"
*/
function dbsEntryExists($database, $table, $clause)
{
  $query = "SELECT * FROM $table WHERE $clause";
  if($entrys = $database->query($query))
  {
    while ($row = $entrys->fetch_assoc())
    {
      return true;
    }
  }
  return false;
}

/*Funktion zur Rückgabe eines bestimmten Feldwerts in der Tabelle
* Input:  $database - Datenbankverbindung
*         $table - Zu durchsuchende Tabelle
*         $field - Gewünschtes Tabellenfeld
*         $clause - WHERE-Statement einer SQL-Anfrage
*         $stringify - Cast des Ergebniswertes in einen String?
* Output: $result - Wert des gesuchten Feldes
* Beispiel $clause: "id=1"; $field: "role"
*/
function dbsSingleValue($database, $table, $field, $clause, $stringify = false)
{
  $query = "SELECT $field FROM $table WHERE $clause";
  if($entrys = $database->query($query))
  {
    if($entrys->num_rows > 0)
    {
      $tablerow = $entrys->fetch_assoc();
      $result = $tablerow[$field];
      if($stringify) return (string)$result;
      else return $result;
    }
  }
  else return null;
}

/*Funktion zur Rückgabe aller Feldwerte der gewünschten Tabellenspaltenname aus dem Anfrageergebnis
* Input:  $database - Datenbankverbindung
*         $table - Zu durchsuchende Tabelle
*         $field - Gewünschtes Tabellespalte
*         $clause - WHERE-Statement einer SQL-Anfrage
*         $stringify - Cast der Ergebniswerte in einen String?
* Output: $result - Array mit allen gefundenen Feldwerten
* Beispiel $clause: "role='admin'"; $field: "id"
*/
function dbsMultipleValues($database, $table, $field, $clause, $stringify = false)
{
  $query = "SELECT $field FROM $table WHERE $clause";
  if($entrys = $database->query($query))
  {
    if($entrys->num_rows > 0)
    {
      $result = array();
      while($tablerow = $entrys->fetch_assoc())
      {
        if($stringify) array_push($result, (string)$tablerow[$field]);
        else array_push($result, $tablerow[$field]);
      }
      return $result;
    }
  }
  return null;
}

/*Liefert alle gefundenen Einträge zurück
* Input:  $database - Datenbankverbindung
*         $query - Eine komplette SELECT SQL-Anfrage
* Output: $result - Gefundene Tabellenreihe / null
* Outputaccess -> while($row = $result->fetch_assoc())
* Beispiel $query: "SELECT * FROM table1 WHERE name='vorname'"
*/

function dbsMultipleValuesNoClause ($database, $table, $field)
{
  $query = "SELECT $field FROM $table";
  $result = array();
  $entrys = $database->query($query);
  if($entrys->num_rows > 0)
  {
    while($tablerow = $entrys->fetch_assoc())
    {
      array_push($result, $tablerow[$field]);
    }
    return $result;
  }
  return null;
}
/* Liefert alle gefundenen Einträge zurück
*  Keine WHERE Klausel!
*/



function dbsSelect($database, $query)
{
  if($entrys = $database->query($query))
  {
    if($entrys->num_rows > 0)
    {
      return $entrys;
    }
  }
  return null;
}

/*Liefert den ersten gefundenen Eintrag(komplette Tabellenreihe) zurück
* Input:  $database - Datenbankverbindung
*         $query - Eine komplette SELECT SQL-Anfrage
* Output: $result - Gefundene Tabellenreihe / null
* Outputaccess -> $result['Tabellenspaltenname']
* Beispiel $query: "SELECT FROM table1 WHERE name='vorname'"
*/
function dbsSingleRow($database, $query)
{
  if($entrys = $database->query($query))
  {
    if($entrys->num_rows > 0)
    {
      $result = $entrys->fetch_assoc();
      return $result;
    }
  }
  else return null;
}

/*Funktion um einen SQL-Befehl auszuführen
* Input:  $database - Datenbankverbindung
*         $SQL - Der SQL-Befehl
* Output: boolean - true(Befehl ausgeführt)/false(Fehler beim Ausführen)
* Beispiel $SQL: "INSERT INTO nutzer (vorname, nachname, email)
*                 VALUES ('John', 'Doe', 'john@example.com')"
*/
function dbsExecuteSQL($database, $SQL)
{
  if ($database->query($SQL) === TRUE)
  {
    return true;
  }
  else
  {
    return false;
  }
}

/*Funktion um eine Transaktion mit der DB zu starten(zstl. SQL-Befehl auszuführen)
* Input:  $database - Datenbankverbindung
*         $SQL - Der SQL-Befehl
* Output: boolean - true(Befehl ausgeführt)/false(Fehler beim Ausführen)
* Beispiel $SQL: "INSERT INTO nutzer (vorname, nachname, email)
*                 VALUES ('John', 'Doe', 'john@example.com')"
*/
function dbsBeginTransaction($database, $SQL)
{
  $database->begin_transaction();
  $database->autocommit(FALSE);
  if ($database->query($SQL) === TRUE)
  {
    return true;
  }
  else
  {
    $database->rollback();
    return false;
  }
}

/*Funktion um eine Transaktion zur DB hinzuzufügen
* Input:  $database - Datenbankverbindung
*         $SQL - Der SQL-Befehl
* Output: boolean - true(Befehl ausgeführt)/false(Fehler beim Ausführen)
* Beispiel $SQL: "INSERT INTO nutzer (vorname, nachname, email)
*                 VALUES ('John', 'Doe', 'john@example.com')"
*/
function dbsAddTransaction($database, $SQL)
{
  if ($database->query($SQL) === TRUE)
  {
    return true;
  }
  else
  {
    $database->rollback();
    return false;
  }
}

/*Funktion um eine Transaktion mit der DB zu beenden(zstl. SQL-Befehl auszuführen)
* Input:  $database - Datenbankverbindung
*         $SQL - Der SQL-Befehl
* Output: boolean - true(Befehl ausgeführt)/false(Fehler beim Ausführen)
* Beispiel $SQL: "INSERT INTO nutzer (vorname, nachname, email)
*                 VALUES ('John', 'Doe', 'john@example.com')"
*/
function dbsEndTransaction($database, $SQL)
{
  $database->begin_transaction();
  if ($database->query($SQL) === TRUE)
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

/*Liefert den ersten gefundenen Eintrag(komplette Tabellenreihe) zurück
* Input:  $database - Datenbankverbindung
*         $comp - Zeichen des Vergleichs "<", ">", "="
*         $number - Anzahl mit der verglichen werden soll
*         $table - Tabelle die durchsucht wird
*         $clause - WHERE-Statement der SQL-Anfrage
* Output: boolean - true(Vergleich erfolgreich)/false(Vergleich fehlgeschlagen)
* Beispiel $clause: "name='vorname' AND email='email'"
*/
function dbsCheckNumOfEntrys($database, $comp, $number, $table, $clause)
{
  $entrys = $database->query($query);
  switch($comp)
  {
    case ">":
      if($entrys->num_rows > $number) return true;
      break;
    case "<":
      if($entrys->num_rows < $number) return true;
      break;
    case "=":
      if($entrys->num_rows == $number) return true;
      break;
  }
  return false;
}

 ?>
