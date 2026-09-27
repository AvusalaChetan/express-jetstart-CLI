export const tsImport: string[] = [
  `import express, { Request, Response, NextFunction } from "express";`,
  `import dotenv from "dotenv";`,
  `import cors from "cors";`,
  `import morgan from "morgan";`,
  `import {app} from "./server.js";`,
];

export const serverJsTemplate: string = `
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;
 
// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\` Server running on http://localhost:\${PORT}\`);
});
  `;

export const appts: string = `
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

export const packageJsonTemplateTS: string = `
{
    "name": "{{project-name}}",
    "version": "1.0.0",
    "description": "",
    "type":"module",
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
}`;
