import type { Metadata } from "next";
import { ShieldCheck, Compass, Handshake } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.shortName} — a Chartered Accountancy firm based in Vashi, Navi Mumbai.`,
};

const values = [
  {
    icon: ShieldCheck,
    title: "Diligence",
    description:
      "Every engagement is approached with the rigour expected of statutory and audit-grade work.",
  },
  {
    icon: Compass,
    title: "Clarity",
    description:
      "We explain compliance and tax positions in plain terms, so clients can make informed decisions.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "Our partners stay involved in client engagements rather than handing work off entirely.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={`About ${siteConfig.shortName}`}
        description="V K Jha & Associates is a Chartered Accountancy firm based in Vashi, Navi Mumbai, providing audit, taxation, GST, company registration and ongoing compliance support to businesses across industries. Full firm history to be added."
      />

      <Section className="pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <RevealOnScroll key={v.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/40 text-gold-deep">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {v.description}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <RevealOnScroll>
          <GlassCard className="bg-white/70">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Where we work from
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Our office is located at {siteConfig.contact.addressLines.join(", ")}.
              We work with clients locally and remotely across India.
            </p>
          </GlassCard>
        </RevealOnScroll>
      </Section>
    </>
  );
}
