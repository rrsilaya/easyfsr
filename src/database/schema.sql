-- User
DROP USER IF EXISTS 'easyfsr'@'localhost';
CREATE USER 'easyfsr'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS easyfsr;
CREATE DATABASE easyfsr;

USE easyfsr;

-- Tables

CREATE TABLE meta (
  `id` INT NOT NULL AUTO_INCREMENT,
  `acadYear` VARCHAR (20) NOT NULL,
  `semester` VARCHAR (10) NOT NULL,
  `universityRegistrar` VARCHAR(50),
  `homeDepartment` VARCHAR(50),
  `formRevision` DATE,
  `homeCollege` VARCHAR(50),

  CONSTRAINT `meta_pk`
    PRIMARY KEY(`id`)
);

CREATE TABLE user(
  userID INT NOT NULL AUTO_INCREMENT, 
  employeeID VARCHAR (30) NOT NULL,
  password VARCHAR (60) NOT NULL,
  firstName VARCHAR (50) NOT NULL,
  middleName VARCHAR (50),
  lastName VARCHAR (50) NOT NULL,
  committee VARCHAR (30),
  isHead BOOLEAN DEFAULT 0,      
  officeNumber VARCHAR (30), 
  contractType VARCHAR (40) NOT NULL, -- FULL-TIME / PART-TIME
  emailAddress VARCHAR (40) NOT NULL,
  rank VARCHAR (30) NOT NULL,
  isArchived BOOLEAN DEFAULT 0, 
  acctType VARCHAR(10) DEFAULT 'USER', -- ADMIN / USER
  profileIcon VARCHAR (50) DEFAULT '/uploads/users/default.png',
  CONSTRAINT `user_pk`
    PRIMARY KEY (`userID`),
  CONSTRAINT `user_empid_uk`
    UNIQUE KEY (`employeeID`),
  CONSTRAINT `user_email_uk`
    UNIQUE KEY (`emailAddress`)
);

CREATE TABLE fsr(
  `id` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NOT NULL, 
  `acadYear` VARCHAR (20) NOT NULL,
  `semester` VARCHAR (10) NOT NULL,
  `isChecked` boolean DEFAULT 0,
  `isTurnedIn` boolean DEFAULT 0,
  `teachingLoadCreds` INT(2) DEFAULT 0,
  `totalCHours` INT(2) DEFAULT 0,
  `metaID` INT NOT NULL,
  CONSTRAINT `fsr_pk` 
    PRIMARY KEY (`id`),
  CONSTRAINT `user_fsr_fk`
  FOREIGN KEY (`userID`)
    REFERENCES user(`userID`),
  CONSTRAINT `meta_fsr_fk`
  FOREIGN KEY (`metaID`)
    REFERENCES meta(`id`)
);

-- Entities under FSR 

  -- (teaching_load) subject, timeslot

CREATE TABLE `subject`(
  `id` INT NOT NULL,
  `subjectCode` VARCHAR (30) NOT NULL,
  `subjectID` INT NOT NULL AUTO_INCREMENT,
  `teachingLoadCreds` INT(2) DEFAULT 0,
  `noOfStudents` INT(3) NOT NULL, 
  `hoursPerWeek` INT(2) NOT NULL DEFAULT 0,
  `sectionCode` VARCHAR(10) NOT NULL,
  `room` VARCHAR(10) NOT NULL,
  CONSTRAINT `subject_pk` 
    PRIMARY KEY (`subjectID`), 
  CONSTRAINT `subject_teachingLoad_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
  ON DELETE CASCADE
);

CREATE TABLE `timeslot`(
  `timeslotID` INT NOT NULL AUTO_INCREMENT,
  `subjectID` INT NOT NULL,
  `day` VARCHAR(10) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  CONSTRAINT `timeslot_subject_fk`
    FOREIGN KEY (`subjectID`)
    REFERENCES subject(`subjectID`)
  ON DELETE CASCADE,
  CONSTRAINT `timeslot_pk`
    PRIMARY KEY (timeslotID)
);

  -- study load, course, courseSched

CREATE TABLE `studyLoad`(
  `degree` VARCHAR (50) NOT NULL,
  `university` VARCHAR (50) NOT NULL,
  `totalSLcredits` INT (10) DEFAULT 0,
  `id` INT NOT NULL,
  `fullLeaveWithPay` BOOLEAN DEFAULT 0,
  `fellowshipRecipient` BOOLEAN DEFAULT 0,
  CONSTRAINT `studyLoad_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `studyLoad_pk`
    PRIMARY KEY(`id`)
);

