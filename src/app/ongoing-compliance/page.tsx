import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import { complianceItems } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Ongoing Compliance",
  description: "Recurring compliance support from V K Jha & Associates — GST, TDS, ROC, PF/ESIC and statutory audits.",
};

export default function OngoingCompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Ongoing Compliance"
        title="Staying compliant, quarter after quarter"
        description="Recurring filings and reviews so nothing falls through the cracks as your business grows."
      />

      <Section className="pt-4">
        <ProcessTimeline steps={complianceItems} />
      </Section>
    </>
  );
}
