import { Request, Response, NextFunction } from "express";
import { registerSchema } from "./auth.schemas";
import { registerUser } from "./auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate request body using Zod before passing data to the service layer
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json(user);
  } catch (error) {
    // Forward errors to centralized error middleware
    next(error);
  }
}