import { History } from "lucide-react";
import { statusLabels } from "@/lib/booking-status";
import type { BookingStatus } from "@/lib/supabase/types";

type AuditEntry = {
  id: string;
  action: string;
  from_status: string | null;
  to_status: string | null;
  note: string | null;
  created_at: string;
  actor: { full_name: string | null; email: string } | null;
};

function describe(entry: AuditEntry) {
  const actor = entry.actor?.full_name || entry.actor?.email || "System";
  const toLabel = entry.to_status
    ? statusLabels[entry.to_status as BookingStatus] ?? entry.to_status
    : null;
  const fromLabel = entry.from_status
    ? statusLabels[entry.from_status as BookingStatus] ?? entry.from_status
    : null;

  switch (entry.action) {
    case "created":
      return `${actor} created this booking (${toLabel}).`;
    case "status_change":
      return `${actor} changed status from ${fromLabel} to ${toLabel}.`;
    case "notes_updated":
      return `${actor} updated internal notes.`;
    case "deleted":
      return `${actor} deleted this booking.`;
    default:
      return `${actor} — ${entry.action}`;
  }
}

export default function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-ink-soft">No activity recorded yet.</p>;
  }

  return (
    <ol className="grid gap-4">
      {entries.map((entry) => (
        <li key={entry.id} className="flex gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/40 text-gold-deep">
            <History size={13} />
          </div>
          <div>
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
        </li>
      ))}
    </ol>
  );
}
