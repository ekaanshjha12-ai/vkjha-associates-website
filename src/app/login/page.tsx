import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Log in to your V K Jha & Associates client account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Client Login"
      title="Welcome back"
      description="Log in to book consultations and track their status."
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
