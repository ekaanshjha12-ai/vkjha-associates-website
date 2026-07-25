import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { litigationSupport } from "@/lib/content/litigation";

export const metadata: Metadata = {
  title: "Notices & Litigation",
  description: "Support with tax and regulatory notices, assessments, appeals and representation.",
};

export default function NoticesLitigationPage() {
  return (
    <>
      <PageHero
        eyebrow="Notices & Litigation"
        title="Responding to notices, with a clear plan"
        description="Support with tax and regulatory notices — from first response to representation before authorities."
      />

      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {litigationSupport.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.06}>
              <GlassCard className="h-full">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
