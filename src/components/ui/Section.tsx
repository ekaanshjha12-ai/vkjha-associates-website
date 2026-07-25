import type { ReactNode } from "react";
import clsx from "clsx";

export default function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("mx-auto max-w-6xl px-6 py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
