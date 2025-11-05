import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'ses-web',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  reconnect: true
};

let pool;

try {
  pool = mysql.createPool(dbConfig);
  console.log('MySQL connection pool created successfully');
} catch (error) {
  console.error(' MySQL connection failed:', error);
  process.exit(1);
}

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(' Connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error(' Database connection test failed:', error);
  }
}

testConnection();
export { pool };