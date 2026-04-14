import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { requestPasswordReset } from "@/lib/services/auth/password-reset";
import { getRequestIp, rateLimit, RateLimitError } from "@/lib/rate-limit";

const GENERIC_MESSAGE =
  "If an account exists for that email, you will receive a reset link shortly.";

export async function POST(request: Request) {
  try {
    await rateLimit({
      name: "forgot-password",
      identifier: getRequestIp(request),
      limit: 3,
      windowLabel: "1 h",
      windowMs: 60 * 60 * 1000,
    });
  } catch (e) {
    if (e instanceof RateLimitError) {
      return NextResponse.json({ error: e.message }, { status: 429 });
    }
    throw e;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await requestPasswordReset(parsed.data);
  } catch (e) {
    console.error("[auth] forgot-password:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 200 });
}
