import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a client account with V K Jha & Associates.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Create account"
      title="Set up your client account"
      description="Sign up to book consultations and track their status from your dashboard."
    >
      <SignUpForm />
    </AuthShell>
  );
}
