export const tsImport: string[] = [
  `import express, { Request, Response, NextFunction } from "express";`,
  `import dotenv from "dotenv";`,
  `import cors from "cors";`,
  `import morgan from "morgan";`,
  `import { app } from "./app.js";`,
];

export const serverTsTemplate: string = `import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

if (Number.isNaN(PORT)) throw new Error("PORT must be a valid number");

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\` Server running on http://localhost:\${PORT}\`);
});
`;

export const appts: string = `import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();
// ─── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "server working correctly", status: "ok" });
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
`;

export const appStarterTs: string = `import express, { Request, Response } from "express";
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
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "server working correctly", status: "ok" });
});

app.use("/api/health", healthRouter);

// ─── 404 Handler ──────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Error Handler ────────────────────────────────────────
app.use(errorHandler);
`;

export const asyncHandlerTemplateTS: string = `import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
`;

export const errorHandlerTemplateTS: string = `import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
`;

export const healthControllerTemplateTS: string = `import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getHealthStatus = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy and running smoothly!",
      uptime: \`\${process.uptime().toFixed(2)}s\`,
      timestamp: new Date().toISOString(),
    });
  }
);
`;

export const healthRouteTemplateTS: string = `import { Router } from "express";
import { getHealthStatus } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealthStatus);

export default router;
`;

export const packageJsonTemplateTS: string = `{
  "name": "{{project-name}}",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "concurrently \\\"tsc -w\\\" \\\"nodemon dist/server.js\\\"",
    "build": "tsc"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.9",
    "concurrently": "^8.2.2",
    "typescript": "^5.4.5",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/morgan": "^1.9.9",
    "nodemon": "^3.1.0"
  }
}
`;

export const tsConfigTemplate: string = `{
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
}
`;
