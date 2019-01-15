-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Jan 2019 um 19:17
-- Server-Version: 10.1.24-MariaDB
-- PHP-Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `contentmanagementsysteme`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `element_sprache`
--

CREATE TABLE `element_sprache` (
  `SpracheID` int(11) NOT NULL,
  `ElementID` int(11) NOT NULL,
  `Text` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `element_sprache`
--

INSERT INTO `element_sprache` (`SpracheID`, `ElementID`, `Text`) VALUES
(1, 1, 'Suche'),
(1, 2, 'Alle'),
(1, 3, 'Anmelden'),
(1, 4, 'Nutzername'),
(1, 5, 'Passwort'),
(1, 6, 'Account erstellen'),
(1, 7, 'Nachname'),
(1, 8, 'Vorname'),
(1, 9, 'Lese mehr...'),
(1, 10, 'Verwaltung'),
(1, 11, 'Projekte laden'),
(1, 12, 'Meine Projekte'),
(1, 13, 'Projekt erstellen'),
(1, 14, 'Account erstellen'),
(1, 15, 'Zustand'),
(1, 16, 'Projektleiter'),
(1, 17, 'Teilnehmer'),
(1, 18, 'Teilnehmen'),
(1, 19, 'Verlassen'),
(1, 20, 'Kategorien Verwalten'),
(1, 21, 'Titelbild anpassen'),
(1, 22, 'Nutzer Verwalten'),
(1, 23, 'Projekte Verwalten'),
(1, 24, 'Standard Sprache einstellen'),
(1, 25, 'Sprache hinzufuegen'),
(1, 26, 'Layout und Theme verwalten'),
(1, 27, 'Layout und Theme hinzufuegen'),
(1, 28, 'Sprachauswahl');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `element_sprache`
--
ALTER TABLE `element_sprache`
  ADD PRIMARY KEY (`SpracheID`,`ElementID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
