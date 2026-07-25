import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookingCalendar from "@/components/admin/BookingCalendar";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Calendar",
};

export default async function AdminCalendarPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("preferred_date", { ascending: true });

  return (
    <RevealOnScroll>
      <GlassCard className="bg-white/70">
        <BookingCalendar bookings={(data ?? []) as Booking[]} />
      </GlassCard>
    </RevealOnScroll>
  );
}
