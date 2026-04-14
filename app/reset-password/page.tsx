import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";
  const email = typeof sp.email === "string" ? sp.email : "";

  return (
    <div className="min-h-screen bg-background">
      <main className="flex justify-center px-4 pb-16 pt-24 md:pt-28">
        <ResetPasswordForm token={token} email={email} />
      </main>
    </div>
  );
}
