CREATE DATABASE `372_Proje` ;

USE `372_Proje`;

CREATE TABLE `Hasta` (
  `Hasta_ID` int NOT NULL,
  `TCNO` varchar(50) DEFAULT NULL,
  `Ad` varchar(100) DEFAULT NULL,
  `Soyad` varchar(100) DEFAULT NULL,
  `Sigorta_Bilgisi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Hasta_ID`)
) ;

CREATE TABLE `Personel` (
  `Personel_ID` int NOT NULL,
  `Ad` varchar(100) DEFAULT NULL,
  `Soyad` varchar(100) DEFAULT NULL,
  `Iletisim` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Personel_ID`)
) ;

CREATE TABLE `Idari_Personel` (
  `Personel_ID` int NOT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `Personel_ID` FOREIGN KEY (`Personel_ID`) REFERENCES `Personel` (`Personel_ID`)
) ;

CREATE TABLE `Yatan_Hasta` (
  `Hasta_ID` int NOT NULL,
  PRIMARY KEY (`Hasta_ID`),
  CONSTRAINT `yatan_hasta_ibfk_1` FOREIGN KEY (`Hasta_ID`) REFERENCES `Hasta` (`Hasta_ID`)
) ;

CREATE TABLE `Bolum` (
  `Bolum_ID` int NOT NULL,
  `Bolum_Adi` varchar(255) NOT NULL,
  `Yatak_Sayisi` int DEFAULT NULL,
  `Yatan_Hasta_ID` int DEFAULT NULL,
  
  CHECK (Yatak_Sayisi >= 0),
  
  PRIMARY KEY (`Bolum_ID`),
  KEY `Yatan_Hasta_ID_idx` (`Yatan_Hasta_ID`),
  CONSTRAINT `Yatan_Hasta_ID` FOREIGN KEY (`Yatan_Hasta_ID`) REFERENCES `Yatan_Hasta` (`Hasta_ID`)
) ;

CREATE TABLE `Doktor` (
  `Personel_ID` int NOT NULL,
  `Uzmanlik_Alani` varchar(255) DEFAULT NULL,
  `Calisma_Saatleri` datetime DEFAULT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `doktor_ibfk_1` FOREIGN KEY (`Personel_ID`) REFERENCES `Personel` (`Personel_ID`)
) ;

CREATE TABLE `Envanter` (
  `Malzeme_ID` int NOT NULL,
  `Malzeme_Adi` varchar(255) DEFAULT NULL,
  `Stok_Miktari` int DEFAULT NULL,
  `Siparis_Durumu` tinyint DEFAULT NULL,
  
  CHECK (Stok_Miktari >= 20),
  
  PRIMARY KEY (`Malzeme_ID`)
) ;

CREATE TABLE `Hizmet_Personeli` (
  `Personel_ID` int NOT NULL,
  PRIMARY KEY (`Personel_ID`),
  CONSTRAINT `Hizmet_Personel_ID` FOREIGN KEY (`Personel_ID`) REFERENCES `Personel` (`Personel_ID`)
) ;

CREATE TABLE `Fatura` (
  `Fatura_ID` int NOT NULL,
  `Customer_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Tarih` date DEFAULT NULL,
  `Tutar` decimal(10,2) DEFAULT NULL,
  
  CHECK (Tutar >= 0),
  
  PRIMARY KEY (`Fatura_ID`),
  KEY `Customer_ID_idx` (`Customer_ID`),
  KEY `Personel_ID_idx` (`Employee_ID`),
  CONSTRAINT `Customer_ID` FOREIGN KEY (`Customer_ID`) REFERENCES `Hasta` (`Hasta_ID`),
  CONSTRAINT `Employee_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `Idari_Personel` (`Personel_ID`)
) ;

CREATE TABLE `Randevulu_Hasta` (
  `Hasta_ID` int NOT NULL,
  `Kayit_ID` int NOT NULL,
  PRIMARY KEY (`Hasta_ID`, `Kayit_ID`),
  KEY `Kayit_ID_idx` (`Kayit_ID`), -- Add index for Kayit_ID
  CONSTRAINT `randevulu_hasta_ibfk_1` FOREIGN KEY (`Hasta_ID`) REFERENCES `Hasta` (`Hasta_ID`)
) ;

CREATE TABLE `Siparis` (
  `Employee_ID` int NOT NULL,
  `Malzeme_ID` int NOT NULL,
  `Tarih` date DEFAULT NULL,
  `Siparis Durumu` tinyint DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`, `Malzeme_ID`),
  KEY `Malzeme_ID_idx` (`Malzeme_ID`),
  CONSTRAINT `Employee1_ID` FOREIGN KEY (`Employee_ID`) REFERENCES `Idari_Personel` (`Personel_ID`),
  CONSTRAINT `Malzeme1_ID` FOREIGN KEY (`Malzeme_ID`) REFERENCES `Envanter` (`Malzeme_ID`)
) ;

CREATE TABLE `Sorumludur` (
  `Sorumlu_ID` int NOT NULL,
  `Yatan_Hasta_ID` int NOT NULL,
  PRIMARY KEY (`Sorumlu_ID`, `Yatan_Hasta_ID`),
  KEY `Yatan_Hasta_ID_idx` (`Yatan_Hasta_ID`),
  CONSTRAINT `Sorumlu_ID` FOREIGN KEY (`Sorumlu_ID`) REFERENCES `Hizmet_Personeli` (`Personel_ID`),
  CONSTRAINT `Yatan_ID` FOREIGN KEY (`Yatan_Hasta_ID`) REFERENCES `Yatan_Hasta` (`Hasta_ID`)
) ;

-- Adding the Randevu table
CREATE TABLE `Randevu` (
  `DoktorID` INT NOT NULL,
  `Hasta_ID` INT NOT NULL,
  `Kayit_No` INT NULL,
  `Tarih` DATETIME NULL,
  `Saat` VARCHAR(45) NULL,
  `Gecerli_mi` TINYINT NULL,
  PRIMARY KEY (`DoktorID`, `Hasta_ID`),
  KEY `Hasta_ID_idx` (`Hasta_ID`),
  KEY `Doktor_ID_idx` (`DoktorID`),
  CONSTRAINT `Hasta_ID_fk` FOREIGN KEY (`Hasta_ID`) REFERENCES `Randevulu_Hasta` (`Hasta_ID`),
  CONSTRAINT `Doktor_ID_fk` FOREIGN KEY (`DoktorID`) REFERENCES `Doktor` (`Personel_ID`),
  CONSTRAINT `Kayit_No_fk` FOREIGN KEY (`Kayit_No`) REFERENCES `Randevulu_Hasta` (`Kayit_ID`)
) ;