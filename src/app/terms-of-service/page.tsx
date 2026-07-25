import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import LegalDisclaimer from "@/components/legal/LegalDisclaimer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.shortName}.`,
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-heading text-xl font-semibold text-ink first:mt-0">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-ink-soft">{children}</p>;
}

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Placeholder — last updated [DATE]. Replace this date once reviewed and published."
      />
      <Section className="pt-4">
       <div className="mx-auto max-w-3xl">
        <LegalDisclaimer />

        <H2>1. Acceptance of these terms</H2>
        <P>
          By using this website or the client portal, you agree to these
          Terms of Service. If you do not agree, please do not use the site.
        </P>

        <H2>2. What this site is</H2>
        <P>
          This website provides general information about{" "}
          {siteConfig.shortName} and its services, and a client portal for
          creating an account and booking consultations. Content on this
          site is general information only and does not constitute tax,
          legal, accounting or other professional advice. Professional
          services are only provided under a separate engagement agreed
          directly with the firm.
        </P>

        <H2>3. Accounts</H2>
        <P>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity under your account.
          Provide accurate information when creating an account or booking a
          consultation.
        </P>

        <H2>4. Bookings</H2>
        <P>
          Submitting a booking request through the client portal is a
          request for a consultation, not a confirmed appointment. We may
          accept, reject, or propose a new date/time for any booking. You
          will be able to see the current status of your booking in your
          dashboard.
        </P>

        <H2>5. Acceptable use</H2>
        <P>
          You agree not to misuse the site — including attempting
          unauthorised access to any account or system, submitting false
          information, or using the site for any unlawful purpose.
        </P>

        <H2>6. Intellectual property</H2>
        <P>
          The content, design and branding of this site belong to{" "}
          {siteConfig.shortName} unless otherwise noted, and may not be
          reproduced without permission.
        </P>

        <H2>7. Third-party services</H2>
        <P>
          The site relies on third-party providers (including Supabase,
          Resend, and Google Sign-In) to operate. We are not responsible for
          outages or issues caused by these providers.
        </P>

        <H2>8. Limitation of liability</H2>
        <P>
          To the fullest extent permitted by law, {siteConfig.shortName} is
          not liable for any indirect or consequential loss arising from use
          of this website. Nothing in these terms limits liability that
          cannot be limited under applicable law. [Confirm final wording
          with legal counsel.]
        </P>

        <H2>9. Governing law</H2>
        <P>
          These terms are governed by the laws of India, and disputes are
          subject to the exclusive jurisdiction of the courts at Navi
          Mumbai, Maharashtra. [Confirm with legal counsel.]
        </P>

        <H2>10. Changes to these terms</H2>
        <P>
          We may update these terms from time to time. Continued use of the
          site after changes are posted constitutes acceptance of the
          updated terms.
        </P>

        <H2>11. Contact</H2>
        <P>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-gold-deep hover:underline">
            {siteConfig.contact.email}
          </a>
          .
        </P>
       </div>
      </Section>
    </>
  );
}
