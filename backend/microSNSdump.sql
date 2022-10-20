-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: microSNS
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tweetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (4,'1','7',' comment on another tweet','2022-09-27 08:32:12','2022-09-27 08:32:12'),(5,'1','32',' comment on another tweet id 32','2022-09-27 08:32:40','2022-09-27 08:32:40'),(12,'5','7','comment by vishal','2022-09-27 09:23:05','2022-09-27 09:23:05'),(19,'1','7','yes I like it too and searching for more','2022-09-29 10:17:30','2022-09-29 10:17:30'),(20,'1','7','yes I like it too ','2022-09-29 10:18:00','2022-09-29 10:18:00'),(21,'1','32','It\'s really nice','2022-09-29 10:18:42','2022-09-29 10:18:42'),(22,'6','35','Nice post !!!','2022-09-29 10:33:54','2022-09-29 10:33:54'),(24,'5','38','let\'s add a commnet','2022-09-30 10:03:30','2022-09-30 10:03:30'),(25,'5','33','liking the post made by userId 2','2022-10-03 05:33:24','2022-10-03 05:33:24'),(27,'5','34','hello saitama','2022-10-03 06:20:22','2022-10-03 06:20:22'),(29,'5','34','good story btw','2022-10-03 07:04:52','2022-10-03 07:04:52'),(30,'5','7','one more comment','2022-10-03 08:22:35','2022-10-03 08:22:35'),(31,'5','7','hmmmmmmmmm','2022-10-03 08:28:19','2022-10-03 08:28:19'),(33,'5','32','why ??????????/','2022-10-03 09:16:54','2022-10-03 09:16:54'),(46,'3','37','hello ','2022-10-14 09:56:38','2022-10-14 09:56:38'),(48,'3','40','see','2022-10-14 10:34:42','2022-10-14 10:34:42'),(49,'3','40','see ok','2022-10-14 10:35:19','2022-10-14 10:35:19'),(51,'3','48','hmm','2022-10-14 10:58:38','2022-10-14 10:58:38');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (22,'33','2','2022-09-26 12:52:50','2022-09-26 12:52:50'),(25,'33','1','2022-09-27 05:43:45','2022-09-27 05:43:45'),(27,'7','1','2022-09-29 03:59:45','2022-09-29 03:59:45'),(28,'32','1','2022-09-29 04:00:36','2022-09-29 04:00:36'),(29,'34','1','2022-09-29 07:59:33','2022-09-29 07:59:33'),(30,'36','6','2022-09-29 10:32:27','2022-09-29 10:32:27'),(31,'34','6','2022-09-29 10:32:47','2022-09-29 10:32:47'),(32,'35','6','2022-09-29 10:32:49','2022-09-29 10:32:49'),(34,'37','6','2022-09-29 11:12:25','2022-09-29 11:12:25'),(35,'38','5','2022-09-30 10:03:36','2022-09-30 10:03:36'),(36,'37','5','2022-09-30 10:03:44','2022-09-30 10:03:44'),(39,'35','5','2022-09-30 11:02:58','2022-09-30 11:02:58'),(40,'38','1','2022-10-04 07:08:54','2022-10-04 07:08:54'),(51,'39','3','2022-10-05 07:59:57','2022-10-05 07:59:57'),(62,'41','3','2022-10-05 10:56:42','2022-10-05 10:56:42'),(63,'34','5','2022-10-06 04:42:34','2022-10-06 04:42:34'),(67,'40','2','2022-10-11 05:39:15','2022-10-11 05:39:15'),(68,'45','3','2022-10-11 05:44:16','2022-10-11 05:44:16'),(80,'34','3','2022-10-14 09:00:20','2022-10-14 09:00:20'),(84,'32','3','2022-10-14 09:47:38','2022-10-14 09:47:38'),(85,'7','3','2022-10-14 09:48:08','2022-10-14 09:48:08'),(87,'38','3','2022-10-14 09:57:17','2022-10-14 09:57:17'),(88,'48','3','2022-10-14 10:42:40','2022-10-14 10:42:40'),(89,'48','5','2022-10-14 11:48:54','2022-10-14 11:48:54');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `text` varchar(255) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `commentsCount` int DEFAULT '0',
  `likesCount` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (7,'3','Hello every one this is my first post, Do you guys like to read solo leveling manga ?','https://res.cloudinary.com/dnt0lylln/image/upload/v1663999940/m6kazisxholrq9q8e8sv.png',6,1,'2022-09-24 06:12:21','2022-10-14 09:48:08'),(32,'2','Deleting a post is working','https://res.cloudinary.com/dnt0lylln/image/upload/v1664196618/jlueml0sq6bqav0j9fnl.png',4,2,'2022-09-26 12:50:19','2022-10-14 09:47:38'),(33,'2','Liking a post is working','https://res.cloudinary.com/dnt0lylln/image/upload/v1664196740/yvcf4pvgpsix8rlgabs7.png',2,2,'2022-09-26 12:52:21','2022-10-14 09:48:28'),(34,'1','let\'s check the frontend ,\nContrary to popular belief, Lorem Ipsum d ','https://res.cloudinary.com/dnt0lylln/image/upload/v1664436563/smyiu91glynfhpo1fgc4.png',3,4,'2022-09-29 07:29:23','2022-10-14 09:00:20'),(35,'6','Hello world !!!!!!!','https://res.cloudinary.com/dnt0lylln/image/upload/v1664447187/ajnrx90vcya2kebq989p.png',1,2,'2022-09-29 10:26:28','2022-10-14 06:30:26'),(36,'6','Hello everyone , it\'s my second post from India','https://res.cloudinary.com/dnt0lylln/image/upload/v1664447513/zmnfx2b9y2nliqitwpvq.jpg',0,1,'2022-09-29 10:31:54','2022-10-11 05:36:22'),(37,'6','it is my new post','https://res.cloudinary.com/dnt0lylln/image/upload/v1664449919/pnfqbbifon7bt3v4p2bs.jpg',1,2,'2022-09-29 11:11:59','2022-10-14 09:57:27'),(38,'5','A new user posting a new post','https://res.cloudinary.com/dnt0lylln/image/upload/v1664532159/n4vqes3rwdbvsifluem1.jpg',1,3,'2022-09-30 10:02:40','2022-10-14 09:57:17'),(39,'1','How can I check if a user liked a post in React, Node and MySQL?','https://res.cloudinary.com/dnt0lylln/image/upload/v1664867643/thnqkihtk5mz1x7lesat.png',3,1,'2022-10-04 07:14:04','2022-10-05 10:03:59'),(40,'3','let\'s see','https://res.cloudinary.com/dnt0lylln/image/upload/v1664964306/xlnczz494uqw1l45fb77.png',3,1,'2022-10-05 10:05:06','2022-10-14 10:35:19'),(41,'3','new post',NULL,0,1,'2022-10-05 10:40:15','2022-10-07 09:06:43'),(44,'3','let\'s see',NULL,0,0,'2022-10-11 05:40:50','2022-10-11 05:40:50'),(45,'3','ok once more','https://res.cloudinary.com/dnt0lylln/image/upload/v1665467025/i2fdoglqtstj1qvrhqy3.png',0,1,'2022-10-11 05:43:45','2022-10-11 05:44:16'),(48,'3','new post oct 14','https://res.cloudinary.com/dnt0lylln/image/upload/v1665742288/gdulnhyxilodgifoogpr.jpg',1,2,'2022-10-14 10:11:29','2022-10-14 11:48:54');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1','test1','test1@gmail.com','$2a$05$cfXflEYxdozWaF2yT.uPnO7U2zia/csP/rTuFfSaYR784eP.7qC7G',NULL,'2022-09-19 10:08:36','2022-10-04 07:14:41'),(2,'test2','test2','test2@gmail.com','$2a$05$rpBHHNpsswH3BmgTbIUYK.PFRlTlVqttqVAEJN..gcEaVWUibJdoW',NULL,'2022-09-19 10:08:53','2022-10-11 05:39:19'),(3,'test3','test3','test3@gmail.com','$2a$05$/tKKJI0o//4L8i2nqHUK8OI/v2Ni/NtVeq4n6kfSxuWz.r2klNGsm',NULL,'2022-09-19 10:09:05','2022-10-14 11:48:39'),(4,'test4','test4','test4@gmail.com','$2a$05$Pfy6IEriqG5LFSZwrEoodOMkEOznyjk2CBWdxbt9zp.lBc1oIrJnG',NULL,'2022-09-19 10:09:38','2022-10-11 05:38:46'),(5,'visha','vishal','test@test.com','$2a$05$/6k24H4Hk57q3n6rfigP0OWg9shuEr2eDoYfrlWRYXmEcHHsrg3BW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsIm5hbWUiOiJ2aXNoYSIsInVzZXJuYW1lIjoidmlzaGFsIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjY1NzQ4MTI2LCJleHAiOjE2NjU4MzQ1MjZ9.8_IAYJ3zrVSBWn7Qy5h7skFLdnHuewiT7vzoQfwef4s','2022-09-24 06:30:57','2022-10-14 11:48:46'),(6,'saitama','onePunch','one@one.com','$2a$05$2S0fYKuszedEdGomXY3KO.wDgT5M3PbN5OY9ABKWE5j6ii.qUNSK.',NULL,'2022-09-29 10:21:18','2022-09-30 10:01:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'microSNS'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-19 10:17:24
