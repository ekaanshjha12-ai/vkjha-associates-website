import type { Tables } from "./database.types";

export type { Database } from "./database.types";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "rescheduled"
  | "cancelled";

export type MeetingMode = "online" | "offline";

export type ProfileRole = "client" | "admin";

export type Profile = Tables<"profiles">;
export type Booking = Tables<"bookings">;
export type BookingAuditLog = Tables<"booking_audit_log">;
