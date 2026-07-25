import type { Metadata } from "next";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Enquiries",
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (!submissions || submissions.length === 0) {
    return (
      <RevealOnScroll>
        <GlassCard className="bg-white/70 py-10 text-center text-sm text-ink-soft">
          No contact form enquiries yet.
        </GlassCard>
      </RevealOnScroll>
    );
  }

  return (
    <div className="grid gap-4">
      {submissions.map((s, i) => (
        <RevealOnScroll key={s.id} delay={Math.min(i, 5) * 0.04}>
          <GlassCard className="bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-heading text-base font-semibold text-ink">
                  {s.full_name}
                </p>
                <p className="text-xs text-ink-soft">
                  {s.email} · {s.phone}
                  {s.company_name ? ` · ${s.company_name}` : ""}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-gold/40 px-3 py-1 text-xs font-medium text-gold-deep">
                {s.purpose}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink">{s.message}</p>
            <p className="mt-3 text-xs text-ink-soft">{formatDateTime(s.created_at)}</p>
          </GlassCard>
        </RevealOnScroll>
      ))}
    </div>
  );
}
