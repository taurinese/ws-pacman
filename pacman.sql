-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 20 avr. 2020 à 12:48
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `timer`, `score`, `max_lvl`) VALUES
(1, 'jules', '00:00:17', 32, 1),
(2, 'zaekaze', '00:00:01', 4, 1),
(3, 'ezaea', '00:00:01', 4, 1),
(4, 'ezaeza', '00:00:02', 6, 1),
(5, 'ezae', '00:00:17', 68, 1),
(6, 'eazez', '00:00:01', 4, 1),
(7, 'koml', '00:00:01', 4, 1),
(8, 'nvnv', '00:00:07', 34, 1),
(9, 'msadùel', '00:00:02', 7, 1),
(10, 'bcvb', '00:00:02', 5, 1),
(11, 'vdfs', '00:00:03', 10, 1),
(12, 'ezaeaee', '00:00:02', 7, 1),
(13, 'ezea', '00:00:25', 73, 1),
(14, 'ezea', '00:00:25', 73, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
