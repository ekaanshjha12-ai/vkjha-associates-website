import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import { startBusinessSteps } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Start Your Business",
  description: "A step-by-step guide to registering and launching your business with V K Jha & Associates.",
};

export default function StartYourBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Your Business"
        title="From idea to incorporated"
        description="A guided path to registering your business and getting compliance-ready from day one."
      >
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
        >
          Start the conversation
          <ArrowRight size={16} />
        </Link>
      </PageHero>

      <Section className="pt-4">
        <ProcessTimeline steps={startBusinessSteps} />
      </Section>
    </>
  );
}
