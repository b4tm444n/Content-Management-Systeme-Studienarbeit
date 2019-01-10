-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 10. Jan 2019 um 17:42
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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Beschreibung`
--

DROP TABLE IF EXISTS `Beschreibung`;
CREATE TABLE `Beschreibung` (
  `BeschreibungID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL,
  `Sprache` varchar(5) COLLATE utf8_bin NOT NULL,
  `Text` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Element`
--

DROP TABLE IF EXISTS `Element`;
CREATE TABLE `Element` (
  `ElementID` int(11) NOT NULL,
  `Html_ID` varchar(100) COLLATE utf8_bin NOT NULL,
  `HtmlSeite` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ELEMENT_SPRACHE`
--

DROP TABLE IF EXISTS `ELEMENT_SPRACHE`;
CREATE TABLE `ELEMENT_SPRACHE` (
  `SpracheID` int(11) NOT NULL,
  `ElementID` int(11) NOT NULL,
  `Text` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `IndexTitelbild`
--

DROP TABLE IF EXISTS `IndexTitelbild`;
CREATE TABLE `IndexTitelbild` (
  `IndexTitelbildID` int(11) NOT NULL,
  `BildDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL,
  `Verwendet` int(1) NOT NULL,
  `Name` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Kategorie`
--

DROP TABLE IF EXISTS `Kategorie`;
CREATE TABLE `Kategorie` (
  `KategorieID` int(11) NOT NULL,
  `KategorieName` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Layout`
--

DROP TABLE IF EXISTS `Layout`;
CREATE TABLE `Layout` (
  `LayoutID` int(11) NOT NULL,
  `LayoutDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL,
  `Verwendet` int(1) NOT NULL,
  `Name` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Nutzer`
--

DROP TABLE IF EXISTS `Nutzer`;
CREATE TABLE `Nutzer` (
  `NutzerID` int(11) NOT NULL,
  `Passwort` varchar(129) COLLATE utf8_bin NOT NULL,
  `Vorname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Nachname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Username` varchar(40) COLLATE utf8_bin NOT NULL,
  `admin` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `ThemeID` int(11) NOT NULL,
  `LayoutID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Projekt`
--

DROP TABLE IF EXISTS `Projekt`;
CREATE TABLE `Projekt` (
  `ProjektID` int(11) NOT NULL,
  `Projektleiter` int(11) NOT NULL,
  `Zustand` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'Wartet auf Begin',
  `TitelbildID` int(11) NOT NULL,
  `Benennung` varchar(100) COLLATE utf8_bin NOT NULL,
  `Rechte` int(11) NOT NULL,
  `GesuchtesKnowHow` varchar(255) COLLATE utf8_bin NOT NULL,
  `TrelloTasks` int(11) DEFAULT NULL,
  `WebpageLink` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `GitHubLink` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PROJEKT_KATEGORIE`
--

DROP TABLE IF EXISTS `PROJEKT_KATEGORIE`;
CREATE TABLE `PROJEKT_KATEGORIE` (
  `ProjektID` int(11) NOT NULL,
  `KategorieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PROJEKT_NUTZER`
--

DROP TABLE IF EXISTS `PROJEKT_NUTZER`;
CREATE TABLE `PROJEKT_NUTZER` (
  `NutzerID` int(11) NOT NULL,
  `ProjektID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Sprache`
--

DROP TABLE IF EXISTS `Sprache`;
CREATE TABLE `Sprache` (
  `SpracheID` int(11) NOT NULL,
  `Name` varchar(20) COLLATE utf8_bin NOT NULL,
  `Standard` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Theme`
--

DROP TABLE IF EXISTS `Theme`;
CREATE TABLE `Theme` (
  `ThemeID` int(11) NOT NULL,
  `ThemeDateiPfad` varchar(255) COLLATE utf8_bin NOT NULL,
  `Verwendet` int(1) NOT NULL,
  `Name` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Titelbild`
--

DROP TABLE IF EXISTS `Titelbild`;
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
-- Indizes für die Tabelle `Element`
--
ALTER TABLE `Element`
  ADD PRIMARY KEY (`ElementID`);

--
-- Indizes für die Tabelle `ELEMENT_SPRACHE`
--
ALTER TABLE `ELEMENT_SPRACHE`
  ADD PRIMARY KEY (`SpracheID`,`ElementID`);

--
-- Indizes für die Tabelle `IndexTitelbild`
--
ALTER TABLE `IndexTitelbild`
  ADD PRIMARY KEY (`IndexTitelbildID`);

--
-- Indizes für die Tabelle `Kategorie`
--
ALTER TABLE `Kategorie`
  ADD PRIMARY KEY (`KategorieID`),
  ADD UNIQUE KEY `KategorieName` (`KategorieName`);

--
-- Indizes für die Tabelle `Layout`
--
ALTER TABLE `Layout`
  ADD PRIMARY KEY (`LayoutID`);

--
-- Indizes für die Tabelle `Nutzer`
--
ALTER TABLE `Nutzer`
  ADD PRIMARY KEY (`NutzerID`) USING BTREE;

--
-- Indizes für die Tabelle `Projekt`
--
ALTER TABLE `Projekt`
  ADD PRIMARY KEY (`ProjektID`),
  ADD UNIQUE KEY `titelbildid` (`TitelbildID`);

--
-- Indizes für die Tabelle `PROJEKT_KATEGORIE`
--
ALTER TABLE `PROJEKT_KATEGORIE`
  ADD PRIMARY KEY (`ProjektID`,`KategorieID`);

--
-- Indizes für die Tabelle `PROJEKT_NUTZER`
--
ALTER TABLE `PROJEKT_NUTZER`
  ADD PRIMARY KEY (`NutzerID`,`ProjektID`),
  ADD KEY `ProjektID` (`ProjektID`);

--
-- Indizes für die Tabelle `Sprache`
--
ALTER TABLE `Sprache`
  ADD PRIMARY KEY (`SpracheID`);

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
-- AUTO_INCREMENT für Tabelle `Element`
--
ALTER TABLE `Element`
  MODIFY `ElementID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `IndexTitelbild`
--
ALTER TABLE `IndexTitelbild`
  MODIFY `IndexTitelbildID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Kategorie`
--
ALTER TABLE `Kategorie`
  MODIFY `KategorieID` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT für Tabelle `Projekt`
--
ALTER TABLE `Projekt`
  MODIFY `ProjektID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Sprache`
--
ALTER TABLE `Sprache`
  MODIFY `SpracheID` int(11) NOT NULL AUTO_INCREMENT;

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
