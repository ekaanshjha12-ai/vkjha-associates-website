export type Leader = {
  name: string;
  credentials: string;
  role: string;
  photo?: string;
  bio: string;
};

export const leaders: Leader[] = [
  {
    name: "Vidyakant Jha",
    credentials: "FCA, CS",
    role: "Partner",
    photo: "/images/leadership/vidyakant-jha.jpeg",
    bio: "Fellow Chartered Accountant and Company Secretary. Leads the firm's audit, taxation and compliance practice. Full profile details to be added.",
  },
  {
    name: "Rahul Jain",
    credentials: "FCA, CS",
    role: "Partner",
    bio: "Fellow Chartered Accountant and Company Secretary. Focuses on advisory, secretarial compliance and regulatory matters. Full profile details to be added.",
  },
  {
    name: "Sumit Bhansali",
    credentials: "FCA",
    role: "Partner",
    bio: "Fellow Chartered Accountant. Focuses on accounting, assurance and taxation engagements. Full profile details to be added.",
  },
];
