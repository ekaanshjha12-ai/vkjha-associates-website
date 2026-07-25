import type { BookingStatus } from "@/lib/supabase/types";

// Fixed status palette (never themed) — reserved for state, not identity.
// Source: dataviz skill reference palette (good/warning/serious/critical + muted).
export const statusChartColors: Record<BookingStatus, string> = {
  pending: "#fab219", // warning
  accepted: "#0ca30c", // good
  rescheduled: "#ec835a", // serious
  completed: "#0ca30c", // good
  rejected: "#d03b3b", // critical
  cancelled: "#898781", // muted/neutral
};

export const chartChrome = {
  surface: "#fcfcfb",
  primaryInk: "#0b0b0b",
  secondaryInk: "#52514e",
  mutedInk: "#898781",
  gridline: "#e1e0d9",
  axis: "#c3c2b7",
};
