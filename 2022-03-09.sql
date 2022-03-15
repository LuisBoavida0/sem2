-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `website`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `website` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `website`;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(25) NOT NULL,
  `pass` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'doej','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcels`
--

DROP TABLE IF EXISTS `parcels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parcels` (
  `trackingNumber` varchar(36) NOT NULL,
  `senderAddress` varchar(500) NOT NULL,
  `destinationAddress` varchar(500) NOT NULL,
  `kgs` tinyint(4) NOT NULL,
  `parcelName` varchar(120) NOT NULL,
  `dateAndTimeAdded` datetime NOT NULL,
  `senderUsername` varchar(25) NOT NULL,
  `assignedCourier` varchar(25) DEFAULT NULL,
  `personWhoReceivedParcel` varchar(100) DEFAULT NULL,
  `signature` text,
  `dateAndTimeReceived` datetime DEFAULT NULL,
  `locationReceived` varchar(25) DEFAULT NULL,
  `parcelStatus` varchar(14) DEFAULT 'not-dispatched',
  PRIMARY KEY (`trackingNumber`),
  KEY `senderUsername` (`senderUsername`),
  KEY `assignedCourier` (`assignedCourier`),
  CONSTRAINT `parcels_ibfk_1` FOREIGN KEY (`senderUsername`) REFERENCES `users` (`userName`),
  CONSTRAINT `parcels_ibfk_2` FOREIGN KEY (`assignedCourier`) REFERENCES `users` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcels`
--

LOCK TABLES `parcels` WRITE;
/*!40000 ALTER TABLE `parcels` DISABLE KEYS */;
INSERT INTO `parcels` VALUES ('006f4183-2c13-4999-b31e-190c33c4e3ab','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',10,'XBOX 1','2022-03-05 03:22:06','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('0194d6a8-019d-478f-a500-28a1dc9080da','undefined','undefined',11,'Clothes','2022-03-01 13:05:05','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('175d9ac8-8f69-4da0-9947-09aca1892622','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','9999999999, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'Playstation 4','2022-03-09 19:43:44','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('275a86df-e30d-48c2-8cc2-629bd83aed24','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:43:17','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('32bb3fea-5509-46c6-9e15-9d525759212a','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',7,'Potatoes','2022-02-17 21:51:30','customer1','courier1',NULL,NULL,NULL,NULL,'in-transit'),('33db7dc8-adbf-4ae8-bdb2-efa3c9af9ecd','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:54:11','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('3b242f10-6d8d-491a-90b2-c33ac2c12984','undefined','undefined',20,'Keyboard','2022-03-02 16:42:00','customer5',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('45a9584c-eba6-4087-a82e-7d32c8f8ce1e','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:55:37','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('4ad7f9aa-9a54-409d-9382-780b376fd37b','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 20:02:15','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('4f8c61cb-b3ad-4a7c-ad0c-70efa0692260','1, Seagrave Rd, Coventry CV1 2AA, UK','2, Gulson Rd, Coventry CV1 2HZ, UK',20,'Keyboard','2022-03-02 16:50:47','customer5',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('56f94b76-42f5-4a9a-8dd1-2d1f93105f62','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',13,'Hammer','2022-02-17 17:12:45','customer1','courier1',NULL,NULL,NULL,NULL,'in-transit'),('63d489b1-8b49-4c1e-8408-c1021eba1149','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','9999999999, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'Playstation 4','2022-03-09 19:43:17','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('6caaf26c-8abb-4e94-8613-f453a9ad1386','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:02:46','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('71f1aba4-5df7-45d5-be62-54ba7ab9b3fb','9999999999, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'Playstation 4','2022-03-09 19:02:46','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('77ca4413-c268-44fb-9950-4316c77aef0d','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',10,'XBOX 1','2022-03-05 03:10:39','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('863f35e9-43cb-4d37-bed1-b290717e6bef','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',10,'XBOX 1','2022-03-05 03:23:13','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('8aee32d7-edaa-439f-9e5b-8cb8f810ed1e','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:58:12','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('8b5e5420-bac2-48dc-a967-7626bdd4b60c','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','9999999999, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'Playstation 4','2022-03-09 19:02:46','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('8b648b36-124d-4c79-9cc2-1b612f3f25b5','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',10,'Playstation 5','2022-03-05 03:08:42','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('9027226f-c76b-4480-93c5-b6663a0ce64b','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 20:02:31','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('a94c91f9-b65b-46d7-bc17-0f1434c7bd1a','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:43:44','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('abea7a06-288e-4bd6-b06a-142a36abc8bf','undefined','undefined',10,'Playstation 4','2022-03-01 12:41:17','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('ac8111ef-6d4f-48a5-9950-580245a7799b','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',8,'USB','2022-02-18 17:57:33','customer1',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('ad009ea4-d651-4c92-9d8f-da72e3fde4a4','undefined','undefined',11,'Iphone','2022-03-01 13:17:10','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('af392dc0-b00e-464f-aecb-aae620d1fd1b','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',12,'Hammer','2022-02-17 12:03:23','customer1',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('b922c4d1-7c30-4e6e-b06a-9a5cb58f4f6b','undefined','undefined',10,'Tablet','2022-03-01 17:28:28','customer4',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('dc260454-800f-497f-95e6-6363e87e4564','undefined','undefined',10,'Playstation 4','2022-03-01 12:39:56','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('e1ff0e74-82c1-49a2-91b5-d6f4f61cb766','22, Seagrave Rd, Coventry CV1 2AA, UK','217, Gulson Rd, Coventry CV1 2HZ, UK',12,'Groceries','2022-02-20 15:26:07','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('e91adbf5-1caa-4194-ad37-36e3f05c267b','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 19:57:04','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('e94513fc-48a8-4c93-859e-2c8098802423','22, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'XBOX 1','2022-03-09 20:01:06','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched'),('fbe30165-7a16-4677-951e-506a2740b736','9999999999, Seagrave Rd, Coventry CV1 2AA, Reino Unido','217, Gulson Rd, Coventry CV1 2HZ, Reino Unido',10,'Playstation 4','2022-03-09 19:43:52','customer3',NULL,NULL,NULL,NULL,NULL,'not-dispatched');
/*!40000 ALTER TABLE `parcels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userName` varchar(25) NOT NULL,
  `password` varchar(70) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `userType` varchar(10) DEFAULT 'user',
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('courier1','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO','courier1@gmail.com','courier'),('courier2','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO','courier2@gmail.com','courier'),('customer1','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO','customer1@gmail.com','user'),('customer2','$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO','customer2@gmail.com','user'),('customer3','$2a$10$/J.RrI88LgZ3x5lS9.lbJOi600oXwYQsxRmvNI0Vlp.1CRi.08E7q','luis.128.b@gmail.com','user'),('customer4','$2a$10$iciLXmnnAgBe9yAuimHJ9er8vNTfWfK21IGH/9HA40OqnmyPxz.62','customer4@gmail.com','user'),('customer5','$2a$10$RNm9VlWLbMLSw4PiWWZ0AelEluDC9cCcfnFBeKFbFMgzm63GjdNvW','customer5@gmail.com','user'),('user20220307130927500','$2a$10$lEOhWT0D54gQTy9JbREf8O8S.HsF8S2UOQyDrAG6leFON1gNXqMJS','user20220307130927500@gmail.com','user'),('user20220307131114673','$2a$10$lEOhWT0D54gQTy9JbREf8O8S.HsF8S2UOQyDrAG6leFON1gNXqMJS','user20220307131114673@gmail.com','user'),('user20220307132007476','$2a$10$lEOhWT0D54gQTy9JbREf8O8S.HsF8S2UOQyDrAG6leFON1gNXqMJS','user20220307132007476@gmail.com','user'),('user20220307132137174','$2a$10$lEOhWT0D54gQTy9JbREf8O8S.HsF8S2UOQyDrAG6leFON1gNXqMJS','user20220307132137174@gmail.com','user'),('user20220307132155914','$2a$10$lEOhWT0D54gQTy9JbREf8O8S.HsF8S2UOQyDrAG6leFON1gNXqMJS','user20220307132155914@gmail.com','user'),('user20220309190041687','$2a$10$VM6QDeIOgLrS1l1Gqo2qy.Ah57WIBpz5tdl3Q8ailiMjXQRw9GcSW','user20220309190041687@gmail.com','user'),('user20220309200554000','$2a$10$YIdYBcyh9rWXLFCXy6fBROujYwzYHFVPas6auGwk/QaG0m2vfMu7a','user20220309200554000@gmail.com','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-09 22:32:06
