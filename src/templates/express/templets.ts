const expressTemplateCJS: string = `
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!", status: "ok" });
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

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

const expressTemplateESM: string = `
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!", status: "ok" });
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

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

const expressTemplateTS: string = `
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!", status: "ok" });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

const packageJsonTemplateCJS: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"commonjs",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "build": "node server.js"
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
const packageJsonTemplateESM: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"module",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "build": "node server.js"
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


const packageJsonTemplateTS: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"module",
    "main": "dist/server.js",
    "scripts": {
      "start": "node dist/server.js",
      "dev": "tsc && node dist/server.js",
      "build": "tsc"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.4.5",
      "express": "^4.19.2",
      "morgan": "^1.10.0"
    },
    "devDependencies": {
      "typescript": "^5.4.5",
      "ts-node-dev": "^2.0.0",
      "@types/express": "^4.17.21",
      "@types/cors": "^2.8.17",
      "@types/morgan": "^1.9.9",
      "nodemon": "^3.1.0"
    }
  }
`;

const tsConfigTemplate: string = `{
"compilerOptions": {
"target": "ES2021",
"module": "ESNext",
"moduleResolution": "Node",
"outDir": "dist",
"rootDir": ".",
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true
},
"include": ["./**/*.ts"],
"exclude": ["node_modules", "dist"]
}`

export {
  expressTemplateCJS,
  expressTemplateESM,
  expressTemplateTS,
  packageJsonTemplateCJS,
  packageJsonTemplateESM,
  packageJsonTemplateTS,
  tsConfigTemplate,
};
