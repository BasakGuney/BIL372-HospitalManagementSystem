-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proje
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `bolum`
--

DROP TABLE IF EXISTS `bolum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bolum` (
  `Bolum_ID` int NOT NULL,
  `Bolum_Adi` varchar(255) NOT NULL,
  `Yatak_Sayisi` int DEFAULT NULL,
  `Yatan_Hasta_ID` int DEFAULT NULL,
  PRIMARY KEY (`Bolum_ID`),
  KEY `Yatan_Hasta_ID_idx` (`Yatan_Hasta_ID`),
  CONSTRAINT `Yatan_Hasta_ID` FOREIGN KEY (`Yatan_Hasta_ID`) REFERENCES `yatan_hasta` (`Hasta_ID`),
  CONSTRAINT `bolum_chk_1` CHECK ((`Yatak_Sayisi` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bolum`
--

LOCK TABLES `bolum` WRITE;
/*!40000 ALTER TABLE `bolum` DISABLE KEYS */;
INSERT INTO `bolum` VALUES (1,'Kardiyoloji',30,1),(2,'Nöroloji',20,2),(3,'Ortopedi',25,3),(4,'Göz Hastalıkları',15,4),(5,'Genel Cerrahi',40,5),(6,'Plastik Cerrahi',10,6),(7,'Genel Cerrahi',40,7),(8,'Kardiyoloji',30,8);
/*!40000 ALTER TABLE `bolum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doktor`
--

DROP TABLE IF EXISTS `doktor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doktor` (
  `Personel_ID` int NOT NULL,
  `Uzmanlik_Alani` varchar(255) DEFAULT NULL,
  `Calisma_Saatleri` varchar(255) DEFAULT NULL,
  `bolum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `doktor_ibfk_1` FOREIGN KEY (`Personel_ID`) REFERENCES `personel` (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doktor`
--

LOCK TABLES `doktor` WRITE;
/*!40000 ALTER TABLE `doktor` DISABLE KEYS */;
INSERT INTO `doktor` VALUES (7,'Kardiyolog','09:00 - 16:00','Kardiyoloji'),(8,'Nörolog','09:00 - 16:00','Nöroloji'),(9,'Ortopedi Uzmanı','10:00 - 17:00','Ortopedi'),(10,'Genel Cerrah','09:00 - 16:00','Genel Cerrahi'),(11,'Plastik Cerrah','09:00 - 16:00','Plastik Cerrahi'),(12,'KBB Uzmanı','10:00 - 17:00','KBB'),(13,'Dermatolog','09:00 - 16:00','Dermatoloji');
/*!40000 ALTER TABLE `doktor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envanter`
--

DROP TABLE IF EXISTS `envanter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envanter` (
  `Malzeme_ID` int NOT NULL,
  `Malzeme_Adi` varchar(255) DEFAULT NULL,
  `Stok_Miktari` int DEFAULT NULL,
  `Siparis_Durumu` tinyint DEFAULT NULL,
  PRIMARY KEY (`Malzeme_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envanter`
--

LOCK TABLES `envanter` WRITE;
/*!40000 ALTER TABLE `envanter` DISABLE KEYS */;
INSERT INTO `envanter` VALUES (1,'Enjektör',19,1),(2,'Serum',100,0),(3,'Bandaj',70,0),(4,'Tansiyon Aleti',12,1),(5,'Anestezi Maskesi',60,0),(6,'Cerrahi Eldiven',150,0),(7,'Bandaj',8,1),(8,'Alçı',6,1),(9,'Ağrı Kesici',3,1),(10,'Aspiratör',19,1);
/*!40000 ALTER TABLE `envanter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fatura`
--

DROP TABLE IF EXISTS `fatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fatura` (
  `Fatura_ID` int NOT NULL,
  `Customer_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `Tutar` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Fatura_ID`),
  KEY `Personel_ID_idx` (`Employee_ID`),
  KEY `Customer_ID` (`Customer_ID`),
  CONSTRAINT `Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `idari_personel` (`Personel_ID`),
  CONSTRAINT `fatura_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `hasta` (`Hasta_ID`),
  CONSTRAINT `fatura_chk_1` CHECK ((`Tutar` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fatura`
--

LOCK TABLES `fatura` WRITE;
/*!40000 ALTER TABLE `fatura` DISABLE KEYS */;
INSERT INTO `fatura` VALUES (1,1,1,'2024-07-01',500.00),(2,2,2,'2024-07-05',300.00),(3,3,3,'2024-07-10',400.00),(4,4,4,'2024-07-15',200.00),(5,5,5,'2024-07-20',600.00),(6,6,6,'2024-07-25',700.00),(7,1,2,'2024-07-21',500.00),(8,2,3,'2024-07-26',800.00);
/*!40000 ALTER TABLE `fatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hasta`
--

DROP TABLE IF EXISTS `hasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hasta` (
  `Hasta_ID` int NOT NULL AUTO_INCREMENT,
  `TCNO` varchar(50) DEFAULT NULL,
  `Ad` varchar(100) DEFAULT NULL,
  `Soyad` varchar(100) DEFAULT NULL,
  `Sigorta_Bilgisi` tinyint DEFAULT NULL,
  PRIMARY KEY (`Hasta_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hasta`
--

LOCK TABLES `hasta` WRITE;
/*!40000 ALTER TABLE `hasta` DISABLE KEYS */;
INSERT INTO `hasta` VALUES (1,'12345678901','Ali','Veli',1),(2,'12345678902','Ayşe','Yılmaz',1),(3,'12345678903','Mehmet','Kaya',1),(4,'12345678904','Hüseyin','Yıldız',1),(5,'12345678905','Zeynep','Kaya',1),(6,'12345678906','Mustafa','Çetin',1),(7,'12345678907','Sevim','Aksu',1),(8,'12345678908','Ebru','Polat',1),(9,'12345678909','Nihat','Aslan',1),(10,'12345678910','Gül','Çiçek',0),(11,'12345678911','Serkan','Er',0),(12,'12345678912','İrem','Sarı',0),(13,'12345678913','Derya','Turhan',0),(14,'12345678914','Ozan','Duman',0),(15,'12345678915','Ceren','Yazıcı',0),(16,'12345678916','Barış','Güven',0),(17,'12345678917','Gizem','Çelik',0),(18,'12345678918','Yusuf','Uğur',0),(21,'1234','Başak','Güney',1),(30,'12345678921','Başak','Güney',1);
/*!40000 ALTER TABLE `hasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hizmet_personeli`
--

DROP TABLE IF EXISTS `hizmet_personeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hizmet_personeli` (
  `Personel_ID` int NOT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `Hizmet_Personel_ID` FOREIGN KEY (`Personel_ID`) REFERENCES `personel` (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hizmet_personeli`
--

LOCK TABLES `hizmet_personeli` WRITE;
/*!40000 ALTER TABLE `hizmet_personeli` DISABLE KEYS */;
INSERT INTO `hizmet_personeli` VALUES (14),(15);
/*!40000 ALTER TABLE `hizmet_personeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idari_personel`
--

DROP TABLE IF EXISTS `idari_personel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idari_personel` (
  `Personel_ID` int NOT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `Personel_ID` FOREIGN KEY (`Personel_ID`) REFERENCES `personel` (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idari_personel`
--

LOCK TABLES `idari_personel` WRITE;
/*!40000 ALTER TABLE `idari_personel` DISABLE KEYS */;
INSERT INTO `idari_personel` VALUES (1),(2),(3),(4),(5),(6);
/*!40000 ALTER TABLE `idari_personel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personel`
--

DROP TABLE IF EXISTS `personel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personel` (
  `Personel_ID` int NOT NULL,
  `Ad` varchar(100) DEFAULT NULL,
  `Soyad` varchar(100) DEFAULT NULL,
  `Iletisim` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personel`
--

LOCK TABLES `personel` WRITE;
/*!40000 ALTER TABLE `personel` DISABLE KEYS */;
INSERT INTO `personel` VALUES (1,'Ahmet','Demir','ahmet@gmail.com'),(2,'Fatma','Çelik','fatma@gmail.com'),(3,'Elif','Kara','elif@gmail.com'),(4,'Kemal','Toprak','kemal@gmail.com'),(5,'Leyla','Akın','leyla@gmail.com'),(6,'Burak','Deniz','burak@gmail.com'),(7,'Merve','Bora','merve@gmail.com'),(8,'Cem','Çakır','cem@gmail.com'),(9,'Ezgi','Bay','ezgi@gmail.com'),(10,'Selin','Aras','selin@gmail.com'),(11,'Ufuk','Yücel','ufuk@gmail.com'),(12,'Gökhan','Bulut','gokhan@gmail.com'),(13,'Emine','Şahin','emine@gmail.com'),(14,'Halil','Durmaz','halil@gmail.com'),(15,'Pelin','Korkmaz','pelin@gmail.com');
/*!40000 ALTER TABLE `personel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `randevu`
--

DROP TABLE IF EXISTS `randevu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `randevu` (
  `DoktorID` int NOT NULL,
  `Hasta_ID` int NOT NULL,
  `Tarih` date DEFAULT NULL,
  `Saat` varchar(45) DEFAULT NULL,
  `Gecerli_mi` tinyint DEFAULT NULL,
  PRIMARY KEY (`DoktorID`,`Hasta_ID`),
  KEY `Doktor_ID_idx` (`DoktorID`),
  CONSTRAINT `Doktor_ID_fk` FOREIGN KEY (`DoktorID`) REFERENCES `doktor` (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `randevu`
--

LOCK TABLES `randevu` WRITE;
/*!40000 ALTER TABLE `randevu` DISABLE KEYS */;
INSERT INTO `randevu` VALUES (7,30,'2024-07-24','09:00',1),(8,10,'2024-07-22','12:00',1),(8,17,'2024-07-23','14:00',1),(9,10,'2024-07-22','10:00',1),(9,11,'2024-07-22','13:00',1),(9,18,'2024-07-23','15:00',1),(10,12,'2024-07-22','16:00',1),(11,13,'2024-07-22','13:00',1),(12,14,'2024-07-23','11:00',1),(13,15,'2024-07-23','12:00',1);
/*!40000 ALTER TABLE `randevu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `randevu_saatleri`
--

DROP TABLE IF EXISTS `randevu_saatleri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `randevu_saatleri` (
  `Doktor_ID` int NOT NULL,
  `Saat` varchar(45) NOT NULL,
  PRIMARY KEY (`Saat`,`Doktor_ID`),
  KEY `Doktor_ID` (`Doktor_ID`),
  CONSTRAINT `randevu_saatleri_ibfk_1` FOREIGN KEY (`Doktor_ID`) REFERENCES `doktor` (`Personel_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `randevu_saatleri`
--

LOCK TABLES `randevu_saatleri` WRITE;
/*!40000 ALTER TABLE `randevu_saatleri` DISABLE KEYS */;
INSERT INTO `randevu_saatleri` VALUES (7,'10:00'),(7,'11:00'),(7,'12:00'),(7,'13:00'),(7,'14:00'),(7,'15:00'),(7,'16:00'),(8,'09:00'),(8,'10:00'),(8,'11.00'),(8,'13:00'),(8,'15:00'),(8,'16:00'),(9,'11:00'),(9,'12:00'),(9,'14:00'),(9,'16:00'),(9,'17:00'),(10,'09:00'),(10,'10:00'),(10,'11:00'),(10,'12:00'),(10,'13:00'),(10,'14:00'),(10,'15:00'),(11,'09:00'),(11,'10:00'),(11,'11:00'),(11,'12:00'),(11,'14:00'),(11,'15:00'),(11,'16:00'),(12,'10:00'),(12,'12:00'),(12,'13:00'),(12,'14:00'),(12,'15:00'),(12,'16:00'),(12,'17:00'),(13,'09:00'),(13,'10:00'),(13,'11:00'),(13,'13:00'),(13,'14:00'),(13,'15:00'),(13,'16:00');
/*!40000 ALTER TABLE `randevu_saatleri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `randevulu_hasta`
--

DROP TABLE IF EXISTS `randevulu_hasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `randevulu_hasta` (
  `Hasta_ID` int NOT NULL,
  `Kayit_ID` int NOT NULL,
  PRIMARY KEY (`Hasta_ID`,`Kayit_ID`),
  KEY `Kayit_ID_idx` (`Kayit_ID`),
  CONSTRAINT `randevulu_hasta_ibfk_1` FOREIGN KEY (`Hasta_ID`) REFERENCES `hasta` (`Hasta_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `randevulu_hasta`
--

LOCK TABLES `randevulu_hasta` WRITE;
/*!40000 ALTER TABLE `randevulu_hasta` DISABLE KEYS */;
INSERT INTO `randevulu_hasta` VALUES (9,1),(10,2),(11,3),(12,4),(13,5),(14,6),(15,7),(16,8),(17,9),(18,10);
/*!40000 ALTER TABLE `randevulu_hasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siparis`
--

DROP TABLE IF EXISTS `siparis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siparis` (
  `Malzeme_ID` int NOT NULL,
  `Tarih` date DEFAULT NULL,
  `Siparis_Miktari` int DEFAULT NULL,
  PRIMARY KEY (`Malzeme_ID`),
  KEY `Malzeme_ID_idx` (`Malzeme_ID`),
  CONSTRAINT `Malzeme1_ID` FOREIGN KEY (`Malzeme_ID`) REFERENCES `envanter` (`Malzeme_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siparis`
--

LOCK TABLES `siparis` WRITE;
/*!40000 ALTER TABLE `siparis` DISABLE KEYS */;
INSERT INTO `siparis` VALUES (1,'2024-07-10',20),(2,'2024-07-11',30),(3,'2024-07-12',30),(4,'2024-07-13',40),(5,'2024-07-14',55),(7,'2024-07-24',120),(8,'2024-07-24',NULL),(9,'2024-07-24',NULL),(10,'2024-07-24',5);
/*!40000 ALTER TABLE `siparis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sorumludur`
--

DROP TABLE IF EXISTS `sorumludur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sorumludur` (
  `Sorumlu_ID` int NOT NULL,
  `Yatan_Hasta_ID` int NOT NULL,
  PRIMARY KEY (`Sorumlu_ID`,`Yatan_Hasta_ID`),
  KEY `Yatan_Hasta_ID_idx` (`Yatan_Hasta_ID`),
  CONSTRAINT `Sorumlu_ID` FOREIGN KEY (`Sorumlu_ID`) REFERENCES `hizmet_personeli` (`Personel_ID`),
  CONSTRAINT `Yatan_ID` FOREIGN KEY (`Yatan_Hasta_ID`) REFERENCES `yatan_hasta` (`Hasta_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sorumludur`
--

LOCK TABLES `sorumludur` WRITE;
/*!40000 ALTER TABLE `sorumludur` DISABLE KEYS */;
INSERT INTO `sorumludur` VALUES (14,1),(14,2),(14,3),(14,4),(15,5),(15,6),(15,7),(15,8);
/*!40000 ALTER TABLE `sorumludur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yatan_hasta`
--

DROP TABLE IF EXISTS `yatan_hasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yatan_hasta` (
  `Hasta_ID` int NOT NULL,
  PRIMARY KEY (`Hasta_ID`),
  CONSTRAINT `yatan_hasta_ibfk_1` FOREIGN KEY (`Hasta_ID`) REFERENCES `hasta` (`Hasta_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yatan_hasta`
--

LOCK TABLES `yatan_hasta` WRITE;
/*!40000 ALTER TABLE `yatan_hasta` DISABLE KEYS */;
INSERT INTO `yatan_hasta` VALUES (1),(2),(3),(4),(5),(6),(7),(8);
/*!40000 ALTER TABLE `yatan_hasta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-24 22:17:51
