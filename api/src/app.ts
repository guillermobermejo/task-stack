import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middleware/error";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Auth routes
app.use("/auth", authRouter);

// Centralized error handler (must come after routes)
app.use(errorMiddleware);