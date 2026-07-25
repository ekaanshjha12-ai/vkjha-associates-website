export type Service = {
  title: string;
  description: string;
  icon:
    | "audit"
    | "accounting"
    | "tax"
    | "secretarial"
    | "registration"
    | "gst"
    | "pan"
    | "pf"
    | "esic"
    | "udyam"
    | "roc"
    | "litigation";
};

export const services: Service[] = [
  {
    title: "Audit & Assurance",
    description:
      "Statutory, internal and tax audits carried out to applicable standards, giving stakeholders reliable, independently verified financial information.",
    icon: "audit",
  },
  {
    title: "Accounting & Advisory",
    description:
      "Book-keeping, financial statement preparation and advisory support to help management make informed financial decisions.",
    icon: "accounting",
  },
  {
    title: "Taxation",
    description:
      "Direct tax planning, return filing, advance tax computation and representation support for individuals, firms and companies.",
    icon: "tax",
  },
  {
    title: "Secretarial & Compliance",
    description:
      "Company Secretarial support including statutory registers, board/AGM compliance and corporate governance filings.",
    icon: "secretarial",
  },
  {
    title: "Company Registration",
    description:
      "End-to-end incorporation support for private limited companies, LLPs, partnerships and proprietorships.",
    icon: "registration",
  },
  {
    title: "GST",
    description:
      "GST registration, periodic return filing, reconciliation and advisory to keep indirect tax compliance on track.",
    icon: "gst",
  },
  {
    title: "PAN / TAN",
    description:
      "Application and correction support for Permanent Account Number and Tax Deduction Account Number.",
    icon: "pan",
  },
  {
    title: "PF",
    description:
      "Provident Fund registration and periodic return filing support for employers.",
    icon: "pf",
  },
  {
    title: "ESIC",
    description:
      "Employees' State Insurance registration and compliance filing support for eligible establishments.",
    icon: "esic",
  },
  {
    title: "Udyam Registration",
    description:
      "MSME/Udyam registration support to help eligible businesses access relevant benefits and schemes.",
    icon: "udyam",
  },
  {
    title: "ROC",
    description:
      "Registrar of Companies annual filings and event-based compliance for companies and LLPs.",
    icon: "roc",
  },
  {
    title: "Litigation & Advisory",
    description:
      "Support with notices, assessments and representation before tax and regulatory authorities.",
    icon: "litigation",
  },
];
