import bcrypt from "bcrypt";
import { prisma } from "../../db/prisma";
import { HttpError } from "../../utils/httpError";
import { RegisterInput } from "./auth.schemas";

const SALT_ROUNDS = 10;

export async function registerUser(data: RegisterInput) {
    // Prevent duplicate registrations before attempting insert
    const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
    });

    if (existingUser) {
    throw new HttpError(409, "Email is already registered");
    }

    // Hash password before storing in DB
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await prisma.user.create({
    data: {
        email: data.email,
        passwordHash,
    },
    // Only return safe fields (never expose passwordHash)
    select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
    },
});

  return user;
}