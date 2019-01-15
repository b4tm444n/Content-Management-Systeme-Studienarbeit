-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 15. Jan 2019 um 21:54
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

--
-- TRUNCATE Tabelle vor dem Einfügen `Beschreibung`
--

TRUNCATE TABLE `Beschreibung`;
--
-- Daten für Tabelle `Beschreibung`
--

INSERT INTO `Beschreibung` (`BeschreibungID`, `ProjektID`, `Sprache`, `Text`) VALUES
(4, 15, 'de', 0x6a617661),
(5, 16, 'de', 0x6467),
(6, 17, 'de', 0x65696e2077656974657265722054657374);

--
-- TRUNCATE Tabelle vor dem Einfügen `ELEMENT_SPRACHE`
--

TRUNCATE TABLE `ELEMENT_SPRACHE`;
--
-- Daten für Tabelle `ELEMENT_SPRACHE`
--

INSERT INTO `ELEMENT_SPRACHE` (`SpracheID`, `ElementID`, `Text`) VALUES
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
-- TRUNCATE Tabelle vor dem Einfügen `IndexTitelbild`
--

TRUNCATE TABLE `IndexTitelbild`;
--
-- Daten für Tabelle `IndexTitelbild`
--

INSERT INTO `IndexTitelbild` (`IndexTitelbildID`, `BildDateiPfad`, `Verwendet`, `Name`) VALUES
(1, 'projectImages/titelbild.png', 1, 'Standard'),
(2, 'projectImages/spaceship.png', 0, 'test');

--
-- TRUNCATE Tabelle vor dem Einfügen `Kategorie`
--

TRUNCATE TABLE `Kategorie`;
--
-- Daten für Tabelle `Kategorie`
--

INSERT INTO `Kategorie` (`KategorieID`, `KategorieName`) VALUES
(1, 'C Programmierung'),
(2, 'Java Programmierung'),
(3, 'Wissenschaftl. Arbeit');

--
-- TRUNCATE Tabelle vor dem Einfügen `Layout`
--

TRUNCATE TABLE `Layout`;
--
-- Daten für Tabelle `Layout`
--

INSERT INTO `Layout` (`LayoutID`, `LayoutDateiPfad`, `Verwendet`, `Name`) VALUES
(5, 'start.css', 1, 'Standard Layout'),
(6, 'bla.css', 0, 'test');

--
-- TRUNCATE Tabelle vor dem Einfügen `Nutzer`
--

TRUNCATE TABLE `Nutzer`;
--
-- Daten für Tabelle `Nutzer`
--

INSERT INTO `Nutzer` (`NutzerID`, `Passwort`, `Vorname`, `Nachname`, `Username`, `admin`, `ThemeID`, `LayoutID`) VALUES
(6, '6d201beeefb589b08ef0672dac82353d0cbd9ad99e1642c83a1601f3d647bcca003257b5e8f31bdc1d73fbec84fb085c79d6e2677b7ff927e823a54e789140d9', 'Max', 'Mustermann', 'MaxMuster', '0', 1, 1),
(7, '661bb43140229ad4dc3e762e7bdd68cc14bb9093c158c386bd989fea807acd9bd7f805ca4736b870b6571594d0d8fcfc57b98431143dfb770e083fa9be89bc72', 'admin2', 'admin2', 'admin2', '2', 1, 1),
(8, 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', 'admin', 'admin', 'admin', '1', 1, 1);

--
-- TRUNCATE Tabelle vor dem Einfügen `Projekt`
--

TRUNCATE TABLE `Projekt`;
--
-- Daten für Tabelle `Projekt`
--

INSERT INTO `Projekt` (`ProjektID`, `Projektleiter`, `Zustand`, `TitelbildID`, `Benennung`, `Rechte`, `GesuchtesKnowHow`, `TrelloTasks`, `WebpageLink`, `GitHubLink`) VALUES
(1, 0, 'Wartet auf Begin', 0, 'Content Management Systeme StdA', 0, 'HTML, Javaskript, PHP, SQL', 0, '', ''),
(2, 0, 'Wartet auf Begin', 2, '3D Technologie', 0, 'Python', 0, '', ''),
(3, 0, 'Abgeschlossen', 6, 'Programmierung StdA', 0, 'C Programmierung', 0, '', ''),
(7, 0, 'Wartet auf Begin', 9, 'Algorithmen und Datenstrukturen', 0, 'C Programmierung', 0, '', ''),
(15, 1, 'Warte auf Teilnehmer', 11, 'testJava', 0, 'java', 0, '', ''),
(16, 1, 'Warte auf Teilnehmer', 30, 'bild100000000', 0, 'sgs', 0, 'gsdg', 'gdag'),
(17, 1, 'Warte auf Teilnehmer', 34, 'bildtesttest', 0, 'keins', 0, 'bla', 'bla'),
(18, 8, 'Warte auf Teilnehmer', 36, 'sgfgsg', 0, 'sdfsdf', 0, 'wet', 'sfs');

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_KATEGORIE`
--

TRUNCATE TABLE `PROJEKT_KATEGORIE`;
--
-- Daten für Tabelle `PROJEKT_KATEGORIE`
--

INSERT INTO `PROJEKT_KATEGORIE` (`ProjektID`, `KategorieID`) VALUES
(15, 2),
(16, 1),
(17, 2),
(18, 1);

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_NUTZER`
--

TRUNCATE TABLE `PROJEKT_NUTZER`;
--
-- Daten für Tabelle `PROJEKT_NUTZER`
--

INSERT INTO `PROJEKT_NUTZER` (`NutzerID`, `ProjektID`) VALUES
(8, 15),
(8, 16);

--
-- TRUNCATE Tabelle vor dem Einfügen `Sprache`
--

TRUNCATE TABLE `Sprache`;
--
-- Daten für Tabelle `Sprache`
--

INSERT INTO `Sprache` (`SpracheID`, `Name`, `Standard`) VALUES
(1, 'Deutsch', b'1');

--
-- TRUNCATE Tabelle vor dem Einfügen `Theme`
--

TRUNCATE TABLE `Theme`;
--
-- Daten für Tabelle `Theme`
--

INSERT INTO `Theme` (`ThemeID`, `ThemeDateiPfad`, `Verwendet`, `Name`) VALUES
(1, 'bright_theme.css', 1, 'Bright Theme'),
(2, '', 0, 'Kein Theme');

--
-- TRUNCATE Tabelle vor dem Einfügen `Titelbild`
--

TRUNCATE TABLE `Titelbild`;
--
-- Daten für Tabelle `Titelbild`
--

INSERT INTO `Titelbild` (`TitelbildID`, `Pfad`, `Dateityp`) VALUES
(1, '', ''),
(8, 'testpic/path', 'jpeg'),
(10, 'testpic/path', 'jpeg'),
(11, 'testpic/path', 'jpeg'),
(30, 'projectImages/', 'png'),
(34, 'projectImages/', 'jpg'),
(36, 'projectImages/', 'jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
