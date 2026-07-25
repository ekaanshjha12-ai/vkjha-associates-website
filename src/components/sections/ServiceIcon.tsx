import {
  ShieldCheck,
  Calculator,
  Receipt,
  FileSignature,
  Building2,
  ReceiptText,
  IdCard,
  Users,
  HeartPulse,
  Store,
  Landmark,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/content/services";

const iconMap: Record<Service["icon"], LucideIcon> = {
  audit: ShieldCheck,
  accounting: Calculator,
  tax: Receipt,
  secretarial: FileSignature,
  registration: Building2,
  gst: ReceiptText,
  pan: IdCard,
  pf: Users,
  esic: HeartPulse,
  udyam: Store,
  roc: Landmark,
  litigation: Gavel,
};

export default function ServiceIcon({
  icon,
  size = 22,
  className,
}: {
  icon: Service["icon"];
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[icon];
  return <Icon size={size} className={className} />;
}
