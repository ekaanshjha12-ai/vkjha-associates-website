import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookingsTable from "@/components/admin/BookingsTable";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Bookings",
};

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <RevealOnScroll>
      <BookingsTable bookings={(data ?? []) as Booking[]} />
    </RevealOnScroll>
  );
}
