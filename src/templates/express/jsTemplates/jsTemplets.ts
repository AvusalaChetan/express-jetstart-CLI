export const serverCjsTemplate: string = `const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(' Server running on http://localhost:' + PORT);
});
`;

export const appCjsTemplate: string = `const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "server working correctly", status: "ok" });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = { app };
`;

export const serverJsTemplate: string = `import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(' Server running on http://localhost:' + PORT);
});
`;

export const appJsTemplate: string = `
import express from "express";

export const app = express();
// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req,res) => {
  res.status(200).json({ message: "server working correctly", status: "ok" });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req,res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use((err, req,res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

`;

export const packageJsonTemplateCJS: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"commonjs",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "build": "echo No build step required"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.4.5",
      "express": "^4.19.2",
      "morgan": "^1.10.0"
    },
    "devDependencies": {
      "nodemon": "^3.1.0"
    }
  }
`;

export const packageJsonTemplateESM: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"module",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "build": "echo No build step required"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.4.5",
      "express": "^4.19.2",
      "morgan": "^1.10.0"
    },
    "devDependencies": {
      "nodemon": "^3.1.0"
    }
  }
`;
