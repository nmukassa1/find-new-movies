import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="flex justify-center px-4 pb-16 pt-24 md:pt-28">
        <SignupForm googleEnabled={googleEnabled} />
      </main>
    </div>
  );
}
