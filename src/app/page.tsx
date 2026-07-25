import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HeroVisual from "@/components/three/HeroVisual";
import ServiceCard from "@/components/sections/ServiceCard";
import { services } from "@/lib/content/services";
import { leaders } from "@/lib/content/leadership";
import { testimonials } from "@/lib/content/testimonials";

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <>
      <Section className="relative isolate overflow-hidden pt-12 md:py-24 min-h-[560px] md:min-h-[680px] flex items-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <HeroVisual />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ivory via-ivory/75 to-ivory/10"
        />

        <RevealOnScroll className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-white/70">
            <Sparkles size={14} className="text-gold-deep" />
            Chartered Accountants · Navi Mumbai
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.1] text-ink md:text-6xl">
            Chartered accountancy,{" "}
            <span className="text-gradient-gold">built on trust</span>.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            V K Jha &amp; Associates supports businesses with audit &amp;
            assurance, taxation, GST, company registration and ongoing
            compliance — precise, dependable, and easy to work with.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard/book"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
            >
              Book a Consultation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-white/50"
            >
              Explore Services
            </Link>
          </div>
        </RevealOnScroll>
      </Section>

      <Section className="py-10 md:py-14">
        <RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Audit-grade diligence" },
              { icon: Users, label: "Partner-led engagements" },
              { icon: Sparkles, label: "Clear, responsive service" },
            ].map(({ icon: Icon, label }) => (
              <GlassCard key={label} className="flex items-center gap-3 py-4">
                <Icon size={20} className="shrink-0 text-gold-deep" />
                <span className="text-sm font-medium text-ink">{label}</span>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              Services
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              A full suite of accounting, tax and compliance services for
              businesses at every stage.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold-deep"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 0.05}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Section>
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              Leadership
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Partner-led engagements backed by professional credentials
              across audit, tax and secretarial practice.
            </p>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold-deep"
          >
            Meet the team <ArrowRight size={15} />
          </Link>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {leaders.map((leader, i) => (
            <RevealOnScroll key={leader.name} delay={i * 0.08}>
              <GlassCard className="text-center hover:-translate-y-1">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/70">
                  {leader.photo ? (
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-sage/50 font-heading text-xl text-ink">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {leader.name}
                </h3>
                <p className="text-sm text-gold-deep">{leader.credentials}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
                  {leader.role}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Section>
        <RevealOnScroll>
          <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
            What clients say
          </h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
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

      <Section>
        <RevealOnScroll>
          <GlassCard className="flex flex-col items-center gap-6 bg-white/70 px-8 py-14 text-center">
            <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
              Let&apos;s talk about your compliance and growth.
            </h2>
            <p className="max-w-xl text-ink-soft">
              Reach out for a consultation on audit, tax, registration or
              ongoing compliance.
            </p>
            <Link
              href="/dashboard/book"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
            >
              Book a Consultation
              <ArrowRight size={16} />
            </Link>
          </GlassCard>
        </RevealOnScroll>
      </Section>
    </>
  );
}
