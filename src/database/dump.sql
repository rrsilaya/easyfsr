-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: easyfsr
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `adminWork`
--

DROP TABLE IF EXISTS `adminWork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adminWork` (
  `position` varchar(50) NOT NULL,
  `officeUnit` varchar(50) NOT NULL,
  `approvedUnits` int(2) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  KEY `adminWork_fsr_fk` (`id`),
  CONSTRAINT `adminWork_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminWork`
--

LOCK TABLES `adminWork` WRITE;
/*!40000 ALTER TABLE `adminWork` DISABLE KEYS */;
/*!40000 ALTER TABLE `adminWork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grantF` varchar(50) NOT NULL,
  `chairGrantTitle` varchar(50) NOT NULL,
  `collegeHasNominated` varchar(50) NOT NULL,
  `recipientOrNominee` varchar(50) NOT NULL,
  `professionalChair` varchar(50) NOT NULL,
  `approvedStartDate` varchar(50) NOT NULL,
  `endDate` varchar(50) NOT NULL,
  KEY `award_fsr_fk` (`id`),
  CONSTRAINT `award_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chTimeslot`
--

DROP TABLE IF EXISTS `chTimeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chTimeslot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  KEY `chTimeslot_fsr_fk` (`id`),
  CONSTRAINT `chTimeslot_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chTimeslot`
--

LOCK TABLES `chTimeslot` WRITE;
/*!40000 ALTER TABLE `chTimeslot` DISABLE KEYS */;
/*!40000 ALTER TABLE `chTimeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultationHours`
--

DROP TABLE IF EXISTS `consultationHours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultationHours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place` varchar(50) NOT NULL,
  KEY `consultationHours_fsr_fk` (`id`),
  CONSTRAINT `consultationHours_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultationHours`
--

LOCK TABLES `consultationHours` WRITE;
/*!40000 ALTER TABLE `consultationHours` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultationHours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseID` varchar(30) NOT NULL,
  `hoursPerWeek` varchar(10) NOT NULL,
  `school` varchar(30) NOT NULL,
  `credit` varchar(30) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`courseID`),
  KEY `<entity>_fsr_fk` (`id`),
  CONSTRAINT `<entity>_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseSched`
--

DROP TABLE IF EXISTS `courseSched`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courseSched` (
  `courseID` varchar(30) NOT NULL,
  `day` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  KEY `courseSched_course_fk` (`courseID`),
  CONSTRAINT `courseSched_course_fk` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseSched`
--

LOCK TABLES `courseSched` WRITE;
/*!40000 ALTER TABLE `courseSched` DISABLE KEYS */;
/*!40000 ALTER TABLE `courseSched` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creativeWork`
--

DROP TABLE IF EXISTS `creativeWork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creativeWork` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creativeWorkCode` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `title` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `credUnit` int(10) NOT NULL,
  PRIMARY KEY (`creativeWorkCode`),
  KEY `creativeWork_fsr_fk` (`id`),
  CONSTRAINT `creativeWork_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creativeWork`
--

LOCK TABLES `creativeWork` WRITE;
/*!40000 ALTER TABLE `creativeWork` DISABLE KEYS */;
/*!40000 ALTER TABLE `creativeWork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cworkCoAuthor`
--

DROP TABLE IF EXISTS `cworkCoAuthor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cworkCoAuthor` (
  `creativeWorkCode` varchar(30) NOT NULL,
  `employeeID` varchar(30) NOT NULL,
  KEY `cworkCoAuthor_creativeWork_fk` (`creativeWorkCode`),
  KEY `cworkCoAuthor_user_fk` (`employeeID`),
  CONSTRAINT `cworkCoAuthor_creativeWork_fk` FOREIGN KEY (`creativeWorkCode`) REFERENCES `creativeWork` (`creativeWorkCode`),
  CONSTRAINT `cworkCoAuthor_user_fk` FOREIGN KEY (`employeeID`) REFERENCES `user` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cworkCoAuthor`
--

LOCK TABLES `cworkCoAuthor` WRITE;
/*!40000 ALTER TABLE `cworkCoAuthor` DISABLE KEYS */;
/*!40000 ALTER TABLE `cworkCoAuthor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extensionAndCommunityService`
--

DROP TABLE IF EXISTS `extensionAndCommunityService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `extensionAndCommunityService` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participant` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `hours` int(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `creditUnit` int(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `startDate` varchar(50) NOT NULL,
  `endDate` varchar(50) NOT NULL,
  KEY `extensionAndCommunityService_fsr_fk` (`id`),
  CONSTRAINT `extensionAndCommunityService_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extensionAndCommunityService`
--

LOCK TABLES `extensionAndCommunityService` WRITE;
/*!40000 ALTER TABLE `extensionAndCommunityService` DISABLE KEYS */;
/*!40000 ALTER TABLE `extensionAndCommunityService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fsr`
--

DROP TABLE IF EXISTS `fsr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fsr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeID` varchar(30) NOT NULL,
  `acadYear` varchar(20) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `isChecked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_fsr_fk` (`employeeID`),
  CONSTRAINT `user_fsr_fk` FOREIGN KEY (`employeeID`) REFERENCES `user` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fsr`
--

LOCK TABLES `fsr` WRITE;
/*!40000 ALTER TABLE `fsr` DISABLE KEYS */;
/*!40000 ALTER TABLE `fsr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `limitedPracticeOfProf`
--

DROP TABLE IF EXISTS `limitedPracticeOfProf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `limitedPracticeOfProf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `askedPermission` varchar(10) NOT NULL,
  `Date` varchar(50) DEFAULT NULL,
  KEY `limitedPracticeOfProf_fsr_fk` (`id`),
  CONSTRAINT `limitedPracticeOfProf_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `limitedPracticeOfProf`
--

LOCK TABLES `limitedPracticeOfProf` WRITE;
/*!40000 ALTER TABLE `limitedPracticeOfProf` DISABLE KEYS */;
/*!40000 ALTER TABLE `limitedPracticeOfProf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rCoAuthor`
--

DROP TABLE IF EXISTS `rCoAuthor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rCoAuthor` (
  `researchCode` varchar(30) NOT NULL,
  `employeeID` varchar(30) NOT NULL,
  KEY `rCoAuthor_research_fk` (`researchCode`),
  KEY `rCoAuthor_user_fk` (`employeeID`),
  CONSTRAINT `rCoAuthor_research_fk` FOREIGN KEY (`researchCode`) REFERENCES `research` (`researchCode`),
  CONSTRAINT `rCoAuthor_user_fk` FOREIGN KEY (`employeeID`) REFERENCES `user` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rCoAuthor`
--

LOCK TABLES `rCoAuthor` WRITE;
/*!40000 ALTER TABLE `rCoAuthor` DISABLE KEYS */;
/*!40000 ALTER TABLE `rCoAuthor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research`
--

DROP TABLE IF EXISTS `research`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `research` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `researchCode` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `title` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `funding` varchar(30) NOT NULL,
  `approvedUnits` varchar(30) NOT NULL,
  PRIMARY KEY (`researchCode`),
  KEY `research_fsr_fk` (`id`),
  CONSTRAINT `research_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research`
--

LOCK TABLES `research` WRITE;
/*!40000 ALTER TABLE `research` DISABLE KEYS */;
/*!40000 ALTER TABLE `research` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('UVmcdk-nd5JymEZZUMoKnAMWvaiSS1S8',1521179138,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studyLoad`
--

DROP TABLE IF EXISTS `studyLoad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studyLoad` (
  `degree` varchar(50) NOT NULL,
  `courseNumber` varchar(20) NOT NULL,
  `university` varchar(50) NOT NULL,
  `totalSLcredits` int(10) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  KEY `studyLoad_fsr_fk` (`id`),
  CONSTRAINT `studyLoad_fsr_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyLoad`
--

LOCK TABLES `studyLoad` WRITE;
/*!40000 ALTER TABLE `studyLoad` DISABLE KEYS */;
/*!40000 ALTER TABLE `studyLoad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectCode` varchar(30) NOT NULL,
  `teachingLoadCreds` int(2) NOT NULL,
  `noOfStudents` int(3) NOT NULL,
  `hoursPerWeek` int(2) NOT NULL,
  `sectionCode` varchar(10) NOT NULL,
  `room` varchar(10) NOT NULL,
  PRIMARY KEY (`subjectCode`),
  KEY `subject_teachingLoad_fk` (`id`),
  CONSTRAINT `subject_teachingLoad_fk` FOREIGN KEY (`id`) REFERENCES `teachingLoad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachingLoad`
--

DROP TABLE IF EXISTS `teachingLoad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachingLoad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teachingLoadCreds` int(2) NOT NULL,
  KEY `teachingLoad_user_fk` (`id`),
  CONSTRAINT `teachingLoad_user_fk` FOREIGN KEY (`id`) REFERENCES `fsr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachingLoad`
--

LOCK TABLES `teachingLoad` WRITE;
/*!40000 ALTER TABLE `teachingLoad` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachingLoad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timeslot` (
  `subjectCode` varchar(30) NOT NULL,
  `day` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  KEY `timeslot_subject_fk` (`subjectCode`),
  CONSTRAINT `timeslot_subject_fk` FOREIGN KEY (`subjectCode`) REFERENCES `subject` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `employeeID` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `committee` varchar(30) DEFAULT NULL,
  `isHead` tinyint(1) DEFAULT NULL,
  `officeNumber` varchar(30) NOT NULL,
  `contractType` varchar(40) NOT NULL,
  `emailAddress` varchar(40) NOT NULL,
  `rank` varchar(30) DEFAULT NULL,
  `isArchived` tinyint(1) DEFAULT '0',
  `acctType` varchar(10) DEFAULT 'USER',
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('5121328320','$2a$10$JQL/6dENt1TQofx49huAmu1e/K/m8UPn4SGXixRU5NYDK/QzpudbW','Erlen Mae','S','Evangelista',NULL,NULL,'128','full-time','esevangelista1@up.edu.ph',NULL,0,'USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 13:48:53
