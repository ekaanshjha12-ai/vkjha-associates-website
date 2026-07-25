import { redirect } from "next/navigation";
import Section from "@/components/ui/Section";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  return (
    <Section className="pt-12 md:pt-16">
      <RevealOnScroll className="no-print">
        <p className="text-sm text-ink-soft">Welcome back,</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-ink">
          {profile?.full_name || profile?.email || "Client"}
        </h1>
      </RevealOnScroll>

      <div className="mt-8 no-print">
        <DashboardTabs />
      </div>

      <div className="mt-8">{children}</div>
    </Section>
  );
}