CREATE TABLE `course`(
  `courseID` INT NOT NULL AUTO_INCREMENT,
  `hoursPerWeek` VARCHAR (10) NOT NULL DEFAULT 0,
  `school` VARCHAR (30) NOT NULL,
  `credit` INT (2) NOT NULL,
  `courseNumber` VARCHAR (20) NOT NULL,
  `id` INT NOT NULL,
  CONSTRAINT `course_studyLoad_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `course_pk`
    PRIMARY KEY (`courseID`)
);

CREATE TABLE `courseSched`(
  `courseSchedID` INT NOT NULL AUTO_INCREMENT,
  `courseID` INT NOT NULL,
  `day` VARCHAR (30) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  CONSTRAINT `courseSched_course_fk`
    FOREIGN KEY (`courseID`)
    REFERENCES course(`courseID`)
    ON DELETE CASCADE,
  CONSTRAINT `courseSched_pk`
    PRIMARY KEY (courseSchedID)
);

-- Consultation hours 

CREATE TABLE `consultationHours`(
  `chID` INT NOT NULL AUTO_INCREMENT,
  `day` varchar(10) NOT NULL,
  `place` VARCHAR (30) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `id` INT NOT NULL,
  CONSTRAINT `consultationHours_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `consultationHours_pk`
    PRIMARY KEY (`chID`)   
);

-- Professorial Chair or Faculty Grant or Nominee (Award)

CREATE TABLE `award`(
  `awardID` INT NOT NULL AUTO_INCREMENT, 
  `id` INT NOT NULL,
  `grantF` VARCHAR (50) NOT NULL,
  `chairGrantTitle` VARCHAR (50) NOT NULL,
  `collegeHasNominated` VARCHAR (50) NOT NULL,
  `recipientOrNominee` VARCHAR (50) NOT NULL,
  `professionalChair` VARCHAR (50) NOT NULL,
  `approvedStartDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE NOT NULL, --                             DATE format: YYYY-MM-DD
  `filepath` TEXT (50),
  CONSTRAINT `award_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `award_pk`
    PRIMARY KEY (`awardID`) 
);
-- Limited Practice of Profession

CREATE TABLE `limitedPracticeOfProf`(
  `limitedPracticeOfProfID` INT NOT NULL AUTO_INCREMENT, 
  `id` INT NOT NULL,
  `askedPermission` VARCHAR (10) NOT NULL,  -- YES / NO
  `date` DATE,  --                   DATE format: YYYY-MM-DD
  CONSTRAINT `limitedPracticeOfProf_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `limitedPracticeOfProf_pk`
    PRIMARY KEY (`limitedPracticeOfProfID`) 
);

CREATE TABLE `extensionAndCommunityService`(
  `id` INT NOT NULL, 
  `extAndCommServiceID` INT NOT NULL AUTO_INCREMENT,
  `participant` INT (3) NOT NULL,
  `role` VARCHAR (50) NOT NULL,
  `hours` INT (3) NOT NULL,
  `title` VARCHAR (50) NOT NULL,
  `creditUnit` INT (2) NOT NULL,
  `type` VARCHAR (50) NOT NULL,
  `startDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE NOT NULL, --                     DATE format: YYYY-MM-DD
  CONSTRAINT `extensionAndCommunityService_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `extAndCommService_pk` 
    PRIMARY KEY (`extAndCommServiceID`) 
);

-- Administrative Work

CREATE TABLE `adminWork`(
  `adminWorkID` INT NOT NULL AUTO_INCREMENT, 
  `position` VARCHAR(50) NOT NULL,
  `officeUnit` VARCHAR(50) NOT NULL,
  `approvedUnits` INT(2) NOT NULL,
  `id` INT NOT NULL,
  CONSTRAINT `adminWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `adminWork_pk` 
    PRIMARY KEY (`adminWorkID`) 
);

