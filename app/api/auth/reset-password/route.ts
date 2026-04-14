import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { resetPasswordWithToken } from "@/lib/services/auth/password-reset";
import { getRequestIp, rateLimit, RateLimitError } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    await rateLimit({
      name: "reset-password",
      identifier: getRequestIp(request),
      limit: 10,
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

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const result = await resetPasswordWithToken(parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
