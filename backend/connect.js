import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

try {
  // Test connection by pinging the database
  await db.ping();
  console.log("Connected to the database!");
} catch (err) {
  console.error("Database connection failed:", err);
}

export default db;
