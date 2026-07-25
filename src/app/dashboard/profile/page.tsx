import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
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
      <GlassCard className="max-w-lg bg-white/70">
        <h2 className="font-heading text-xl font-semibold text-ink">Profile</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Update the details we use to contact you about your bookings.
        </p>
        <div className="mt-6">
          <ProfileForm
            userId={user!.id}
            email={profile?.email || user!.email || ""}
            fullName={profile?.full_name || ""}
          />
        </div>
      </GlassCard>
    </RevealOnScroll>
  );
}
