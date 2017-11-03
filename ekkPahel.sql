-- MySQL dump 10.13  Distrib 5.7.19-ndb-7.5.7, for Linux (x86_64)
--
-- Host: localhost    Database: ekkPahel
-- ------------------------------------------------------
-- Server version	5.7.19-ndb-7.5.7

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
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Department` (
  `dno` int(11) NOT NULL AUTO_INCREMENT,
  `dname` varchar(20) DEFAULT NULL,
  `mgrssn` int(11) DEFAULT NULL,
  PRIMARY KEY (`dno`),
  KEY `mgrssn` (`mgrssn`),
  CONSTRAINT `Department_ibfk_1` FOREIGN KEY (`mgrssn`) REFERENCES `Members` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Finance',1),(2,'Management',NULL),(3,'Donations',NULL);
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donations`
--

DROP TABLE IF EXISTS `Donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Donations` (
  `donor_name` varchar(20) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  `receipt_no` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`receipt_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donations`
--

LOCK TABLES `Donations` WRITE;
/*!40000 ALTER TABLE `Donations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event_Members`
--

DROP TABLE IF EXISTS `Event_Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Event_Members` (
  `eid` int(11) NOT NULL,
  `memssn` int(11) NOT NULL,
  PRIMARY KEY (`eid`,`memssn`),
  KEY `memssn` (`memssn`),
  CONSTRAINT `Event_Members_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Events` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Event_Members_ibfk_3` FOREIGN KEY (`memssn`) REFERENCES `Members` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_Members`
--

LOCK TABLES `Event_Members` WRITE;
/*!40000 ALTER TABLE `Event_Members` DISABLE KEYS */;
/*!40000 ALTER TABLE `Event_Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `eid` int(11) NOT NULL,
  `location` varchar(20) DEFAULT NULL,
  `budget` decimal(10,0) DEFAULT NULL,
  `ename` varchar(20) DEFAULT NULL,
  `supssn` int(11) DEFAULT NULL,
  `reciept_no` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`eid`),
  KEY `reciept_no` (`reciept_no`),
  KEY `supssn` (`supssn`),
  CONSTRAINT `Events_ibfk_2` FOREIGN KEY (`reciept_no`) REFERENCES `Donations` (`receipt_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Events_ibfk_3` FOREIGN KEY (`supssn`) REFERENCES `Members` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Members` (
  `ssn` int(11) NOT NULL AUTO_INCREMENT,
  `mname` varchar(20) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `position` varchar(20) DEFAULT NULL,
  `dno` int(11) DEFAULT NULL,
  PRIMARY KEY (`ssn`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,'Divyaksh','2017-09-09',20,'9611519000','divyaksh.shukla','Executive',NULL),(4,'Atishey','2017-07-01',20,'9876765643','atishey@gmail.com','Executive',2);
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-02 21:02:57
