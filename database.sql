-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: hostel
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `hostel`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hostel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hostel`;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int DEFAULT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'CREATE_ROOM','ROOM',10,'Created room 999T in Test Block (Floor 3) with capacity 3. Status: Available','2026-10-15 07:30:57'),(2,'UPDATE_ROOM','ROOM',10,'Updated room 999T (Test Block). Status: Available, Occupancy: 2/3','2026-10-15 07:30:57'),(3,'DELETE_ROOM','ROOM',10,'Deleted room 999T in Test Block permanently.','2026-10-15 07:30:57'),(4,'CREATE_ROOM','ROOM',11,'Created room 777T in Test Block (Floor 1) with capacity 1. Status: Available','2026-10-15 07:30:57'),(5,'DELETE_ROOM','ROOM',11,'Deleted room 777T in Test Block permanently.','2026-10-15 07:30:57'),(6,'CREATE_ROOM','ROOM',12,'Created room 999T in Test Block (Floor 3) with capacity 3. Status: Available','2026-10-15 07:31:08'),(7,'UPDATE_ROOM','ROOM',12,'Updated room 999T (Test Block). Status: Available, Occupancy: 2/3','2026-10-15 07:31:08'),(8,'DELETE_ROOM','ROOM',12,'Deleted room 999T in Test Block permanently.','2026-10-15 07:31:08'),(9,'CREATE_ROOM','ROOM',13,'Created room 777T in Test Block (Floor 1) with capacity 1. Status: Available','2026-10-15 07:31:08'),(10,'DELETE_ROOM','ROOM',13,'Deleted room 777T in Test Block permanently.','2026-10-15 07:31:08'),(11,'CREATE_ROOM','ROOM',14,'Created room 101B in a block (Floor 1) with capacity 3. Status: Available','2026-10-15 07:39:59'),(12,'CREATE_ROOM','ROOM',15,'Created room 999T in Test Block (Floor 3) with capacity 3. Status: Available','2026-10-15 07:53:36'),(13,'UPDATE_ROOM','ROOM',15,'Updated room 999T (Test Block). Status: Available, Occupancy: 2/3','2026-10-15 07:53:36'),(14,'DELETE_ROOM','ROOM',15,'Deleted room 999T in Test Block permanently.','2026-10-15 07:53:36'),(15,'CREATE_ROOM','ROOM',16,'Created room 777T in Test Block (Floor 1) with capacity 1. Status: Available','2026-10-15 07:53:36'),(16,'DELETE_ROOM','ROOM',16,'Deleted room 777T in Test Block permanently.','2026-10-15 07:53:36'),(17,'CREATE_ROOM','ROOM',17,'Created room 101 in aaa (Floor 1) with capacity 2. Status: Occupied','2026-10-15 08:42:54');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Super Administrator',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` VALUES (1,'admin','admin@irshadhms.com','$2b$10$Y7JTez0jZKbxEWGx9SEoAOg0kOxn3N44XQfEmbKP460mdwi7bPB62','Irshad Administrator','Super Administrator','2026-10-15 07:17:04','2026-10-15 07:17:04');
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hostel_settings`
--

DROP TABLE IF EXISTS `hostel_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hostel_settings` (
  `setting_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hostel_settings`
--

LOCK TABLES `hostel_settings` WRITE;
/*!40000 ALTER TABLE `hostel_settings` DISABLE KEYS */;
INSERT INTO `hostel_settings` VALUES ('currency','₹','2026-10-15 07:17:04'),('currency_code','INR','2026-10-15 07:17:04'),('default_room_status','Available','2026-10-15 07:17:04'),('hostel_address','Irshad Campus Road, Bengaluru, Karnataka 560001','2026-10-15 07:17:04'),('hostel_email','contact@irshadhms.com','2026-10-15 07:17:04'),('hostel_name','Irshad Hostel','2026-10-15 07:17:04'),('hostel_phone','+91 98765 43210','2026-10-15 07:17:04'),('theme','light','2026-10-15 07:17:04');
/*!40000 ALTER TABLE `hostel_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `Room_id` int NOT NULL AUTO_INCREMENT,
  `Room_no` varchar(10) NOT NULL,
  `Block_name` varchar(50) NOT NULL,
  `Floor_number` int NOT NULL DEFAULT '1',
  `Capacity` int NOT NULL,
  `Current_occupants` int NOT NULL DEFAULT '0',
  `Room_type` varchar(50) NOT NULL DEFAULT 'Double Sharing',
  `Status` varchar(20) NOT NULL DEFAULT 'Available',
  `Monthly_fee` decimal(10,2) NOT NULL DEFAULT '5000.00',
  `Description` text,
  `Image_path` varchar(255) NOT NULL DEFAULT '/assets/images/room-default.jpg',
  `Created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'101','A Block',1,4,0,'Four Sharing','Available',4200.00,'Standard hostel room in A Block, Floor 1. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(2,'102','A Block',1,3,3,'Triple Sharing','Occupied',5000.00,'Standard hostel room in A Block, Floor 1. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(3,'201','B Block',2,4,0,'Four Sharing','Available',4200.00,'Standard hostel room in B Block, Floor 2. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(4,'103','B block',1,5,0,'Four Sharing','Available',4200.00,'Standard hostel room in B block, Floor 1. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(8,'110','F Block',1,5,5,'Four Sharing','Occupied',4200.00,'Standard hostel room in F Block, Floor 1. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(9,'106','A Block',1,4,0,'Four Sharing','Available',4200.00,'Standard hostel room in A Block, Floor 1. Equipped with study desks, beds, and wardrobes.','/assets/images/room-shared.jpg','2026-10-15 07:17:04','2026-10-15 07:17:04'),(14,'101B','a block',1,3,2,'Triple Sharing','Available',5000.00,'dfghj','/assets/images/room-shared.jpg','2026-10-15 07:39:59','2026-10-15 07:39:59'),(17,'101','aaa',1,2,2,'Double Sharing','Occupied',5000.00,'sss','/assets/images/room-double.jpg','2026-10-15 08:42:54','2026-10-15 08:42:54');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-06 22:45:56
