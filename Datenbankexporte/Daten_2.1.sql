-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 21. Nov 2018 um 13:18
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
(1, 0, '', '');

--
-- TRUNCATE Tabelle vor dem Einfügen `Chatinhalt`
--

TRUNCATE TABLE `Chatinhalt`;
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
(4, 0, 'Wartet auf Begin', 7, 'Software Engineering', 0, 'Java Programmierung', 0, '', ''),
(7, 0, 'Wartet auf Begin', 9, 'Algorithmen und Datenstrukturen', 0, 'C Programmierung', 0, '', '');

--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_KATEGORIE`
--

TRUNCATE TABLE `PROJEKT_KATEGORIE`;
--
-- TRUNCATE Tabelle vor dem Einfügen `PROJEKT_NUTZER`
--

TRUNCATE TABLE `PROJEKT_NUTZER`;
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
(1, '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
