import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex justify-center px-4 pb-16 pt-24 md:pt-28">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
