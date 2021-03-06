-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 13. Nov 2018 um 08:44
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

CREATE TABLE `Beschreibung` (
  `BeschreibungID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL,
  `Sprache` varchar(5) COLLATE utf8_bin NOT NULL,
  `Text` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Chatinhalt`
--

CREATE TABLE `Chatinhalt` (
  `ChatinhaltID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL,
  `NutzerID` int(11) NOT NULL,
  `PositionImChatverlauf` int(11) NOT NULL,
  `ChatText` varchar(255) COLLATE utf8_bin NOT NULL,
  `ChatBildPfad` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Layout`
--

CREATE TABLE `Layout` (
  `LayoutID` int(11) NOT NULL,
  `CSSDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Nutzer`
--

CREATE TABLE `Nutzer` (
  `NutzerID` int(11) NOT NULL,
  `Passwort` varchar(40) COLLATE utf8_bin NOT NULL,
  `Vorname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Nachname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Username` varchar(40) COLLATE utf8_bin NOT NULL,
  `admin` bit(1) DEFAULT NULL,
  `ThemeID` int(11) NOT NULL,
  `LayoutID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Projekt`
--

CREATE TABLE `Projekt` (
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
  `GitHubLink` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PROJEKT_NUTZER`
--

CREATE TABLE `PROJEKT_NUTZER` (
  `NutzerID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL,
  `Nutzerart` varchar(15) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Theme`
--

CREATE TABLE `Theme` (
  `ThemeID` int(11) NOT NULL,
  `ThemeDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Titelbild`
--

CREATE TABLE `Titelbild` (
  `TitelbildID` int(11) NOT NULL,
  `Pfad` varchar(255) COLLATE utf8_bin NOT NULL,
  `Dateityp` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Beschreibung`
--
ALTER TABLE `Beschreibung`
  ADD PRIMARY KEY (`BeschreibungID`);

--
-- Indizes für die Tabelle `Chatinhalt`
--
ALTER TABLE `Chatinhalt`
  ADD PRIMARY KEY (`ChatinhaltID`),
  ADD UNIQUE KEY `Nutzerin` (`NutzerID`) USING BTREE,
  ADD UNIQUE KEY `Projektil` (`ProjektID`) USING BTREE;

--
-- Indizes für die Tabelle `Layout`
--
ALTER TABLE `Layout`
  ADD PRIMARY KEY (`LayoutID`);

--
-- Indizes für die Tabelle `Nutzer`
--
ALTER TABLE `Nutzer`
  ADD PRIMARY KEY (`NutzerID`) USING BTREE,
  ADD UNIQUE KEY `themid` (`ThemeID`),
  ADD UNIQUE KEY `layoutid` (`LayoutID`);

--
-- Indizes für die Tabelle `Projekt`
--
ALTER TABLE `Projekt`
  ADD PRIMARY KEY (`ProjektID`),
  ADD UNIQUE KEY `titelbildid` (`TitelbildID`),
  ADD UNIQUE KEY `beschreibungid` (`BeschreibungID`);

--
-- Indizes für die Tabelle `PROJEKT_NUTZER`
--
ALTER TABLE `PROJEKT_NUTZER`
  ADD PRIMARY KEY (`NutzerID`,`ProjektID`),
  ADD KEY `ProjektID` (`ProjektID`);

--
-- Indizes für die Tabelle `Theme`
--
ALTER TABLE `Theme`
  ADD PRIMARY KEY (`ThemeID`);

--
-- Indizes für die Tabelle `Titelbild`
--
ALTER TABLE `Titelbild`
  ADD PRIMARY KEY (`TitelbildID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Beschreibung`
--
ALTER TABLE `Beschreibung`
  MODIFY `BeschreibungID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Chatinhalt`
--
ALTER TABLE `Chatinhalt`
  MODIFY `ChatinhaltID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Layout`
--
ALTER TABLE `Layout`
  MODIFY `LayoutID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Nutzer`
--
ALTER TABLE `Nutzer`
  MODIFY `NutzerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Theme`
--
ALTER TABLE `Theme`
  MODIFY `ThemeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Titelbild`
--
ALTER TABLE `Titelbild`
  MODIFY `TitelbildID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