-- Creative Work, Creative Work Co-Authors

CREATE TABLE `creativeWork`(
  `id` INT NOT NULL,
  `creativeWorkID` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `credUnit` INT (10) NOT NULL,
  `filepath` TEXT (50),
  `coAuthor` VARCHAR (255), 
  CONSTRAINT `creativeWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `creativeWork_pk`
    PRIMARY KEY (`creativeWorkID`)
);

-- research

CREATE TABLE `research`(
  `id` INT NOT NULL,
  `researchID` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR (30) NOT NULL, -- PROPOSAL / IMPLEMENTATION
  `role` VARCHAR (30) NOT NULL,
  `title` VARCHAR (50) NOT NULL,
  `startDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE DEFAULT NULL, --                 DATE format: YYYY-MM-DD
  `funding` VARCHAR (30),
  `approvedUnits` VARCHAR (30) NOT NULL,
  `filepath` TEXT (50),
  `coAuthor` VARCHAR (255),
  CONSTRAINT `research_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `research_pk`
    PRIMARY KEY (`researchID`)
);

CREATE TABLE `notification`(
  `notificationID` INT NOT NULL AUTO_INCREMENT,
  `senderID` INT NOT NULL,
  `receiverID` INT NOT NULL,
  `message` varchar(1000) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `isResolved` BOOLEAN,
  `priority` VARCHAR (10) DEFAULT 'NORMAL', -- LOW / NORMAL / HIGH
  CONSTRAINT `notification_pk`
    PRIMARY KEY(`notificationID`),
  CONSTRAINT `notification_user_fk`
    FOREIGN KEY (`senderID`)
    REFERENCES user(`userID`),
  CONSTRAINT `notificationReceived_user_fk`
    FOREIGN KEY (`receiverID`)
    REFERENCES user(`userID`)
);

CREATE TABLE announcement(
   `announcementID` INT NOT NULL AUTO_INCREMENT,
   `userID` INT NOT NULL, -- userID of who sent the announcement 
   `title` VARCHAR (512) NOT NULL,
   `body` TEXT(10000) NOT NULL,
   `isResolved` BOOLEAN DEFAULT 0,
   CONSTRAINT `announcement_pk`
     PRIMARY KEY(`announcementID`),
   CONSTRAINT `announcement_user_fk`
    FOREIGN KEY (`userID`)
    REFERENCES user(`userID`)
);

CREATE TABLE log (
  `id` VARCHAR(17) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `action` VARCHAR(40) NOT NULL, -- INSERT_ENTITY | UPDATE_ENTITY | DELETE_ENTITY 
  `changes` TEXT (64), -- may contain other details that are necessary / could be used for UPDATE 
  `affectedID` INT NOT NULL, -- specifies ID affected
  `userID` INT NOT NULL,
  CONSTRAINT `log_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `log_user_fk`
    FOREIGN KEY(`userID`)
    REFERENCES user(`userID`)
    ON DELETE CASCADE
);

-- Trigger for Teaching Load of FSR

CREATE TRIGGER insert_teachingLoadCreds 
AFTER INSERT ON subject
FOR EACH ROW 
  UPDATE fsr 
    SET teachingLoadCreds = teachingLoadCreds + NEW.teachingLoadCreds
    WHERE id = NEW.id AND NEW.subjectID = NEW.subjectID;

CREATE TRIGGER delete_teachingLoadCreds 
BEFORE DELETE ON subject
FOR EACH ROW 
UPDATE fsr 
  SET teachingLoadCreds = teachingLoadCreds - OLD.teachingLoadCreds;

CREATE TRIGGER update_teachingLoadCreds 
AFTER update ON subject
FOR EACH ROW 
UPDATE fsr 
  SET teachingLoadCreds = teachingLoadCreds - OLD.teachingLoadCreds + NEW.teachingLoadCreds
  WHERE id = NEW.id;

-- Trigger for Study Load of FSR 

CREATE TRIGGER insert_totalSLcredits 
AFTER INSERT ON course
FOR EACH ROW 
  UPDATE studyLoad 
    SET totalSLcredits = totalSLcredits + NEW.credit
    WHERE id = NEW.id AND NEW.courseID = NEW.courseID;

