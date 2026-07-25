import RevealOnScroll from "@/components/ui/RevealOnScroll";
import GlassCard from "@/components/ui/GlassCard";
import type { ProcessStep } from "@/lib/content/process";

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative grid gap-6 md:grid-cols-2">
      {steps.map((s, i) => (
        <RevealOnScroll key={s.step} delay={(i % 4) * 0.06}>
          <GlassCard className="flex h-full items-start gap-4">
            <span className="font-heading text-2xl font-semibold text-gold-deep/70">
              {s.step}
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {s.description}
              </p>
            </div>
          </GlassCard>
        </RevealOnScroll>
      ))}
    </div>
  );
}
