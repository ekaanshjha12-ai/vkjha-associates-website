"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import GoogleButton from "@/components/auth/GoogleButton";

const DISMISS_KEY = "vkjha-welcome-popup-dismissed-at";
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 2000;

const HIDDEN_ON = ["/login", "/signup", "/dashboard", "/admin", "/auth"];

export default function WelcomePopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const hideOnThisPath = HIDDEN_ON.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  useEffect(() => {
    if (hideOnThisPath) return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    const daysSinceDismiss = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    if (dismissedAt && daysSinceDismiss < DISMISS_DAYS) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hideOnThisPath]);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }

  if (hideOnThisPath) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass fixed bottom-6 right-6 z-40 w-[300px] rounded-2xl p-5 shadow-[0_16px_40px_rgba(31,42,46,0.15)]"
          role="dialog"
          aria-label="Sign in or create an account"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-full p-1 text-ink-soft transition-colors hover:bg-white/60 hover:text-ink"
          >
            <X size={16} />
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-white/70">
            <Sparkles size={12} className="text-gold-deep" />
            New here?
          </span>

          <p className="mt-3 text-sm leading-relaxed text-ink">
            Log in or create a free account to book consultations and track
            them online.
          </p>

          <div className="mt-4 grid gap-2">
            <GoogleButton label="Continue with Google" />
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={dismiss}
                className="rounded-full px-4 py-2 text-center text-sm font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-white/50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={dismiss}
                className="rounded-full bg-ink px-4 py-2 text-center text-sm font-medium text-ivory transition-transform hover:scale-[1.02]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
