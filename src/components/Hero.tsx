"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Hero — 1:1 из Figma (node 2235:93636), фрейм 1440×900. Чёрный блок
// 1440×716 — часть макета как есть (без изображения, ассет над ним в
// файле выключен/hidden). Reveal — простой fade-up (siteEase), та же
// анимационная инфраструктура, что и в предыдущем проекте (lib/gsap.ts) —
// "волна" зарезервирована под блок «Кейсы» (см. CasesList.tsx).
export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.12,
        ease: "siteEase",
        clearProps: "transform,opacity",
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="hero-reveal absolute left-0 top-0 h-[716px] w-[1440px] bg-[#121212]" />
      <p className="hero-reveal absolute left-[46px] top-[729px] whitespace-pre font-heading text-[52px] font-bold uppercase leading-[0] tracking-[1.56px] text-[#121212]">
        <span className="leading-[1.1]">ART-DIRECTOR </span>
        <span className="leading-[1.1] text-[#008cff]">&amp;</span>
        <span className="leading-[1.1]">
          {" "}
          <br />
          {/* Опечатка макета "COMUNICATION" исправлена на "COMMUNICATION"
              по явной просьбе пользователя. */}
          COMMUNICATION DESIGNER
        </span>
      </p>
      <div className="hero-reveal absolute left-[503.07px] top-[840.96px] h-[13.044px] w-[342.526px]">
        <img alt="" className="block size-full max-w-none" src="/hero/underline.svg" />
      </div>
    </div>
  );
}
