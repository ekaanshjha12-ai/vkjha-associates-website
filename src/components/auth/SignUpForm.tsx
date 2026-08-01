"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, MailCheck, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import GoogleButton from "@/components/auth/GoogleButton";

const inputClass =
  "w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold-deep focus:bg-white/80";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setCheckEmail(true);
  }

  if (checkEmail) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <MailCheck size={32} className="text-sage-deep" />
        <p className="font-heading text-lg font-semibold text-ink">
          Check your email
        </p>
        <p className="text-sm text-ink-soft">
          We&apos;ve sent a confirmation link to verify your account. Follow
          it to finish signing up.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-ink/10" />
        or
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-ink">
            Full Name
          </label>
          <input id="fullName" name="fullName" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input id="password" name="password" type="password" required minLength={8} className={inputClass} placeholder="At least 8 characters" />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-ink">
            Confirm Password
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} className={inputClass} placeholder="Re-enter password" />
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-gold-deep hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
