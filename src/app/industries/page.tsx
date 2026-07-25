import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { industries } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industries served by V K Jha & Associates.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industries we work with"
        description="We support businesses across a range of sectors with accounting, taxation and compliance needs specific to their industry."
      />

      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <RevealOnScroll key={ind.title} delay={i * 0.05}>
              <GlassCard className="h-full hover:-translate-y-1">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {ind.description}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
