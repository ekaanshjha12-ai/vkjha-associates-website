import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DownloadConfirmationButton from "@/components/dashboard/DownloadConfirmationButton";
import { siteConfig } from "@/lib/site-config";
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

export default async function BookingDetailPage({
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
        href="/dashboard"
        className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={15} />
        Back to bookings
      </Link>

      <GlassCard className="mt-4 bg-white/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {booking.booking_id}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-ink">
              Booking Confirmation
            </h2>
            <p className="mt-1 text-xs text-ink-soft">{siteConfig.shortName}</p>
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
              Notes
            </dt>
            <dd className="mt-1 text-sm text-ink">{booking.notes}</dd>
          </div>
        )}

        {booking.status === "rejected" && booking.rejection_reason && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-medium">Reason</p>
            <p className="mt-1">{booking.rejection_reason}</p>
          </div>
        )}

        {booking.status === "rescheduled" && booking.reschedule_date && (
          <div className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <p className="font-medium">New proposed time</p>
            <p className="mt-1">
              {formatDate(booking.reschedule_date)}
              {booking.reschedule_time ? ` · ${booking.reschedule_time}` : ""}
            </p>
          </div>
        )}

        <p className="mt-6 text-xs text-ink-soft">
          Booked on {formatDate(booking.created_at)}
        </p>

        <div className="mt-6">
          <DownloadConfirmationButton />
        </div>
      </GlassCard>
    </RevealOnScroll>
  );
}
