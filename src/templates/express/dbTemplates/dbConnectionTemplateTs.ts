export const dbMongoTemplateTS: string = `import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("⚠️  DATABASE_URL is not defined in environment variables");
      return;
    }
    await mongoose.connect(dbUrl);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
`;

export const dbPgTemplateTS: string = `import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("⚠️  DATABASE_URL is not defined in environment variables");
      return;
    }
    const client = await pool.connect();
    console.log(" PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
    process.exit(1);
  }
};
`;

export const dbMysqlTemplateTS: string = `import mysql from "mysql2/promise";

export let pool: mysql.Pool;

export const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("⚠️  DATABASE_URL is not defined in environment variables");
      return;
    }
    pool = mysql.createPool(dbUrl);
    const connection = await pool.getConnection();
    console.log(" MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection error:", error);
    process.exit(1);
  }
};
`;
