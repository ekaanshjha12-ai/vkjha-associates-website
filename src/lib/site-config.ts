export const siteConfig = {
  name: "V K Jha & Associates",
  shortName: "VK Jha & Associates",
  tagline: "Chartered Accountants you can build a business on",
  description:
    "V K Jha & Associates is a Chartered Accountancy firm offering audit & assurance, taxation, GST, company registration, secretarial and litigation support.",
  url: "https://vkjhaassociates.com",
  contact: {
    addressLines: [
      "710, Commodity Exchange",
      "Plot 3 & 4, Sector 19A",
      "Vashi, Navi Mumbai - 400703",
    ],
    phone: "+91 99304 31831",
    phoneRaw: "9930431831",
    email: "info@vkjhaassociates.com",
    enquiryEmail: "adminhub@vkjhaassociates.com",
  },
};

export type NavLink = {
  label: string;
  href: string;
};

// Flat list of every public page — used for the footer and the sitemap.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Start Your Business", href: "/start-your-business" },
  { label: "Ongoing Compliance", href: "/ongoing-compliance" },
  { label: "Notices & Litigation", href: "/notices-litigation" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export type NavEntry =
  | ({ kind: "link" } & NavLink)
  | { kind: "dropdown"; label: string; items: NavLink[] };

// Structure used by the header — groups related pages under one dropdown.
export const mainNav: NavEntry[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "link", label: "About", href: "/about" },
  { kind: "link", label: "Leadership", href: "/leadership" },
  { kind: "link", label: "Industries", href: "/industries" },
  { kind: "link", label: "Services", href: "/services" },
  {
    kind: "dropdown",
    label: "Business Journey",
    items: [
      { label: "Start Your Business", href: "/start-your-business" },
      { label: "Ongoing Compliance", href: "/ongoing-compliance" },
      { label: "Notices & Litigation", href: "/notices-litigation" },
    ],
  },
  { kind: "link", label: "Testimonials", href: "/testimonials" },
  { kind: "link", label: "FAQs", href: "/faqs" },
  { kind: "link", label: "Contact", href: "/contact" },
];

// Legal pages — footer + sitemap only, not part of the main nav.
export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
