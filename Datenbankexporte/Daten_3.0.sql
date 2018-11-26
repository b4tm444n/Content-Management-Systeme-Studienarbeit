-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 26. Nov 2018 um 09:57
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
(1, 0, '', ''),
(2, 10, 'de', 0x74657374),
(3, 12, 'de', 0x7364766666),
(4, 15, 'de', 0x6a617661);

--
-- TRUNCATE Tabelle vor dem Einfügen `Chatinhalt`
--

TRUNCATE TABLE `Chatinhalt`;
--
-- TRUNCATE Tabelle vor dem Einfügen `Element`
--

TRUNCATE TABLE `Element`;
--
-- Daten für Tabelle `Element`
--

INSERT INTO `Element` (`ElementID`, `Html_ID`, `HtmlSeite`) VALUES
(1, 'searchLabel', 'index'),
(2, 'CategoriesAll', 'index'),
(3, 'LoginButton', 'index'),
(4, 'loginWindow', 'index'),
(5, 'LoginUsername', 'index'),
(6, 'LoginPassword', 'index'),
(7, 'btnSubmit', 'index'),
(8, 'CreateAccount', 'index'),
(9, 'CreateAcWindow', 'index'),
(10, 'CreateAcFamilyname', 'index'),
(11, 'CreateAcName', 'index'),
(12, 'CreateAcUsername', 'index'),
(13, 'CreateAcPassword', 'index'),
(14, 'btnCreateAC', 'index'),
(15, 'titel', 'projektDetails');

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
(1, 4, 'Anmelden'),
(1, 5, 'Benutzername'),
(1, 6, 'Passwort'),
(1, 7, 'Anmelden'),
(1, 8, 'Account erstellen'),
(1, 9, 'Account erstellen'),
(1, 10, 'Nachname'),
(1, 11, 'Vorname'),
(1, 12, 'Nutzername'),
(1, 13, 'Passwort'),
(1, 14, 'Account erstellen'),
(2, 1, 'Search');

--
-- TRUNCATE Tabelle vor dem Einfügen `Kategorie`
--

TRUNCATE TABLE `Kategorie`;
--
-- Daten für Tabelle `Kategorie`
--

INSERT INTO `Kategorie` (`KategorieID`, `KategorieName`) VALUES
(1, 'C Programmierung'),
(2, 'Java Programmierung');

--
-- TRUNCATE Tabelle vor dem Einfügen `Layout`
--

TRUNCATE TABLE `Layout`;
--
-- Daten für Tabelle `Layout`
--

INSERT INTO `Layout` (`LayoutID`, `CSSDateiPfad`) VALUES
(1, 'Testpfad');

--
-- TRUNCATE Tabelle vor dem Einfügen `Nutzer`
--

TRUNCATE TABLE `Nutzer`;
--
-- Daten für Tabelle `Nutzer`
--

INSERT INTO `Nutzer` (`NutzerID`, `Passwort`, `Vorname`, `Nachname`, `Username`, `admin`, `ThemeID`, `LayoutID`) VALUES
(1, 'test123', 'Max', 'Mustermann', 'MaxMuster', b'0', 1, 0),
(2, 'admin', 'ad', 'min', 'admin', b'1', 2, 2);

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
(10, 1, 'Warte auf Teilnehmer', 8, 'eintest', 0, 'C Programmierung', 0, 'j', 'j'),
(12, 1, 'Warte auf Teilnehmer', 10, 'fsf', 0, 'dfsdf', 0, '', ''),
(14, 9, 'Wartet auf Begin', 12, 'irgendwas java', 0, 'Java Programmierung', NULL, NULL, NULL),
(15, 1, 'Warte auf Teilnehmer', 11, 'testJava', 0, 'java', 0, '', '');

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_KATEGORIE`
--

TRUNCATE TABLE `PROJEKT_KATEGORIE`;
--
-- Daten für Tabelle `PROJEKT_KATEGORIE`
--

INSERT INTO `PROJEKT_KATEGORIE` (`ProjektID`, `KategorieID`) VALUES
(10, 1),
(12, 1),
(15, 2);

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_NUTZER`
--

TRUNCATE TABLE `PROJEKT_NUTZER`;
--
-- TRUNCATE Tabelle vor dem Einfügen `Sprache`
--

TRUNCATE TABLE `Sprache`;
--
-- Daten für Tabelle `Sprache`
--

INSERT INTO `Sprache` (`SpracheID`, `Name`, `Standard`) VALUES
(1, 'Deutsch', b'1'),
(2, 'Englisch', b'0');

--
-- TRUNCATE Tabelle vor dem Einfügen `Theme`
--

TRUNCATE TABLE `Theme`;
--
-- Daten für Tabelle `Theme`
--

INSERT INTO `Theme` (`ThemeID`, `ThemeDateiPfad`) VALUES
(1, 'Testpfad');

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
(11, 'testpic/path', 'jpeg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
