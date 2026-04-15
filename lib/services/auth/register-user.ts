import { prisma } from "@/lib/prisma/client";
import { hashPassword } from "@/lib/auth/password";
import type { RegisterInput } from "@/lib/validations/auth";

export type RegisterResult =
  | { ok: true; userId: string }
  | { ok: false; code: "EMAIL_TAKEN" | "UNKNOWN" };

export async function registerCredentialsUser(
  input: RegisterInput,
): Promise<RegisterResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  try {
    const passwordHash = await hashPassword(input.password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: { id: true },
    });
    return { ok: true, userId: user.id };
  } catch (e) {
    if (
      e instanceof prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { ok: false, code: "EMAIL_TAKEN" };
    }
    return { ok: false, code: "UNKNOWN" };
  }
}
