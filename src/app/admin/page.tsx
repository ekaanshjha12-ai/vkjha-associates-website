import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Clock, CalendarClock, TrendingUp } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StatTile from "@/components/admin/StatTile";
import BookingStatusChart from "@/components/admin/BookingStatusChart";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import type { Booking, BookingStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Admin Overview",
};

const ALL_STATUSES: BookingStatus[] = [
  "pending",
  "accepted",
  "rescheduled",
  "completed",
  "rejected",
  "cancelled",
];

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = (data ?? []) as Booking[];

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const thisWeek = bookings.filter((b) => new Date(b.created_at) >= weekAgo).length;
  const upcoming = bookings.filter(
    (b) =>
      new Date(b.preferred_date) >= new Date(now.toDateString()) &&
      (b.status === "accepted" || b.status === "rescheduled")
  ).length;

  const statusCounts = ALL_STATUSES.map((status) => ({
    status,
    count: bookings.filter((b) => b.status === status).length,
  }));

  const recent = bookings.slice(0, 6);

  return (
    <div className="grid gap-6">
      <RevealOnScroll className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total bookings" value={total} icon={ClipboardList} />
        <StatTile label="Pending review" value={pending} icon={Clock} />
        <StatTile label="New this week" value={thisWeek} icon={TrendingUp} />
        <StatTile label="Upcoming confirmed" value={upcoming} icon={CalendarClock} />
      </RevealOnScroll>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <RevealOnScroll delay={0.05}>
          <GlassCard className="h-full bg-white/70">
            <BookingStatusChart data={statusCounts} />
          </GlassCard>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <GlassCard className="h-full bg-white/70">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-ink">
                Recent bookings
              </h3>
              <Link
                href="/admin/bookings"
                className="text-xs font-medium text-gold-deep hover:underline"
              >
                View all
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-sm text-ink-soft">No bookings yet.</p>
            ) : (
              <div className="grid gap-3">
                {recent.map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {b.full_name}
                      </p>
                      <p className="truncate text-xs text-ink-soft">
                        {b.booking_id} · {b.service}
                      </p>
                    </div>
                    <StatusBadge status={b.status as BookingStatus} />
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>
        </RevealOnScroll>
      </div>
    </div>
  );
}
