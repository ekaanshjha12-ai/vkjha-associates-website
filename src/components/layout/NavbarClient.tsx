"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, LayoutDashboard, ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav, siteConfig } from "@/lib/site-config";
import SignOutButton from "@/components/auth/SignOutButton";

type NavUser = { email: string; fullName: string | null; isAdmin: boolean } | null;

export default function NavbarClient({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Reset menu state when the route changes, without an effect (React's
  // documented pattern for adjusting state in response to a prop change).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(31,42,46,0.06)]">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-ink">
          {siteConfig.shortName}
        </Link>

        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          {mainNav.map((entry) => {
            if (entry.kind === "link") {
              const active = pathname === entry.href;
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/70 text-ink"
                      : "text-ink-soft hover:bg-white/50 hover:text-ink"
                  }`}
                >
                  {entry.label}
                </Link>
              );
            }

            const active = entry.items.some((item) => item.href === pathname);
            const isOpen = openDropdown === entry.label;

            return (
              <div key={entry.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : entry.label)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active || isOpen
                      ? "bg-white/70 text-ink"
                      : "text-ink-soft hover:bg-white/50 hover:text-ink"
                  }`}
                >
                  {entry.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="glass absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(31,42,46,0.1)]"
                    >
                      {entry.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? "bg-white/70 text-ink"
                              : "text-ink-soft hover:bg-white/50 hover:text-ink"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  <ShieldCheck size={15} />
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <SignOutButton className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Client Login
              </Link>
              <Link
                href="/dashboard/book"
                className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
              >
                Book a Consultation
              </Link>
            </>
          )}
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {mainNav.map((entry) => {
                if (entry.kind === "link") {
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                        pathname === entry.href
                          ? "bg-white/70 text-ink"
                          : "text-ink-soft hover:bg-white/50"
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const isGroupOpen = openMobileGroup === entry.label;
                return (
                  <div key={entry.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileGroup(isGroupOpen ? null : entry.label)
                      }
                      aria-expanded={isGroupOpen}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-white/50"
                    >
                      {entry.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isGroupOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3"
                        >
                          {entry.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                                pathname === item.href
                                  ? "bg-white/70 text-ink"
                                  : "text-ink-soft hover:bg-white/50"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/40 pt-3">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white/50"
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white/50"
                    >
                      Dashboard
                    </Link>
                    <SignOutButton className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-white/50" />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white/50"
                    >
                      Client Login
                    </Link>
                    <Link
                      href="/dashboard/book"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-ink px-3 py-2.5 text-center text-sm font-medium text-ivory"
                    >
                      Book a Consultation
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