CREATE TRIGGER delete_totalSLcredits 
BEFORE DELETE ON course
FOR EACH ROW 
UPDATE studyLoad 
  SET totalSLcredits = totalSLcredits - OLD.credit;

CREATE TRIGGER update_totalSLcredits 
AFTER update ON course
FOR EACH ROW 
UPDATE studyLoad 
  SET totalSLcredits = totalSLcredits - OLD.credit + NEW.credit
  WHERE id = NEW.id;

-- Triggers for consultationHours
CREATE TRIGGER insert_CHours
AFTER INSERT ON consultationHours
FOR EACH ROW
  UPDATE fsr
    SET totalCHours = totalCHours + (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
    WHERE id = NEW.id;

CREATE TRIGGER delete_CHours
BEFORE DELETE ON consultationHours
FOR EACH ROW
  UPDATE fsr
    SET totalCHours = totalCHours - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd))
    WHERE id = OLD.id;

CREATE TRIGGER update_totalCHours 
AFTER update ON consultationHours
FOR EACH ROW 
UPDATE fsr 
  SET totalCHours = totalCHours - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd)) 
  + (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
  WHERE id = NEW.id; 


-- Triggers for subject and timeslot
CREATE TRIGGER insert_subjectTimeslot
AFTER INSERT ON timeslot
FOR EACH ROW
  UPDATE subject
    SET hoursPerWeek = hoursPerWeek + (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
    WHERE subjectID = NEW.subjectID;

CREATE TRIGGER delete_subjectTimeslot
BEFORE DELETE ON timeslot
FOR EACH ROW
  UPDATE subject
    SET hoursPerWeek = hoursPerWeek - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd))
    WHERE subjectID = OLD.subjectID;

CREATE TRIGGER update_hoursPerWeekSubj 
AFTER update ON timeslot
FOR EACH ROW 
UPDATE subject 
  SET hoursPerWeek = hoursPerWeek - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd)) 
  + (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
  WHERE subjectID = NEW.subjectID;

-- Triggers for course and courseSched
CREATE TRIGGER insert_courseSched
AFTER INSERT ON courseSched
FOR EACH ROW
  UPDATE course
    SET hoursPerWeek = hoursPerWeek + (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
    WHERE courseID = NEW.courseID;

CREATE TRIGGER delete_courseSched
BEFORE DELETE ON courseSched
FOR EACH ROW
  UPDATE course
    SET hoursPerWeek = hoursPerWeek - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd))
    WHERE courseID = OLD.courseID;

CREATE TRIGGER update_hoursPerWeekCourse 
AFTER update ON courseSched
FOR EACH ROW 
UPDATE course 
  SET hoursPerWeek = hoursPerWeek - (SELECT TIMESTAMPDIFF(HOUR, OLD.timeStart, OLD.timeEnd)) + 
  (SELECT TIMESTAMPDIFF(HOUR, NEW.timeStart, NEW.timeEnd))
  WHERE courseID = new.courseID;


-- VIEWS

-- show profile of user 
-- used with `WHERE userID = :userID` can also add fsr's isApproved, acadYear and semester

CREATE OR REPLACE VIEW viewProfile AS SELECT u.employeeID, u.middleName, u.lastName, 
u.committee, u.isHead, u.officeNumber, u.contractType, u.emailAddress, u.rank, u.acctType, f.id, f.isChecked, f.acadYear, 
f.semester FROM user u, fsr f WHERE u.userID = f.userID;

-- viewAdminWork
-- shows userID, employeeID, fsrID, adminWork fields
CREATE OR REPLACE VIEW viewAdminWork AS SELECT  u.employeeID, a.position, 
a.officeUnit, a.approvedUnits FROM adminWork a JOIN fsr f ON a.id = f.id JOIN user u on f.userID = u.userID;

-- viewAward
-- shows userID, employeeID, fsrID, award fields
CREATE OR REPLACE VIEW viewAward AS SELECT  u.employeeID, a.grantF, 
a.chairGrantTitle, a.collegeHasNominated, a.recipientOrNominee, a.professionalChair, a.approvedStartDate, 
a.endDate FROM award a JOIN fsr f ON a.id = f.id JOIN user u on f.userID = u.userID;

