-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 09. Nov 2018 um 11:11
-- Server-Version: 10.1.36-MariaDB
-- PHP-Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `ContentManagementSysteme`
--
CREATE DATABASE IF NOT EXISTS `ContentManagementSysteme` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `ContentManagementSysteme`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Beschreibung`
--

CREATE TABLE IF NOT EXISTS `Beschreibung` (
  `BeschreibungID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjektID` int(11) NOT NULL,
  `Sprache` varchar(5) COLLATE utf8_bin NOT NULL,
  `Text` longblob NOT NULL,
  PRIMARY KEY (`BeschreibungID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Chatinhalt`
--

CREATE TABLE IF NOT EXISTS `Chatinhalt` (
  `ChatinhaltID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjektID` int(11) NOT NULL,
  `NutzerID` int(11) NOT NULL,
  `PositionImChatverlauf` int(11) NOT NULL,
  `ChatText` varchar(255) COLLATE utf8_bin NOT NULL,
  `ChatBildPfad` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ChatinhaltID`),
  UNIQUE KEY `Nutzerin` (`NutzerID`) USING BTREE,
  UNIQUE KEY `Projektil` (`ProjektID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Layout`
--

CREATE TABLE IF NOT EXISTS `Layout` (
  `LayoutID` int(11) NOT NULL AUTO_INCREMENT,
  `CSSDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`LayoutID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Nutzer`
--

CREATE TABLE IF NOT EXISTS `Nutzer` (
  `NutzerID` int(11) NOT NULL AUTO_INCREMENT,
  `Passwort` varchar(40) COLLATE utf8_bin NOT NULL,
  `Vorname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Nachname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Username` varchar(40) COLLATE utf8_bin NOT NULL,
  `admin` bit(1) DEFAULT NULL,
  `ThemeID` int(11) NOT NULL,
  `LayoutID` int(11) NOT NULL,
  PRIMARY KEY (`NutzerID`) USING BTREE,
  UNIQUE KEY `themid` (`ThemeID`),
  UNIQUE KEY `layoutid` (`LayoutID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Projekt`
--

CREATE TABLE IF NOT EXISTS `Projekt` (
  `ProjektID` int(11) NOT NULL,
  `Projektleiter` int(11) NOT NULL,
  `Zustand` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'Wartet auf Begin',
  `TitelbildID` int(11) NOT NULL,
  `BeschreibungID` int(11) NOT NULL,
  `Benennung` varchar(100) COLLATE utf8_bin NOT NULL,
  `Rechte` int(11) NOT NULL,
  `GesuchtesKnowHow` varchar(255) COLLATE utf8_bin NOT NULL,
  `TrelloTasks` int(11) NOT NULL,
  `WebpageLink` varchar(255) COLLATE utf8_bin NOT NULL,
  `GitHubLink` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ProjektID`),
  UNIQUE KEY `titelbildid` (`TitelbildID`),
  UNIQUE KEY `beschreibungid` (`BeschreibungID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PROJEKT_NUTZER`
--

CREATE TABLE IF NOT EXISTS `PROJEKT_NUTZER` (
  `NutzerID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL,
  `Nutzerart` varchar(15) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`NutzerID`,`ProjektID`),
  KEY `ProjektID` (`ProjektID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Theme`
--

CREATE TABLE IF NOT EXISTS `Theme` (
  `ThemeID` int(11) NOT NULL AUTO_INCREMENT,
  `ThemeDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ThemeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Titelbild`
--

CREATE TABLE IF NOT EXISTS `Titelbild` (
  `TitelbildID` int(11) NOT NULL AUTO_INCREMENT,
  `Pfad` varchar(255) COLLATE utf8_bin NOT NULL,
  `Dateityp` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`TitelbildID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Nutzer`
--
ALTER TABLE `Nutzer`
  ADD CONSTRAINT `nutzer_ibfk_1` FOREIGN KEY (`NutzerID`) REFERENCES `PROJEKT_NUTZER` (`NutzerID`),
  ADD CONSTRAINT `nutzer_ibfk_2` FOREIGN KEY (`ThemeID`) REFERENCES `Theme` (`ThemeID`),
  ADD CONSTRAINT `nutzer_ibfk_3` FOREIGN KEY (`LayoutID`) REFERENCES `Layout` (`LayoutID`);

--
-- Constraints der Tabelle `Projekt`
--
ALTER TABLE `Projekt`
  ADD CONSTRAINT `projekt_ibfk_1` FOREIGN KEY (`ProjektID`) REFERENCES `Chatinhalt` (`ProjektID`),
  ADD CONSTRAINT `projekt_ibfk_2` FOREIGN KEY (`BeschreibungID`) REFERENCES `Beschreibung` (`BeschreibungID`),
  ADD CONSTRAINT `projekt_ibfk_3` FOREIGN KEY (`TitelbildID`) REFERENCES `Titelbild` (`TitelbildID`);

--
-- Constraints der Tabelle `PROJEKT_NUTZER`
--
ALTER TABLE `PROJEKT_NUTZER`
  ADD CONSTRAINT `projekt_nutzer_ibfk_1` FOREIGN KEY (`ProjektID`) REFERENCES `Projekt` (`ProjektID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
