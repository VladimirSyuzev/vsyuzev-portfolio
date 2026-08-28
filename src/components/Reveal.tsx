"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";

// Reveal — обёртка появления по скроллу (once). Единый «почерк» для
// декоративных элементов сайта (см. философию Emil Kowalski: ease-out,
// «ничто не появляется из scale 0» — минимум scale 0.86 + opacity).
//
// variant:
//  - "line"   : клип-вайп слева направо (clip-path inset) — для линий-
//               подчёркиваний и рукописных обводок (визуально «рисуется»)
//  - "doodle" : fade + scale 0.86→1 + доводка поворота (−5°→0) — для
//               рукописных значков-каракулей (звезда, стрелка, глаз и т.п.)
//  - "fade"   : fade + сдвиг снизу (по умолчанию)
//  - "fade-left": fade + сдвиг слева
export type RevealVariant = "line" | "doodle" | "fade" | "fade-left";

export default function Reveal({
  variant = "fade",
  delay = 0,
  start = "top 88%",
  className,
  style,
  children,
}: {
  variant?: RevealVariant;
  delay?: number;
  start?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (reduced || !el) return;

      const from: gsap.TweenVars = {};
      let duration = 0.55;
      let ease = "siteEase";

      if (variant === "line") {
        from.clipPath = "inset(0 100% 0 0)";
        duration = 0.8;
        ease = "power2.out";
      } else if (variant === "doodle") {
        Object.assign(from, { opacity: 0, scale: 0.86, rotate: -5 });
        duration = 0.6;
      } else if (variant === "fade-left") {
        Object.assign(from, { opacity: 0, xPercent: -10 });
      } else {
        Object.assign(from, { opacity: 0, y: 14 });
      }

      const tw = gsap.from(el, {
        ...from,
        delay,
        duration,
        ease,
        scrollTrigger: { trigger: el, start, once: true },
        clearProps: "clipPath,transform,opacity",
      });

      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
