
CREATE DATABASE IF NOT EXISTS query_executor_db;
USE query_executor_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS query_audit (
  audit_id INT AUTO_INCREMENT PRIMARY KEY,
  original_query TEXT NOT NULL,
  sql_query TEXT NOT NULL,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45)
);

INSERT INTO users (full_name, email, password, status) VALUES
('John Doe', 'john@example.com', 'hashed_password_1', 'active'),
('Jane Smith', 'jane@example.com', 'hashed_password_2', 'active'),
('Bob Johnson', 'bob@example.com', 'hashed_password_3', 'inactive'),
('Alice Brown', 'alice@example.com', 'hashed_password_4', 'active'),
('Charlie Davis', 'charlie@example.com', 'hashed_password_5', 'suspended');