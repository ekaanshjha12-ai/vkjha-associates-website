"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Inbox,
  History,
} from "lucide-react";

const tabs = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
  { label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Audit Log", href: "/admin/audit-log", icon: History },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="glass flex flex-wrap gap-1 rounded-2xl p-1.5">
      {tabs.map((tab) => {
        const active = tab.href === "/admin" ? pathname === tab.href : pathname.startsWith(tab.href);
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
