import type { Metadata } from "next";
import Link from "next/link";
import { History } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { statusLabels } from "@/lib/booking-status";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Audit Log",
};

function describe(entry: {
  action: string;
  from_status: string | null;
  to_status: string | null;
  actor: { full_name: string | null; email: string } | null;
}) {
  const actor = entry.actor?.full_name || entry.actor?.email || "System";
  const toLabel = entry.to_status
    ? statusLabels[entry.to_status as BookingStatus] ?? entry.to_status
    : null;
  const fromLabel = entry.from_status
    ? statusLabels[entry.from_status as BookingStatus] ?? entry.from_status
    : null;

  switch (entry.action) {
    case "created":
      return `${actor} created a booking (${toLabel}).`;
    case "status_change":
      return `${actor} changed status from ${fromLabel} to ${toLabel}.`;
    case "notes_updated":
      return `${actor} updated internal notes.`;
    case "deleted":
      return `${actor} deleted a booking.`;
    default:
      return `${actor} — ${entry.action}`;
  }
}

export default async function AdminAuditLogPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("booking_audit_log")
    .select(
      "id, booking_id, action, from_status, to_status, note, created_at, actor:profiles(full_name, email)"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (!entries || entries.length === 0) {
    return (
      <RevealOnScroll>
        <GlassCard className="bg-white/70 py-10 text-center text-sm text-ink-soft">
          No activity recorded yet.
        </GlassCard>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll>
      <GlassCard className="bg-white/70">
        <ol className="grid gap-4">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/40 text-gold-deep">
                <History size={13} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-ink">{describe(entry)}</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {new Date(entry.created_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Link
                href={`/admin/bookings/${entry.booking_id}`}
                className="ml-auto shrink-0 text-xs font-medium text-gold-deep hover:underline"
              >
                View booking
              </Link>
            </li>
          ))}
        </ol>
      </GlassCard>
    </RevealOnScroll>
  );
}
