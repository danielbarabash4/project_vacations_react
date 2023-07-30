CREATE DATABASE  IF NOT EXISTS `vacation_sql` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacation_sql`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacation_sql
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `destination`
--

DROP TABLE IF EXISTS `destination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `begin` varchar(45) NOT NULL,
  `finish` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination`
--

LOCK TABLES `destination` WRITE;
/*!40000 ALTER TABLE `destination` DISABLE KEYS */;
INSERT INTO `destination` VALUES (1,'Maldives','Description: Known for its pristine white sandy beaches, crystal-clear turquoise waters, and luxurious resorts, the Maldives is a tropical paradise ideal for relaxation, snorkeling, and scuba diving.','18/08/2023','27/08/2023','1145','230516112548-01-crossroads-maldives-aerial.jpg'),(2,'Santorini, Greece','Description: Famous for its iconic blue-domed churches, whitewashed buildings, and stunning sunsets, Santorini offers breathtaking views, beautiful beaches, and a rich history.','26/09/2023','02/10/2023','976','merakos_05_santorini-oia_750x440.jpg'),(3,'Bora Bora, French Polynesia','Description: Bora Bora is renowned for its stunning overwater bungalows, vibrant coral reefs, and turquoise lagoons. It\'s a popular destination for honeymooners and water sports enthusiasts.','15/08/2023','22/08/2023','1205','bora-bora.jpg'),(4,'Machu Picchu, Peru','Description: Machu Picchu is an ancient Incan city perched high in the mountains. It offers incredible archaeological ruins, breathtaking mountain scenery, and opportunities for hiking the Inca Trail.','25/07/2023','31/07/2023','1312','43WWON3AZEMRDTRF7NWDOTXIPY.jpg'),(5,'Serengeti National Park, Tanzania','Description: Serengeti National Park is famous for its vast savannahs, incredible wildlife, and the Great Migration of wildebeest and zebras. It\'s a top safari destination.','06/10/2023','13/10/2023','1950','Serengeti-National-Park-1.jpg'),(6,'Great Barrier Reef, Australia','Description: The Great Barrier Reef is the world\'s largest coral reef system, teeming with diverse marine life. It offers excellent snorkeling, scuba diving, and boat tours.','15/12/2023','20/12/2023','1433','107098862-1659622684655-AP22028253018205.jpg'),(7,'Kyoto, Japan','Description: Kyoto is a city known for its traditional temples, stunning gardens, and preserved historical districts. It\'s a hub of Japanese culture, arts, and traditions.','13/07/2023','19/07/2023','1865','952x460_kyoto_istock.jpg'),(8,'Reykjavik, Iceland','Description: Reykjavik, the capital of Iceland, offers a unique blend of natural wonders and a vibrant city life. It\'s known for its geothermal spas, stunning landscapes, and Northern Lights.','02/08/2023','12/08/2023','1328','reykjavik-iceland-shutterstock_398496772.jpg'),(9,'Rio de Janeiro, Brazil','Description: Rio de Janeiro is famous for its iconic landmarks like Christ the Redeemer and Copacabana Beach. It offers a vibrant nightlife, rich culture, and lively samba music and dance.','28/12/2023','05/01/2024','1422','Cidade_Maravilhosa.jpg'),(10,'Dubai, United Arab Emirates','Description: Dubai is a modern metropolis known for its impressive skyscrapers, luxury shopping malls, artificial islands, and desert safaris. It\'s a city of luxury and innovation.','17/11/2023','23/11/2023','2128','DXB.jpg.1533897728888.image.750.563.low.jpg'),(11,'Queenstown, New Zealand','Description: Queenstown is an adventure capital, surrounded by stunning mountains, lakes, and fjords. It offers activities like bungee jumping, skiing, hiking, and jet boating.','02/08/2023','11/08/2023','998','Qstown-ee2e9a8a78f34ccb8f3599fe286e45f9.jpg'),(12,'Barcelona, Spain','Description: Barcelona is a vibrant city known for its unique architecture, including the famous Sagrada Familia and Park Güell. It offers a lively atmosphere, beautiful beaches, and delicious cuisine.','04/09/2023','11/09/2023','1632','31807948_barceloneta-beach-from-sea-2.jpg'),(17,'france,paris','Discover Paris, the City of Love and Lights. Iconic landmarks, exquisite cuisine, world-class museums, and a romantic ambiance make it an unforgettable vacation destination.','20/07/2023','30/07/2023','2500','eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg'),(18,'Hawaii','Tropical paradise awaits in Hawaii! Explore stunning beaches, vibrant reefs, lush rainforests, and embrace Polynesian culture. Surf, hula, hike volcanoes, and witness breathtaking sunsets in this island oasis.','15/07/2023','17/07/2023','845','hawaii_plane.jpg');
/*!40000 ALTER TABLE `destination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `vac_id` varchar(45) NOT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (6,'39','2'),(7,'39','5'),(179,'40','7'),(191,'41','12'),(192,'41','9'),(193,'41','10'),(194,'41','5'),(195,'41','11'),(202,'40','2'),(205,'41','8'),(206,'41','1'),(207,'41','4'),(208,'41','17'),(209,'41','18'),(267,'3','3'),(268,'3','1'),(271,'3','18'),(272,'3','4'),(273,'40','18'),(274,'40','4'),(277,'40','17'),(278,'3','6'),(280,'3','9'),(281,'40','1'),(282,'39','1'),(283,'39','17'),(285,'39','18'),(286,'39','10'),(287,'39','9'),(288,'39','11'),(289,'44','18'),(290,'44','7'),(291,'44','4'),(292,'44','8'),(293,'44','12'),(294,'44','5'),(295,'44','6'),(296,'60','2'),(297,'60','12');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `admin` varchar(10) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'daniel','barabash','danielbarabash4@gmail.com','12345','true'),(3,'lili','barabash','drbarabash@yahoo.com','12321','false'),(39,'idan','gadasin','idananull@gmail.com','112233','false'),(40,'gil','ovadia','gilovadia33@gmail.com','322211','false'),(41,'test','plswork','yes@no.com','12345','false'),(42,'test','test','danielbarabash4@gmail.com2','12345','false'),(43,'test2','test','danielbarabash4@gmail.com22','12345','false'),(44,'test2','test','danielbarabash4@gmail.com222','12345','false'),(45,'lasttest','daniel','danielbarabash4@gmail.com32','12345','false'),(48,'test4','testme','why@pls.com','12345','false'),(51,'dsadsa','dsadas','dsa@fma.com','13245','false'),(53,'dsa','dsa','dc@gmail.com','156222','false'),(60,'sophia','gor','sofigyori@gmail.com','123456','false');
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

-- Dump completed on 2023-07-30  9:33:18
