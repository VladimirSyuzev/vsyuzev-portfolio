"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// useBreakpoint — текущий режим сетки (см. RESPONSIVE.md). SSR-safe через
// useSyncExternalStore: getServerSnapshot всегда "desktop" (совпадает с
// сервером на этапе гидратации), настоящее значение приходит на клиенте
// первым же ре-рендером — тот же приём, что useReducedMotion в lib/gsap.
export type Breakpoint = "mobile" | "tabletP" | "tabletL" | "desktop";

// от большего к меньшему — берём первый сработавший
const QUERIES: readonly [Breakpoint, string][] = [
  ["desktop", "(min-width: 1440px)"],
  ["tabletL", "(min-width: 1024px)"],
  ["tabletP", "(min-width: 640px)"],
];

function current(): Breakpoint {
  for (const [bp, q] of QUERIES) {
    if (window.matchMedia(q).matches) return bp;
  }
  return "mobile";
}

// Общая подписка "что-то могло поменять ширину вьюпорта, перепроверь" —
// три независимых источника сигнала, а не один matchMedia("change"):
// в части окружений (эмуляция вьюпорта через CDP — devtools device
// toolbar, Playwright/автотесты) ни matchMedia("change"), ни обычный
// window "resize" не долетают синхронно с ресайзом — брейкпоинт залипает
// на старом значении без перезагрузки страницы. ResizeObserver на
// <html> реагирует на фактическое изменение layout-размера напрямую
// (через движок рендеринга, а не событийную систему) и в тех же
// окружениях срабатывает надёжно — используем его как подстраховку
// поверх двух остальных, а не вместо.
function watchViewport(onChange: () => void) {
  const mqls = QUERIES.map(([, q]) => window.matchMedia(q));
  mqls.forEach((m) => m.addEventListener("change", onChange));
  window.addEventListener("resize", onChange);
  const ro = new ResizeObserver(onChange);
  ro.observe(document.documentElement);
  return () => {
    mqls.forEach((m) => m.removeEventListener("change", onChange));
    window.removeEventListener("resize", onChange);
    ro.disconnect();
  };
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(watchViewport, current, () => "desktop");
}

// useMinWidth — matches `(min-width: {px}px)`, СТАРТ false (в отличие от
// useBreakpoint с getServerSnapshot 'desktop'). Для гейта GSAP-пинов и
// скрабов на фикс-холсте ≥1440: и на сервере, и на первом клиентском
// рендере анимации нет → useGSAP не отрабатывает лишний кадр (иначе иконка
// застревает в стартовом масштабе). См. RESPONSIVE.md.
export function useMinWidth(px: number) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    // См. watchViewport в useBreakpoint выше — та же тройная подстраховка
    // (matchMedia change + window resize + ResizeObserver) для живого
    // ресайза без reload.
    return watchViewport(on);
  }, [px]);
  return ok;
}

// Фикс-холст 1:1 из Figma (≥1440) — там живут пины/скрабы.
export function useCanvasWide() {
  return useMinWidth(1440);
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
