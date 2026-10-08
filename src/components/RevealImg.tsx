"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { wipeFrom } from "@/lib/revealWipe";

// RevealImg — статичная картинка с тем же появлением по скроллу, что у
// <Reveal variant="fade"> (вытягивание сверху вниз, см. revealWipe), но БЕЗ
// обёртки: сам <img>, поэтому не ломает flex/grid/absolute-раскладку.
export default function RevealImg({
  delay = 0,
  start = "top 88%",
  alt,
  ...rest
}: { delay?: number; start?: string; alt: string } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt">) {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const tw = gsap.from(el, {
        ...wipeFrom(reduced),
        delay,
        immediateRender: false,
        scrollTrigger: { trigger: el, start, once: true },
        clearProps: "clipPath,opacity",
      });
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { dependencies: [reduced] },
  );

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} alt={alt} data-reveal {...rest} />;
}
