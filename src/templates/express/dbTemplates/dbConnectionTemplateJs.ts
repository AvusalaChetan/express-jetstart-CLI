export const dbMongoTemplateESM: string = `import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[WARN] DATABASE_URL is not defined in environment variables");
      return;
    }
    await mongoose.connect(dbUrl);
    console.log("[DB] MongoDB connected successfully");
  } catch (error) {
    console.error("[ERROR] MongoDB connection failed:", error.message || error.code || "Connection refused");
    console.warn("[TIP] Ensure MongoDB server is running locally or provide a valid DATABASE_URL in .env");
  }
};
`;

export const dbMongoTemplateCJS: string = `const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[WARN] DATABASE_URL is not defined in environment variables");
      return;
    }
    await mongoose.connect(dbUrl);
    console.log("[DB] MongoDB connected successfully");
  } catch (error) {
    console.error("[ERROR] MongoDB connection failed:", error.message || error.code || "Connection refused");
    console.warn("[TIP] Ensure MongoDB server is running locally or provide a valid DATABASE_URL in .env");
  }
};

module.exports = { connectDB };
`;

export const dbPgTemplateESM: string = `import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/my_database",
});

export const connectDB = async () => {
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
    console.error("[ERROR] PostgreSQL connection failed:", error.message || error.code || "Connection refused at port 5432");
    console.warn("[TIP] Ensure PostgreSQL server is running locally or provide a valid DATABASE_URL in .env");
  }
};
`;

export const dbPgTemplateCJS: string = `const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/my_database",
});

const connectDB = async () => {
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
    console.error("[ERROR] PostgreSQL connection failed:", error.message || error.code || "Connection refused at port 5432");
    console.warn("[TIP] Ensure PostgreSQL server is running locally or provide a valid DATABASE_URL in .env");
  }
};

module.exports = { pool, connectDB };
`;

export const dbMysqlTemplateESM: string = `import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

export let pool;

export const connectDB = async () => {
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
    console.error("[ERROR] MySQL connection failed:", error.message || error.code || "Connection refused at port 3306");
    console.warn("[TIP] Ensure MySQL server is running locally or provide a valid DATABASE_URL in .env");
  }
};
`;

export const dbMysqlTemplateCJS: string = `const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

let pool;

const connectDB = async () => {
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
    console.error("[ERROR] MySQL connection failed:", error.message || error.code || "Connection refused at port 3306");
    console.warn("[TIP] Ensure MySQL server is running locally or provide a valid DATABASE_URL in .env");
  }
};

module.exports = { pool, connectDB };
`;
