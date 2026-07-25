import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "My Bookings",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("client_id", user!.id)
    .order("created_at", { ascending: false });

  if (!bookings || bookings.length === 0) {
    return (
      <RevealOnScroll>
        <GlassCard className="flex flex-col items-center gap-4 bg-white/70 py-14 text-center">
          <CalendarPlus size={28} className="text-gold-deep" />
          <p className="font-heading text-lg font-semibold text-ink">
            No bookings yet
          </p>
          <p className="max-w-sm text-sm text-ink-soft">
            Book a consultation and it will show up here with its status.
          </p>
          <Link
            href="/dashboard/book"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
          >
            Book a Consultation
            <ArrowRight size={16} />
          </Link>
        </GlassCard>
      </RevealOnScroll>
    );
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking, i) => (
        <RevealOnScroll key={booking.id} delay={Math.min(i, 5) * 0.04}>
          <Link href={`/dashboard/bookings/${booking.id}`}>
            <GlassCard className="flex flex-col gap-3 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {booking.booking_id}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-ink">
                  {booking.service}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {new Date(booking.preferred_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {booking.preferred_time} ·{" "}
                  {booking.meeting_mode === "online" ? "Online" : "In-person"}
                </p>
              </div>
              <StatusBadge status={booking.status as BookingStatus} />
            </GlassCard>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}
