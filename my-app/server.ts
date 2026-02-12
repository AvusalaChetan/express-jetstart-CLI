
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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
