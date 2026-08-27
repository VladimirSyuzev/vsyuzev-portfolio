"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, waveStagger } from "@/lib/gsap";
import { preventOrphans } from "@/lib/typography";
import { CASES } from "@/lib/cases-data";

// Блок «Кейсы» — reveal построен на «волне» (waveStagger, src/lib/gsap.ts),
// перенесённой из «Новый проект 3.0» (см. FIGMA-BRIEF.md §2/§5, память
// пользователя "feedback_wave_animation"). Там волна была придумана для
// сетки ячеек таблицы аудита; здесь настоящей 2D-сетки нет (список из 5
// строк), поэтому три под-элемента КАЖДОЙ строки (номер / название / год)
// уложены в один плоский ряд-major массив cols=3, rows=5 — получается
// самая настоящая антидиагональная сетка (номер 001 → название 001 +
// номер 002 → ... ), а не просто "переименованный" построчный stagger.
//
// Ссылка каждой строки — /cases/{slug}, slug подобран ПО СООТВЕТСТВИЮ
// названию кейса в Figma-макете (см. CASES, src/lib/cases-data.ts),
// не по порядку — так ссылка не потеряется, если порядок кейсов в
// макете когда-нибудь поменяют местами.
export default function CasesList() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cells = gsap.utils.toArray<HTMLElement>(".case-wave-cell", scope.current);
      gsap.from(cells, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "siteEase",
        stagger: waveStagger(3, 0.06),
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
        },
      });
    },
    { scope }
  );

  return (
    <section id="cases" ref={scope} className="grid-12 mx-auto scroll-mt-16 px-[var(--grid-margin)] py-16 sm:py-24">
      <div className="sm:col-span-2 sm:col-start-1">
        <h2 className="text-heading text-graphite">Кейсы</h2>
        <div className="dash" aria-hidden>–</div>
      </div>

      <div className="mt-6 border-t border-line sm:col-span-8 sm:col-start-3 sm:mt-0">
        {CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="group block border-b border-line py-4 sm:py-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-heading flex min-w-0 items-baseline gap-3 sm:gap-6">
                <span className="case-wave-cell text-rust shrink-0">{item.index}</span>
                <span className="case-wave-cell truncate">{preventOrphans(item.title)}</span>
              </span>
              <span className="case-wave-cell text-label shrink-0 text-graphite">{item.client}</span>
            </div>

            <div className="case-row-reveal grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-bounce)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="text-body-copy mt-4 max-w-md text-graphite">
                  {preventOrphans(item.description)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
