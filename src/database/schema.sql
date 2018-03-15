-- User
DROP USER IF EXISTS 'easyfsr'@'localhost';
CREATE USER 'easyfsr'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS easyfsr;
CREATE DATABASE easyfsr;

USE easyfsr;

-- Tables

CREATE TABLE user(
  employeeID VARCHAR (30) NOT NULL,
  password VARCHAR (60) NOT NULL,
  firstName VARCHAR (50) NOT NULL,
  middleName VARCHAR (50),
  lastName VARCHAR (50) NOT NULL,
  committee VARCHAR (30),
  isHead BOOLEAN,      
  officeNumber VARCHAR (30) NOT NULL, 
  contractType VARCHAR (40) NOT NULL, -- FULL-TIME / PART-TIME
  emailAddress VARCHAR (40) NOT NULL,
  rank VARCHAR (30),
  isArchived BOOLEAN DEFAULT 0, 
  acctType VARCHAR(10) DEFAULT 'USER', -- ADMIN / USER
  CONSTRAINT `user_pk`
    PRIMARY KEY (`employeeID`)
);

CREATE TABLE IF NOT EXISTS fsr(
  `id` INT NOT NULL AUTO_INCREMENT,
  `employeeID` VARCHAR (30) NOT NULL,
  `acadYear` VARCHAR (20) NOT NULL,
  `semester` VARCHAR (10) NOT NULL,
  `isChecked` boolean DEFAULT 0,
  -- place all entitiesID here
  CONSTRAINT `fsr_pk` 
    PRIMARY KEY (`id`),
  CONSTRAINT `user_fsr_fk`
  FOREIGN KEY (`employeeID`)
    REFERENCES user(`employeeID`)
);

-- Entities under FSR 

  -- teaching_load, subject, timeslot

CREATE TABLE IF NOT EXISTS `teachingLoad`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `teachingLoadCreds` int(2) NOT NULL,
  CONSTRAINT `teachingLoad_user_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

CREATE TABLE IF NOT EXISTS `subject`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `subjectCode` VARCHAR (30) NOT NULL,
  `teachingLoadCreds` int(2) NOT NULL,
  `noOfStudents` int(3) NOT NULL,
  `hoursPerWeek` int(2) NOT NULL,
  `sectionCode` varchar(10) NOT NULL,
  `room` varchar(10) NOT NULL,
  CONSTRAINT `subject_pk` 
    PRIMARY KEY (`subjectCode`), 
  CONSTRAINT `subject_teachingLoad_fk`
    FOREIGN KEY (`id`)
    REFERENCES teachingLoad(`id`)
);

CREATE TABLE IF NOT EXISTS `timeslot`(
  `subjectCode` VARCHAR (30) NOT NULL,
  `day` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  CONSTRAINT `timeslot_subject_fk`
    FOREIGN KEY (`subjectCode`)
    REFERENCES subject(`subjectCode`)
);

  -- study load, course, courseSched

CREATE TABLE `studyLoad`(
  `degree` VARCHAR (50) NOT NULL,
  `courseNumber` VARCHAR (20) NOT NULL,
  `university` VARCHAR (50) NOT NULL,
  `totalSLcredits` INT (10) NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  CONSTRAINT `studyLoad_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

CREATE TABLE `course`(
  `courseID` VARCHAR (30) NOT NULL,
  `hoursPerWeek` VARCHAR (10) NOT NULL,
  `school` VARCHAR (30) NOT NULL,
  `credit` VARCHAR (30) NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  CONSTRAINT `<entity>_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `course_fk` 
    PRIMARY KEY(`courseID`)
);

CREATE TABLE `courseSched`(
  `courseID` VARCHAR (30) NOT NULL,
  `day` VARCHAR (30) NOT NULL,
  `time` VARCHAR (30) NOT NULL,
CONSTRAINT`courseSched_course_fk`
  FOREIGN KEY (`courseID`)
  REFERENCES course(`courseID`)
);

-- Consultation hours and CH Timeslot

CREATE TABLE `consultationHours`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `place` varchar (50) NOT NULL,
  CONSTRAINT `consultationHours_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)    
);

