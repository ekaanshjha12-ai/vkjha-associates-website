import { statusLabels, statusStyles } from "@/lib/booking-status";
import type { BookingStatus } from "@/lib/supabase/types";

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
