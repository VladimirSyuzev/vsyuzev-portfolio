"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Hero — по макету: тёмный full-bleed блок сверху (в Figma там пусто/под
// будущее видео или крупный кадр — ассет ещё не экспортирован, см.
// FIGMA-BRIEF.md TODO), под ним крупный заголовок «ART-DIRECTOR &
// COMMUNICATION DESIGNER» с акцентным синим подчёркиванием ("волна" здесь
// не используется — reveal этой секции простой fade-up, тот же приём,
// что у Hero/About в «Новый проект 3.0»; "волна" зарезервирована под
// блок «Кейсы», см. CasesList.tsx).
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
    <section id="top" ref={scope} className="flex flex-col">
      {/* Плейсхолдер тёмного hero-блока — в макете здесь, вероятно, видео
          или крупный кадр; ассет не экспортирован (FIGMA-BRIEF.md). */}
      <div
        className="hero-reveal flex h-[45vh] min-h-[320px] w-full items-end justify-start bg-foreground px-[var(--grid-margin)] py-6"
        aria-hidden
      >
        <span className="text-label text-background/40">hero — ассет ожидается</span>
      </div>

      <div className="grid-12 mx-auto px-[var(--grid-margin)] py-16 sm:py-24">
        <div className="hero-reveal sm:col-span-10 sm:col-start-1">
          <h1 className="text-hero uppercase text-foreground">
            Art-Director &amp;
            <br />
            Communication <span className="text-rust">Designer</span>
          </h1>
          <div className="mt-4 h-[3px] w-24 bg-rust" aria-hidden />
        </div>
      </div>
    </section>
  );
}
