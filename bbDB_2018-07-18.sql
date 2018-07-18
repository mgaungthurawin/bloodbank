# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: bbDB
# Generation Time: 2018-07-18 06:40:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table blood_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blood_type`;

CREATE TABLE `blood_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `blood_type` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `blood_type` WRITE;
/*!40000 ALTER TABLE `blood_type` DISABLE KEYS */;

INSERT INTO `blood_type` (`id`, `name`, `blood_type`, `quantity`)
VALUES
	(3,'A','A++',10),
	(4,'O','O+',4),
	(5,'AB','AB+',5);

/*!40000 ALTER TABLE `blood_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table location
# ------------------------------------------------------------

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;

INSERT INTO `location` (`id`, `name`)
VALUES
	(1,'Yangon '),
	(3,'Mandalay');

/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_type` int(1) NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `user_type`, `password`)
VALUES
	(1,'Richard Gere Update','richardgere@yahoo.com',2,'5f4dcc3b5aa765d61d8327deb882cf99'),
	(2,'Tukul Arwana','tukul@yahoo.com',2,'5f4dcc3b5aa765d61d8327deb882cf99'),
	(3,'Taylor Swift','tswift@yahoo.com',1,'5f4dcc3b5aa765d61d8327deb882cf99'),
	(4,'Sigit Prasetya','sigit@gmail.com',1,'5f4dcc3b5aa765d61d8327deb882cf99'),
	(5,'Aung Thura','mgaungthurawin@gmail.com',1,'5f4dcc3b5aa765d61d8327deb882cf99');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
