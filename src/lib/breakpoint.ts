"use client";

import { useSyncExternalStore } from "react";

// useBreakpoint — текущий режим сетки (см. RESPONSIVE.md). SSR-safe через
// useSyncExternalStore: getServerSnapshot всегда "desktop" (совпадает с
// сервером на этапе гидратации), настоящее значение приходит на клиенте
// первым же ре-рендером — тот же приём, что useReducedMotion в lib/gsap.
export type Breakpoint = "mobile" | "tabletP" | "tabletL" | "desktop";

// от большего к меньшему — берём первый сработавший
const QUERIES: readonly [Breakpoint, string][] = [
  ["desktop", "(min-width: 1200px)"],
  ["tabletL", "(min-width: 1024px)"],
  ["tabletP", "(min-width: 640px)"],
];

function current(): Breakpoint {
  for (const [bp, q] of QUERIES) {
    if (window.matchMedia(q).matches) return bp;
  }
  return "mobile";
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(
    (onChange) => {
      const mqls = QUERIES.map(([, q]) => window.matchMedia(q));
      mqls.forEach((m) => m.addEventListener("change", onChange));
      return () => mqls.forEach((m) => m.removeEventListener("change", onChange));
    },
    current,
    () => "desktop",
  );
}

// Удобные производные — тоже SSR-safe.
export function useIsMobile() {
  return useBreakpoint() === "mobile";
}
export function useIsTablet() {
  const bp = useBreakpoint();
  return bp === "tabletP" || bp === "tabletL";
}
export function useIsDesktop() {
  return useBreakpoint() === "desktop";
}
