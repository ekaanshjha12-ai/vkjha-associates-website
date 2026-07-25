import type { ReactNode } from "react";
import clsx from "clsx";

export default function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "glass rounded-3xl p-6 shadow-[0_8px_30px_rgba(31,42,46,0.06)] transition-transform duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
