import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

function LoginFallback() {
  return (
    <div className="flex min-h-[280px] w-full max-w-md items-center justify-center rounded-xl border border-border/60 bg-card/50 text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

export default function LoginPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="flex justify-center px-4 pb-16 pt-24 md:pt-28">
        <Suspense fallback={<LoginFallback />}>
          <LoginForm googleEnabled={googleEnabled} />
        </Suspense>
      </main>
    </div>
  );
}
