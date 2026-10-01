export const dbMongoTemplateESM: string = `import mongoose from "mongoose";

export const connectDB = async () => {
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

export const dbMongoTemplateCJS: string = `const mongoose = require("mongoose");

const connectDB = async () => {
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

module.exports = { connectDB };
`;

export const dbPgTemplateESM: string = `import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
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

export const dbPgTemplateCJS: string = `const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
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

module.exports = { pool, connectDB };
`;

export const dbMysqlTemplateESM: string = `import mysql from "mysql2/promise";

export let pool;

export const connectDB = async () => {
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

export const dbMysqlTemplateCJS: string = `const mysql = require("mysql2/promise");

let pool;

const connectDB = async () => {
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

module.exports = { pool, connectDB };
`;
