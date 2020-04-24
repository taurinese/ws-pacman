-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 24 avr. 2020 à 18:59
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pacman`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `timer` time NOT NULL,
  `score` int(11) NOT NULL,
  `max_lvl` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `timer`, `score`, `max_lvl`) VALUES
(32, 'testtest', '00:00:32', 94, 2),
(33, 'ouioui', '00:00:09', 38, 1),
(34, 'ehherher', '00:00:02', 6, 1),
(35, 'okokok', '00:00:06', 26, 1),
(36, 'erherh', '00:00:04', 19, 1),
(37, 'segqq', '00:00:04', 20, 1),
(38, 'hseheshe', '00:00:02', 9, 1),
(39, 'gsg', '00:00:16', 32, 1),
(40, 'eherherh', '00:00:01', 5, 1),
(41, 'ttrkjtrk', '00:00:01', 4, 1),
(42, 'drgdrgdr', '00:00:01', 6, 1),
(43, 'eerhehr', '00:00:02', 9, 1),
(44, 'ezgezgez', '00:00:40', 61, 1),
(45, 'esgesges', '00:00:11', 14, 1),
(46, 'segesges', '00:00:04', 14, 1),
(47, 'okouinon', '00:00:03', 15, 1),
(48, 'shehesh', '00:00:06', 9, 1),
(49, 'edede', '00:00:28', 88, 1),
(50, 'segsehs', '00:00:02', 9, 1),
(51, 'drhrd', '00:00:01', 4, 1),
(52, 'drdr', '00:00:01', 4, 1),
(53, 'drhdrh', '00:00:01', 6, 1),
(54, 'drhdrhd', '00:00:02', 5, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
