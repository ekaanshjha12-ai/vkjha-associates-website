import type { BookingStatus } from "@/lib/supabase/types";

export const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  rescheduled: "Rescheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-gold/40 text-gold-deep",
  accepted: "bg-sage/50 text-sage-deep",
  rejected: "bg-red-100 text-red-700",
  rescheduled: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-ink/10 text-ink-soft",
};
