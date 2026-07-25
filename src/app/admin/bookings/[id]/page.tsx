import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StatusBadge from "@/components/dashboard/StatusBadge";
import BookingActions from "@/components/admin/BookingActions";
import AdminNotesForm from "@/components/admin/AdminNotesForm";
import AuditTrail from "@/components/admin/AuditTrail";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Booking Details",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (!booking) {
    notFound();
  }

  const { data: auditEntries } = await supabase
    .from("booking_audit_log")
    .select("id, action, from_status, to_status, note, created_at, actor:profiles(full_name, email)")
    .eq("booking_id", id)
    .order("created_at", { ascending: false });

  const row = [
    ["Service", booking.service],
    ["Full Name", booking.full_name],
    ["Company", booking.company || "-"],
    ["Phone", booking.phone],
    ["Email", booking.email],
    [
      "Preferred Date & Time",
      `${formatDate(booking.preferred_date)} · ${booking.preferred_time}`,
    ],
    ["Meeting Mode", booking.meeting_mode === "online" ? "Online" : "In-person"],
  ] as const;

  return (
    <RevealOnScroll>
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={15} />
        Back to bookings
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-6">
          <GlassCard className="bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {booking.booking_id}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-ink">
                  {booking.full_name}
                </h2>
              </div>
              <StatusBadge status={booking.status as BookingStatus} />
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {row.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            {booking.notes && (
              <div className="mt-6">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Client Notes
                </dt>
                <dd className="mt-1 text-sm text-ink">{booking.notes}</dd>
              </div>
            )}

            {booking.status === "rejected" && booking.rejection_reason && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <p className="font-medium">Rejection reason</p>
                <p className="mt-1">{booking.rejection_reason}</p>
              </div>
            )}

            {booking.status === "rescheduled" && booking.reschedule_date && (
              <div className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <p className="font-medium">Proposed new time</p>
                <p className="mt-1">
                  {formatDate(booking.reschedule_date)}
                  {booking.reschedule_time ? ` · ${booking.reschedule_time}` : ""}
                </p>
              </div>
            )}

            <p className="mt-6 text-xs text-ink-soft">
              Booked on {formatDate(booking.created_at)}
            </p>
          </GlassCard>

          <GlassCard className="bg-white/70">
            <h3 className="font-heading text-lg font-semibold text-ink">Actions</h3>
            <div className="mt-4">
              <BookingActions
                bookingId={booking.id}
                currentStatus={booking.status as BookingStatus}
              />
            </div>
          </GlassCard>

          <GlassCard className="bg-white/70">
            <h3 className="font-heading text-lg font-semibold text-ink">
              Internal Notes
            </h3>
            <p className="mt-1 text-xs text-ink-soft">Not visible to the client.</p>
            <div className="mt-4">
              <AdminNotesForm bookingId={booking.id} initialNotes={booking.admin_notes ?? ""} />
            </div>
          </GlassCard>
        </div>

        <GlassCard className="h-fit bg-white/70">
          <h3 className="font-heading text-lg font-semibold text-ink">Activity</h3>
          <div className="mt-4">
            <AuditTrail entries={auditEntries ?? []} />
          </div>
        </GlassCard>
      </div>
    </RevealOnScroll>
  );
}