-- viewExtensionAndCommunityService
-- shows userID, employeeID, fsrID, limitedPracticeOfProf fields
CREATE OR REPLACE VIEW viewExtensionAndCommunityService AS SELECT  u.employeeID, e.participant, e.role, e.hours, e.title, e.creditUnit, e.type, e.startDate, e.endDate 
FROM extensionAndCommunityService e JOIN fsr f ON e.id = f.id JOIN user u on f.userID = u.userID;

-- viewLimitedPracticeOfProf
-- shows userID, employeeID, fsrID, limitedPracticeOfProf fields
CREATE OR REPLACE VIEW viewLimitedPracticeOfProf AS SELECT u.employeeID, l.askedPermission, l.date FROM limitedPracticeOfProf l JOIN fsr f ON l.id = f.id 
JOIN user u on f.userID = u.userID;

-- viewCreativeWork
-- shows userID, employeeID, fsrID, creativeWork fields
CREATE OR REPLACE VIEW viewCreativeWork AS SELECT u.employeeID, c.date, c.title, c.type, c.credUnit, c.coAuthor FROM creativeWork c JOIN fsr f 
ON c.id = f.id JOIN user u on f.userID = u.userID;

-- viewResearch
CREATE OR REPLACE VIEW viewResearch AS SELECT  u.employeeID, r.type, r.role, r.title, r.startDate, r.endDate, r.funding, r.approvedUnits, r.coAuthor
FROM research r JOIN fsr f ON r.id = f.id JOIN user u on f.userID = u.userID;

 -- viewConsultationHours
-- userID, employeeID, fsrID, consultationHours fields, chTimeslot fields
CREATE OR REPLACE VIEW viewConsultationHours AS SELECT u.employeeID, c.place, c.day, c.timeStart, c.timeEnd FROM user u JOIN fsr f ON u.userID = f.userID 
JOIN consultationHours c ON f.id = c.id;

-- viewSubjectTimeslot
-- userID, employeeID, fsrID, subject fields, timeslot fields
CREATE OR REPLACE VIEW viewSubjectTimeslot AS SELECT  u.employeeID
,s.subjectCode, s.teachingLoadCreds, s.noOfStudents, s.hoursPerWeek, s.room, 
t.day, t.timeStart, t.timeEnd FROM user u JOIN fsr f ON u.userID = f.userID 
JOIN subject s ON f.id = s.id LEFT JOIN timeslot t ON s.subjectID = t.subjectID;


-- viewStudyLoad
-- shows userID, employeeID, fsrID, studyLoad fields
CREATE OR REPLACE VIEW viewStudyLoad AS SELECT  u.employeeID, 
s.degree, s.university, s.fullLeaveWithPay, s.fellowshipRecipient, s.totalSLcredits 
FROM user u JOIN fsr f ON u.userID = f.userID JOIN studyLoad s ON f.id = s.id;

-- view entities tied with studyLoad
-- viewSLCourse
CREATE OR REPLACE VIEW viewSLCourses AS SELECT u.employeeID,
s.university, s.degree, c.courseID, c.courseNumber, c.school, c.credit, c.hoursPerWeek, 
cs.day, cs.timeStart, cs.timeEnd FROM user u JOIN fsr f ON u.userID = f.userID JOIN 
studyLoad s ON f.id = s.id JOIN course c ON f.id = c.id LEFT JOIN courseSched cs ON c.courseID = cs.courseID;


-- Privileges
GRANT SUPER ON *.* TO 'easyfsr'@'localhost';
GRANT ALL PRIVILEGES ON easyfsr.* TO 'easyfsr'@'localhost';

DROP PROCEDURE IF EXISTS log;
DELIMITER $$
CREATE PROCEDURE log (
  IN action VARCHAR(40),
  IN changes TEXT(64),
  IN id VARCHAR(17),
  IN userID INT)
BEGIN
  INSERT INTO log VALUES (
    UUID_SHORT(),
    NOW(),
    action,
    changes,
    id,
    userID
  );
END;
$$
DELIMITER ;