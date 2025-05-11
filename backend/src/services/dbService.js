const mysql = require("mysql2/promise");
const config = require("../config/config");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

exports.executeQuery = async (sqlQuery) => {
  try {
    logger.info(`Executing SQL query: ${sqlQuery}`);

    const [rows] = await pool.query(sqlQuery);

    logger.info(`Query returned ${rows.length} results`);
    return rows;
  } catch (error) {
    logger.error(`Database query error: ${error.message}`);
    throw new Error(`Database error: ${error.message}`);
  }
};

exports.logQueryToAudit = async (originalQuery, sqlQuery) => {
  try {
    const query = `
      INSERT INTO query_audit (
        original_query, 
        sql_query, 
        executed_at, 
        ip_address
      ) VALUES (?, ?, NOW(), ?)
    `;

    const ipAddress = "127.0.0.1";

    await pool.query(query, [originalQuery, sqlQuery, ipAddress]);
    logger.info("Query logged to audit table");
  } catch (error) {
    logger.error(`Error logging to audit table: ${error.message}`);
  }
};

exports.initializeDatabase = async (req, res) => {
  try {
    logger.info("Initializing database tables");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS query_audit (
        audit_id INT AUTO_INCREMENT PRIMARY KEY,
        original_query TEXT NOT NULL,
        sql_query TEXT NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45)
      )
    `);

    const [rows] = await pool.query("SELECT COUNT(*) as count FROM users");

    if (rows[0].count === 0) {
      logger.info("Adding sample data to users table");

      await pool.query(`
        INSERT INTO users (full_name, email, password, status) VALUES
        ('John Doe', 'john@example.com', 'hashed_password_1', 'active'),
        ('Jane Smith', 'jane@example.com', 'hashed_password_2', 'active'),
        ('Bob Johnson', 'bob@example.com', 'hashed_password_3', 'inactive'),
        ('Alice Brown', 'alice@example.com', 'hashed_password_4', 'active'),
        ('Charlie Davis', 'charlie@example.com', 'hashed_password_5', 'suspended')
      `);
    }

    logger.info("Database initialization complete");

    return res.status(200).json({
      success: true,
      message: "Database initialized successfully",
    });
  } catch (error) {
    logger.error(`Database initialization error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: "Failed to initialize database",
      details: error.message,
    });
  }
};
