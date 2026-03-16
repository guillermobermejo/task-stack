import bcrypt from "bcrypt";
import { prisma } from "../../db/prisma";
import { HttpError } from "../../utils/httpError";
import { RegisterInput } from "./auth.schemas";

const SALT_ROUNDS = 10;

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new HttpError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}