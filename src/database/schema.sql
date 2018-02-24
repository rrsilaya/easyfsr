-- User
DROP USER IF EXISTS 'fsrmgtsys'@'localhost';
CREATE USER 'fsrmgtsys'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS fsrmgtsys;
CREATE DATABASE fsrmgtsys;

USE fsrmgtsys;

-- Privileges
GRANT ALL PRIVILEGES ON fsrmgtsys.* TO 'fsrmgtsys'@'localhost';