-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 30. Dez 2018 um 09:46
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
(4, 15, 'de', 0x6a617661),
(5, 16, 'de', 0x6467),
(6, 17, 'de', 0x65696e2077656974657265722054657374);

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
-- TRUNCATE Tabelle vor dem Einfügen `IndexTitelbild`
--

TRUNCATE TABLE `IndexTitelbild`;
--
-- Daten für Tabelle `IndexTitelbild`
--

INSERT INTO `IndexTitelbild` (`IndexTitelbildID`, `BildDateiPfad`, `Verwendet`, `Name`) VALUES
(1, 'projectImages/titelbild.png', b'1', 'Standard'),
(2, 'flasch', b'0', 'test');

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

INSERT INTO `Layout` (`LayoutID`, `LayoutDateiPfad`, `Verwendet`, `Name`) VALUES
(1, 'Testpfad', b'0', ''),
(5, 'start.css', b'1', 'Standard Layout');

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
(10, 1, 'Warte auf Teilnehmer', 8, 'eintest', 0, 'C Programmierung', 0, 'j', 'j'),
(15, 1, 'Warte auf Teilnehmer', 11, 'testJava', 0, 'java', 0, '', ''),
(16, 1, 'Warte auf Teilnehmer', 30, 'bild100000000', 0, 'sgs', 0, 'gsdg', 'gdag'),
(17, 1, 'Warte auf Teilnehmer', 34, 'bildtesttest', 0, 'keins', 0, 'bla', 'bla');

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_KATEGORIE`
--

TRUNCATE TABLE `PROJEKT_KATEGORIE`;
--
-- Daten für Tabelle `PROJEKT_KATEGORIE`
--

INSERT INTO `PROJEKT_KATEGORIE` (`ProjektID`, `KategorieID`) VALUES
(10, 1),
(15, 2),
(16, 1),
(17, 2);

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

INSERT INTO `Theme` (`ThemeID`, `ThemeDateiPfad`, `Verwendet`, `Name`) VALUES
(1, 'bright_theme.css', b'0', 'Bright Theme'),
(2, '', b'1', 'Kein Theme');

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
(34, 'projectImages/', 'jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
