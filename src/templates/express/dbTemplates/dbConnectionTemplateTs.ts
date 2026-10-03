export const dbMongoTemplateTS: string = `import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[WARN] DATABASE_URL is not defined in environment variables");
      return;
    }
    await mongoose.connect(dbUrl);
    console.log("[DB] MongoDB connected successfully");
  } catch (error) {
    console.error("[ERROR] MongoDB connection failed:", error instanceof Error ? error.message : error);
    console.warn("[TIP] Ensure MongoDB is running locally or check your DATABASE_URL in .env");
  }
};
`;

export const dbPgTemplateTS: string = `import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/my_database",
});

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[WARN] DATABASE_URL is not defined in environment variables");
      return;
    }
    const client = await pool.connect();
    console.log("[DB] PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("[ERROR] PostgreSQL connection failed:", error instanceof Error ? error.message : error);
    console.warn("[TIP] Ensure PostgreSQL is running locally or check your DATABASE_URL in .env");
  }
};
`;

export const dbMysqlTemplateTS: string = `import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

export let pool: mysql.Pool;

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[WARN] DATABASE_URL is not defined in environment variables");
      return;
    }
    pool = mysql.createPool(dbUrl);
    const connection = await pool.getConnection();
    console.log("[DB] MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("[ERROR] MySQL connection failed:", error instanceof Error ? error.message : error);
    console.warn("[TIP] Ensure MySQL is running locally or check your DATABASE_URL in .env");
  }
};
`;
