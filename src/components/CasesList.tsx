"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, waveStagger } from "@/lib/gsap";
import { CASES } from "@/lib/cases-data";
import Case01IconGrid from "./Case01IconGrid";

// «кейсы» — 1:1 из Figma (node 2235:94070), фрейм 1440×1351. Reveal —
// «волна» (waveStagger, src/lib/gsap.ts), перенесённая как анимационная
// техника из «Новый проект 3.0» (единственное, что оттуда взято — по
// просьбе пользователя). Номер+заголовок каждой строки уложены в плоский
// массив cols=2 — антидиагональный wave по 5 строкам × 2 ячейки.
//
// Ссылка каждой строки — /cases/{slug}, привязана ПО СООТВЕТСТВИЮ
// названию кейса в макете (см. CASES, src/lib/cases-data.ts).
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
        stagger: waveStagger(2, 0.08),
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
    <div id="cases" ref={scope} className="relative h-[1351px] w-[1440px] overflow-clip bg-[#fafafa] scroll-mt-16">
      <p className="absolute left-[46px] top-[134px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        КЕЙСЫ
      </p>
      <div className="absolute left-[174px] top-[89px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src="/about/doodle-hooks.svg" />
      </div>

      <div className="absolute left-[216px] top-[318px] flex w-[1178px] flex-col items-start">
        {CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="flex w-full items-start justify-between border-b border-[rgba(18,18,18,0.7)]"
          >
            <div className="flex w-[510px] shrink-0 flex-col items-start overflow-clip">
              <div className="flex w-full shrink-0 flex-col items-start justify-center gap-[12px] py-[24px] pl-[12px]">
                <p className="case-wave-cell shrink-0 whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#008cff]">
                  {item.index}
                </p>
                <p className="case-wave-cell w-[321px] shrink-0 text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  {item.title}
                </p>
                {item.description && (
                  <p className="w-[453.865px] shrink-0 text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            {item.cover && <Case01IconGrid className="relative h-[536px] w-[668px] shrink-0 overflow-clip bg-[rgba(18,18,18,0.7)]" />}
          </Link>
        ))}
      </div>
    </div>
  );
}