CREATE TABLE `chTimeslot`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `day` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  CONSTRAINT `chTimeslot_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

-- Professorial Chair or Faculty Grant or Nominee (Award)

CREATE TABLE IF NOT EXISTS `award`(
  `id` INT NOT NULL AUTO_INCREMENT,
  grantF VARCHAR (50) NOT NULL,
  chairGrantTitle VARCHAR (50) NOT NULL,
  collegeHasNominated VARCHAR (50) NOT NULL,
  recipientOrNominee VARCHAR (50) NOT NULL,
  professionalChair VARCHAR (50) NOT NULL,
  approvedStartDate VARCHAR (50) NOT NULL,
  endDate VARCHAR (50) NOT NULL,
  CONSTRAINT `award_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

-- Limited Practice of Profession

CREATE TABLE IF NOT EXISTS `limitedPracticeOfProf`(
  `id` INT NOT NULL AUTO_INCREMENT,
  askedPermission VARCHAR (10) NOT NULL,  -- YES / NO
  Date VARCHAR (50),
  CONSTRAINT `limitedPracticeOfProf_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

CREATE TABLE IF NOT EXISTS `extensionAndCommunityService`(
  `id` INT NOT NULL AUTO_INCREMENT, 
  participant VARCHAR (50) NOT NULL,
  role VARCHAR (50) NOT NULL,
  hours INT (50) NOT NULL,
  title VARCHAR (50) NOT NULL,
  creditUnit INT (50) NOT NULL,
  type VARCHAR (50) NOT NULL,
  startDate VARCHAR (50) NOT NULL,
  endDate VARCHAR (50) NOT NULL,
  CONSTRAINT `extensionAndCommunityService_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

-- Administrative Work

CREATE TABLE `adminWork`(
  `position` VARCHAR(50) NOT NULL,
  `officeUnit` VARCHAR(50) NOT NULL,
  `approvedUnits` INT(2) NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  CONSTRAINT `adminWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

-- Creative Work, Creative Work Co-Authors

CREATE TABLE `creativeWork`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `creativeWorkCode` VARCHAR(30) NOT NULL,
  `date` DATE NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `credUnit` INT (10) NOT NULL,
  CONSTRAINT `creativeWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `creativeWork_pk`
    PRIMARY KEY (`creativeWorkCode`)
);

CREATE TABLE `cworkCoAuthor`(
  `creativeWorkCode` VARCHAR(30) NOT NULL,
  `employeeID` VARCHAR(30) NOT NULL,
  CONSTRAINT `cworkCoAuthor_creativeWork_fk`
    FOREIGN KEY (`creativeWorkCode`)
    REFERENCES creativeWork(`creativeWorkCode`),
  CONSTRAINT `cworkCoAuthor_user_fk`
    FOREIGN KEY (`employeeID`)
    REFERENCES user(`employeeID`)

);


-- research

CREATE TABLE `research`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `researchCode` VARCHAR(30) NOT NULL,
  `type` VARCHAR (30) NOT NULL, -- PROPOSAL / IMPLEMENTATION
  `role` VARCHAR (30) NOT NULL,
  `title` VARCHAR (50) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE,
  `funding` VARCHAR (30) NOT NULL,
  `approvedUnits` VARCHAR (30) NOT NULL,
  CONSTRAINT `research_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `research_pk`
    PRIMARY KEY (`researchCode`)
);




CREATE TABLE rCoAuthor(
  researchCode VARCHAR(30) NOT NULL,
  employeeID VARCHAR (30) NOT NULL,
  CONSTRAINT `rCoAuthor_research_fk`
    FOREIGN KEY (`researchCode`)
    REFERENCES research(`researchCode`),
  CONSTRAINT `rCoAuthor_user_fk`
    FOREIGN KEY (`employeeID`)
    REFERENCES user(`employeeID`)
);


-- Privileges
GRANT SUPER ON *.* TO 'easyfsr'@'localhost';
GRANT ALL PRIVILEGES ON easyfsr.* TO 'easyfsr'@'localhost';