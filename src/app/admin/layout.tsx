import { redirect } from "next/navigation";
import Section from "@/components/ui/Section";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AdminTabs from "@/components/admin/AdminTabs";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <Section className="pt-12 md:pt-16">
      <RevealOnScroll>
        <p className="text-sm text-ink-soft">Admin Portal</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-ink">
          {profile.full_name || profile.email}
        </h1>
      </RevealOnScroll>

      <div className="mt-8">
        <AdminTabs />
      </div>

      <div className="mt-8">{children}</div>
    </Section>
  );
}
