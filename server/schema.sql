-- Space Fuel Database Schema
-- Database: spacefuel_db

CREATE DATABASE IF NOT EXISTS spacefuel_db;
USE spacefuel_db;

-- Users table structure
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

