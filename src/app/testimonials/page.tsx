import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { testimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with V K Jha & Associates.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What clients say"
        description="Sample placeholder testimonials shown below — to be replaced with real client feedback."
      />

      <Section className="pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.attribution} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="text-sm italic leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-ink">
                  {t.attribution}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
