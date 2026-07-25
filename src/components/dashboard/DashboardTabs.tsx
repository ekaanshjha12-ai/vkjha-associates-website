"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarPlus, UserRound } from "lucide-react";

const tabs = [
  { label: "Bookings", href: "/dashboard", icon: LayoutDashboard },
  { label: "Book a Consultation", href: "/dashboard/book", icon: CalendarPlus },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
];

export default function DashboardTabs() {
  const pathname = usePathname();

  return (
    <div className="glass flex flex-wrap gap-1 rounded-2xl p-1.5">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-white/80 text-ink"
                : "text-ink-soft hover:bg-white/50 hover:text-ink"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
