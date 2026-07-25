export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const startBusinessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Choose a business structure",
    description:
      "We help you evaluate proprietorship, partnership, LLP or private limited company based on your needs.",
  },
  {
    step: "02",
    title: "Name & incorporation",
    description:
      "Name approval and incorporation filings handled end-to-end for your chosen structure.",
  },
  {
    step: "03",
    title: "PAN, TAN & GST registration",
    description:
      "Registration for PAN, TAN and GST so you can start invoicing and transacting compliantly.",
  },
  {
    step: "04",
    title: "Bank account & compliance calendar",
    description:
      "Support opening a business bank account and setting up a compliance calendar for ongoing filings.",
  },
  {
    step: "05",
    title: "Ongoing support",
    description:
      "Once registered, we continue supporting accounting, tax and regulatory compliance as you grow.",
  },
];

export const complianceItems: ProcessStep[] = [
  {
    step: "01",
    title: "GST returns",
    description: "Periodic GST return filing and reconciliation.",
  },
  {
    step: "02",
    title: "TDS / TCS returns",
    description: "Quarterly TDS/TCS return filing and compliance.",
  },
  {
    step: "03",
    title: "ROC annual filings",
    description: "Annual returns and event-based filings with the Registrar of Companies.",
  },
  {
    step: "04",
    title: "PF / ESIC returns",
    description: "Periodic Provident Fund and ESIC return filing for employers.",
  },
  {
    step: "05",
    title: "Income tax & advance tax",
    description: "Annual income tax return filing and advance tax computation.",
  },
  {
    step: "06",
    title: "Statutory audits",
    description: "Annual statutory audit support as applicable to your entity.",
  },
];
