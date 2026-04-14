import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
): Promise<void> {
  const from = process.env.EMAIL_FROM ?? "noreply@localhost";
  const transport = getTransport();

  const subject = "Reset your password";
  const text = `Reset your password by visiting:\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`;
  const html = `<p>Reset your password by clicking the link below.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, you can ignore this email.</p>`;

  if (!transport) {
    console.info(
      "[auth] SMTP not configured; password reset link for",
      to,
      ":",
      resetUrl,
    );
    return;
  }

  await transport.sendMail({ from, to, subject, text, html });
}
