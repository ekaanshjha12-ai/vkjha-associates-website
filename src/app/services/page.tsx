import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ServiceCard from "@/components/sections/ServiceCard";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Audit, taxation, GST, registration and compliance services offered by V K Jha & Associates.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we do"
        description="A full suite of accounting, tax, secretarial and compliance services designed to support businesses at every stage."
      />

      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <RevealOnScroll key={service.title} delay={(i % 6) * 0.05}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
