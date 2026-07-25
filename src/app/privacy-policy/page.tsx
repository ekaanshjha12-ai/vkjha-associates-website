import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import LegalDisclaimer from "@/components/legal/LegalDisclaimer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.shortName}.`,
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Placeholder — last updated [DATE]. Replace this date once reviewed and published."
      />
      <Section className="pt-4">
       <div className="mx-auto max-w-3xl">
        <LegalDisclaimer />

        <H2>1. Who we are</H2>
        <P>
          {siteConfig.shortName} ({siteConfig.contact.addressLines.join(", ")})
          operates this website and the client portal available on it. This
          policy explains what personal data we collect through the site,
          why we collect it, and how it is handled.
        </P>

        <H2>2. Information we collect</H2>
        <P>
          <strong>Contact form:</strong> full name, email address, phone
          number, company name (optional), the purpose of your enquiry, and
          your message. We also log the submitting device&apos;s IP address
          and user agent for spam and security purposes.
        </P>
        <P>
          <strong>Account and bookings:</strong> if you create a client
          account, we collect your name and email address (and, if you sign
          in with Google, the name and email associated with that Google
          account). When you book a consultation, we additionally collect
          your phone number, company name (optional), the service you are
          enquiring about, your preferred date/time, meeting mode, and any
          notes you provide.
        </P>
        <P>
          <strong>Technical data:</strong> standard web server logs and
          authentication cookies required to keep you signed in.
        </P>

        <H2>3. How we use this information</H2>
        <P>
          We use the information above to respond to enquiries, manage and
          confirm consultations, deliver the professional services you
          engage us for, maintain records we are required to keep, and
          operate and secure the website and client portal.
        </P>

        <H2>4. Who we share it with</H2>
        <P>
          We use the following third-party service providers to operate this
          site, each of which processes data on our behalf under their own
          security and privacy terms:
        </P>
        <P>
          <strong>Supabase</strong> — database hosting, authentication and
          storage for account and booking data.{" "}
          <strong>Resend</strong> — delivery of transactional emails (e.g.
          enquiry notifications).{" "}
          <strong>Google</strong> — only if you choose to sign in with
          Google, to authenticate your account.
        </P>
        <P>
          We do not sell personal data, and we do not share it with third
          parties for their own marketing purposes.
        </P>

        <H2>5. Data retention</H2>
        <P>
          We retain personal data for as long as needed to provide the
          services requested and to meet applicable legal, regulatory and
          record-keeping obligations relevant to professional accountancy
          services. [Confirm specific retention periods with legal counsel.]
        </P>

        <H2>6. Your rights</H2>
        <P>
          You may request access to, correction of, or deletion of your
          personal data by emailing{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-gold-deep hover:underline">
            {siteConfig.contact.email}
          </a>
          . We will respond within a reasonable time, subject to any
          information we are legally required to retain.
        </P>

        <H2>7. Cookies</H2>
        <P>
          The client portal uses strictly necessary cookies to keep you
          signed in. We do not currently use analytics or advertising
          cookies; if that changes, this policy and an appropriate consent
          mechanism will be updated accordingly.
        </P>

        <H2>8. Security</H2>
        <P>
          We use reasonable technical and organisational measures, including
          encrypted connections and access controls, to protect personal
          data. No method of transmission or storage is completely secure.
        </P>

        <H2>9. Children</H2>
        <P>This site is not directed at children and is intended for business and professional use.</P>

        <H2>10. Changes to this policy</H2>
        <P>
          We may update this policy from time to time. Material changes will
          be reflected by updating the date at the top of this page.
        </P>

        <H2>11. Contact</H2>
        <P>
          Questions about this policy can be sent to{" "}
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
