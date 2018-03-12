-- User
DROP USER IF EXISTS 'easyfsr'@'localhost';
CREATE USER 'easyfsr'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS easyfsr;
CREATE DATABASE easyfsr;

USE easyfsr;

CREATE TABLE user(
  employeeID VARCHAR (30) NOT NULL PRIMARY KEY,
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
  acctType VARCHAR(10) DEFAULT 'USER' -- ADMIN / USER
);
-- Privileges
GRANT SUPER ON *.* TO 'easyfsr'@'localhost';
GRANT ALL PRIVILEGES ON easyfsr.* TO 'easyfsr'@'localhost';