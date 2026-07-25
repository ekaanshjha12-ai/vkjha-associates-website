import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { faqs } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about V K Jha & Associates and our services.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        description="Answers to common questions about our services and how to get started."
      />

      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
