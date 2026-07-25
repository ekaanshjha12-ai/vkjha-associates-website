import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Section className="pt-16 pb-8 md:pt-24">
      <RevealOnScroll className="max-w-2xl">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full bg-white/60 px-4 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-white/70">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-ink md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            {description}
          </p>
        )}
        {children}
      </RevealOnScroll>
    </Section>
  );
}
