import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TiltCard from "@/components/ui/TiltCard";
import { leaders } from "@/lib/content/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the partners of V K Jha & Associates.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The partners"
        description="Partner-led engagements across audit, taxation, and secretarial compliance. Full individual profiles to be added."
      />

      <Section className="pt-4">
        <div className="grid gap-8 md:grid-cols-3">
          {leaders.map((leader, i) => (
            <RevealOnScroll key={leader.name} delay={i * 0.1}>
              <TiltCard>
                <GlassCard className="h-full text-center">
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/70">
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-sage/50 font-heading text-2xl text-ink">
                        {leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <h2 className="mt-5 font-heading text-xl font-semibold text-ink">
                    {leader.name}
                  </h2>
                  <p className="text-sm font-medium text-gold-deep">
                    {leader.credentials}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
                    {leader.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {leader.bio}
                  </p>
                </GlassCard>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
