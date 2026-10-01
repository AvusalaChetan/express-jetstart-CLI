export const commanjsImport: string[] = [
  `const express = require("express");`,
  `const dotenv = require("dotenv");`,
  `const cors = require("cors");`,
  `const morgan = require("morgan");`,
  `const { app } = require("./app");`,
];

export const esmImport: string[] = [
  `import express from "express";`,
  `import dotenv from "dotenv";`,
  `import cors from "cors";`,
  `import morgan from "morgan";`,
  `import { app } from "./app.js";`,
];

export const serverJsTemplate: string = `import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\` Server running on http://localhost:\${PORT}\`);
});
`;

export const serverCjsTemplate: string = `const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(" Server running on http://localhost:" + PORT);
});
`;

export const appJsTemplate: string = `import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();
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

export const appStarterESM: string = `import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRouter from "./src/routes/health.route.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

export const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "server working correctly", status: "ok" });
});

app.use("/api/health", healthRouter);

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use(errorHandler);
`;

export const appStarterCJS: string = `const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const healthRouter = require("./src/routes/health.route");
const { errorHandler } = require("./src/middlewares/errorHandler");

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

app.use("/api/health", healthRouter);

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use(errorHandler);

module.exports = { app };
`;

export const asyncHandlerTemplateESM: string = `export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
`;

export const asyncHandlerTemplateCJS: string = `const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
`;

export const errorHandlerTemplateESM: string = `export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
`;

export const errorHandlerTemplateCJS: string = `const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = { errorHandler };
`;

export const healthControllerTemplateESM: string = `import { asyncHandler } from "../utils/asyncHandler.js";

export const getHealthStatus = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy and running smoothly!",
    uptime: \`\${process.uptime().toFixed(2)}s\`,
    timestamp: new Date().toISOString(),
  });
});
`;

export const healthControllerTemplateCJS: string = `const { asyncHandler } = require("../utils/asyncHandler");

const getHealthStatus = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy and running smoothly!",
    uptime: \`\${process.uptime().toFixed(2)}s\`,
    timestamp: new Date().toISOString(),
  });
});

module.exports = { getHealthStatus };
`;

export const healthRouteTemplateESM: string = `import { Router } from "express";
import { getHealthStatus } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealthStatus);

export default router;
`;

export const healthRouteTemplateCJS: string = `const { Router } = require("express");
const { getHealthStatus } = require("../controllers/health.controller");

const router = Router();

router.get("/", getHealthStatus);

module.exports = router;
`;

export const packageJsonTemplateCJS: string = `{
  "name": "{{project-name}}",
  "version": "1.0.0",
  "description": "",
  "type": "commonjs",
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

export const packageJsonTemplateESM: string = `{
  "name": "{{project-name}}",
  "version": "1.0.0",
  "description": "",
  "type": "module",
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

export const serverJsTemplateWithDB: string = `import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server & Connect Database ──────────────────────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(\` Server running on http://localhost:\${PORT}\`);
  });
};

startServer();
`;

export const serverCjsTemplateWithDB: string = `const dotenv = require("dotenv");
const { app } = require("./app");
const { connectDB } = require("./src/config/db");

dotenv.config();
const PORT = process.env.PORT || 3000;

// ─── Start Server & Connect Database ──────────────────────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(" Server running on http://localhost:" + PORT);
  });
};

startServer();
`;
