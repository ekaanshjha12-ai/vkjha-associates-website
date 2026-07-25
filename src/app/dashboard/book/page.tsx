import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookingForm from "@/components/dashboard/BookingForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Book a Consultation",
};

export default async function BookPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user!.id)
    .single();

  return (
    <RevealOnScroll>
      <GlassCard className="bg-white/70">
        <h2 className="font-heading text-xl font-semibold text-ink">
          Book a Consultation
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Tell us what you need help with and pick a time that works for you.
        </p>
        <div className="mt-6">
          <BookingForm
            userId={user!.id}
            defaultFullName={profile?.full_name || ""}
            defaultEmail={profile?.email || user!.email || ""}
          />
        </div>
      </GlassCard>
    </RevealOnScroll>
  );
}
