import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Section className="flex min-h-[70vh] items-center justify-center py-16">
      <RevealOnScroll className="w-full max-w-md">
        <GlassCard className="bg-white/70">
          <span className="inline-flex items-center rounded-full bg-white/60 px-4 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-white/70">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">{description}</p>
          <div className="mt-6">{children}</div>
        </GlassCard>
      </RevealOnScroll>
    </Section>
  );
}
