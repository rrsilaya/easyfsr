-- User
DROP USER IF EXISTS 'easyfsr'@'localhost';
CREATE USER 'easyfsr'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS easyfsr;
CREATE DATABASE easyfsr;

USE easyfsr;

CREATE TABLE user(
  employeeID VARCHAR (30) NOT NULL PRIMARY KEY,
  password VARCHAR (36) NOT NULL,
  firstName VARCHAR (50) NOT NULL,
  middleName VARCHAR (50) NOT NULL,
  lastName VARCHAR (50) NOT NULL,
  committee VARCHAR (30) NOT NULL,
  isHead VARCHAR (5) NOT NULL,      -- YES / NO
  officeNumber VARCHAR (30) NOT NULL, 
  contractType VARCHAR (40) NOT NULL, -- FULL-TIME / PART-TIME
  emailAddress VARCHAR (40) NOT NULL,
  rank VARCHAR (30) NOT NULL,
  isArchived VARCHAR (10) NOT NULL, -- YES / NO / PENDING (?) 
  acctType VARCHAR(10) -- ADMIN / USER
);
-- Privileges
GRANT SUPER ON *.* TO 'easyfsr'@'localhost';
GRANT ALL PRIVILEGES ON easyfsr.* TO 'easyfsr'@'localhost';