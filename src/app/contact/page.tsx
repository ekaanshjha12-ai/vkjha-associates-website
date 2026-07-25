import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with V K Jha & Associates.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Send us your enquiry and our team will get back to you to schedule a consultation."
      />

      <Section className="grid gap-8 pt-4 md:grid-cols-[1fr_1.3fr]">
        <RevealOnScroll>
          <GlassCard className="flex h-full flex-col gap-6 bg-white/70">
            <div className="flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-gold-deep" />
              <div>
                <p className="text-sm font-semibold text-ink">Office</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {siteConfig.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-gold-deep" />
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a
                  href={`tel:+91${siteConfig.contact.phoneRaw}`}
                  className="mt-1 block text-sm text-ink-soft hover:text-ink"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={20} className="mt-0.5 shrink-0 text-gold-deep" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-1 block text-sm text-ink-soft hover:text-ink"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </GlassCard>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <GlassCard className="bg-white/70">
            <ContactForm />
          </GlassCard>
        </RevealOnScroll>
      </Section>
    </>
  );
}
