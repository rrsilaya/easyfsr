-- User
DROP USER IF EXISTS 'fsrmgtsys'@'localhost';
CREATE USER 'fsrmgtsys'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS fsrmgtsys;
CREATE DATABASE fsrmgtsys;

USE fsrmgtsys;

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
GRANT SUPER ON *.* TO 'fsrmgtsys'@'localhost';
GRANT ALL PRIVILEGES ON fsrmgtsys.* TO 'fsrmgtsys'@'localhost';