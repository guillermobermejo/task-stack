import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid request body",
      details: err.flatten(),
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: "HttpError",
      message: err.message,
      details: err.details ?? null,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
  });
}