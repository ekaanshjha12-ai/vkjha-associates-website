"use client";

import dynamic from "next/dynamic";
import { Suspense, useSyncExternalStore } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

function StaticFallback() {
  return (
    <div className="h-full w-full bg-[radial-gradient(45%_60%_at_78%_45%,rgba(217,198,165,0.55)_0%,rgba(184,216,216,0.35)_55%,transparent_75%)]" />
  );
}

export default function HeroVisual() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (prefersReducedMotion) return <StaticFallback />;

  return (
    <Suspense fallback={<StaticFallback />}>
      <HeroScene />
    </Suspense>
  );
}
