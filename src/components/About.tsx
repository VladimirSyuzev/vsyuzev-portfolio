"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { preventOrphans } from "@/lib/typography";

// About («О себе») — по макету: абзац био слева, портретное фото справа
// (плейсхолдер — ассет не экспортирован, FIGMA-BRIEF.md), ниже плашка
// клиентов. Список клиентов — из того, что читается на скриншоте;
// требует сверки крупным планом (см. бриф).
const CLIENTS = [
  "Яндекс Такси",
  "Яндекс 360",
  "Яндекс Облако",
  "Яндекс Афиша",
  "Яндекс Едадил",
  "Яндекс Про",
  "Wildberries",
  "МТС",
  "Т-Банк",
  "Skyeng",
  "Ozon",
  "Литрес",
];

export default function About() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".about-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "siteEase",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });
    },
    { scope }
  );

  return (
    <section
      id="about"
      ref={scope}
      className="grid-12 mx-auto scroll-mt-16 px-[var(--grid-margin)] py-16 sm:py-24"
    >
      <div className="about-reveal sm:col-span-2 sm:col-start-1">
        <h2 className="text-heading text-graphite">О себе</h2>
        <div className="dash" aria-hidden>–</div>
      </div>

      <div className="about-reveal mt-6 flex flex-col gap-8 sm:col-span-6 sm:col-start-3 sm:mt-0 sm:flex-row sm:items-start sm:gap-10">
        <p className="text-body-copy max-w-xl text-graphite">
          {preventOrphans(
            "Как арт-директор и коммуникационный дизайнер помогаю компаниям выстраивать визуальные системы, которые масштабируются без потери консистентности — от аудита существующей библиотеки до производственного процесса, по которому команда сдаёт результат стабильного качества."
          )}
        </p>
        {/* Плейсхолдер портрета — ассет не экспортирован из Figma */}
        <div
          className="aspect-[3/4] w-40 shrink-0 bg-plate sm:w-48"
          aria-hidden
        />
      </div>

      <div className="about-reveal mt-10 flex flex-wrap gap-2 sm:col-span-8 sm:col-start-3 sm:mt-16">
        {CLIENTS.map((client) => (
          <span
            key={client}
            className="text-label border border-line px-3 py-1.5 text-graphite"
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}
