import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";
import { registerCredentialsUser } from "@/lib/services/auth/register-user";
import { getRequestIp, rateLimit, RateLimitError } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    await rateLimit({
      name: "register",
      identifier: getRequestIp(request),
      limit: 5,
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

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: "Validation failed", fields: msg }, { status: 400 });
  }

  const result = await registerCredentialsUser(parsed.data);
  if (!result.ok) {
    if (result.code === "EMAIL_TAKEN") {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Could not create account" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
