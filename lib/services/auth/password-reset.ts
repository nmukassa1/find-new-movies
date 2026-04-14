import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma/client";
import { hashPassword } from "@/lib/auth/password";
import { sendPasswordResetEmail } from "@/lib/email/send-password-reset";
import type { ForgotPasswordInput, ResetPasswordInput } from "@/lib/validations/auth";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

function appBaseUrl(): string {
  const url = process.env.NEXTAUTH_URL;
  if (!url) throw new Error("NEXTAUTH_URL is not set");
  return url.replace(/\/$/, "");
}

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<void> {
  const email = input.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true, email: true },
  });

  if (!user?.passwordHash) {
    return;
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + RESET_TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const resetUrl = `${appBaseUrl()}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
  await sendPasswordResetEmail(user.email, resetUrl);
}

export async function resetPasswordWithToken(
  input: ResetPasswordInput,
): Promise<{ ok: true } | { ok: false; code: "INVALID_OR_EXPIRED" }> {
  const email = input.email.trim().toLowerCase();
  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: input.token,
      },
    },
  });

  if (!record || record.expires < new Date()) {
    if (record) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: { identifier: email, token: input.token },
        },
      });
    }
    return { ok: false, code: "INVALID_OR_EXPIRED" };
  }

  const passwordHash = await hashPassword(input.password);
  await prisma.$transaction([
    prisma.user.update({
      where: { email },
      data: { passwordHash },
    }),
    prisma.verificationToken.delete({
      where: {
        identifier_token: { identifier: email, token: input.token },
      },
    }),
  ]);

  return { ok: true };
}
