import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must be at most 72 characters long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;