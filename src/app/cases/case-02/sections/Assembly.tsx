"use client";

import RevealImg from "@/components/RevealImg";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// Блок 7 «06 Сборка» — тёмный full-bleed. 1:1 из Figma: 1440 = 3330:24773
// (высота 1013), 1280 = 3644:87528 (873), 834 = 3644:88152 (868), 375 =
// 3645:91696 (1452). Заголовок 32px (375 — 26), два абзаца (имена слотов —
// синим Medium), под ними три группы готовых постов 3:4 / 1:1 / 3:2 (каждая
// группа — цельный экспорт «подпись + сетка 3×3»). ≥1024 — в один ряд, <1024
// на 834 — тот же ряд, уменьшенный (246/245/269 против 316/314/345); на 375 —
// стопкой по центру.
const A = "/cases/case-02/assembly";

export default function Assembly() {
  const t = C2[useLang()];
  const groups = [
    { src: "posts-34.webp", alt: t.asmAlt34, w: 316, h: 408.34, sw: 246.09 },
    { src: "posts-11.webp", alt: t.asmAlt11, w: 314, h: 334.02, sw: 244.54 },
    { src: "posts-32.webp", alt: t.asmAlt32, w: 345, h: 257.91, sw: 268.68 },
  ];

  return (
    <section className="relative w-full overflow-x-clip bg-[#121212] shadow-[0_-1px_0_#121212]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-[32px] px-[20px] pb-[64px] pt-[65px] sm:gap-[64px] sm:px-[28px] sm:pb-[72px] sm:pt-[73px] lg:px-[40px] lg:pt-[72px] xl:block xl:h-[1013px] xl:p-0">
        {/* Заголовок + два абзаца */}
        <div className="flex flex-col gap-[12px] sm:gap-[12px] lg:h-[132px] lg:gap-[0px] xl:contents">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[134px]">
            <span className="text-[#008cff]">06</span>
            <span className="text-white">{t.asmHeading}</span>
          </div>
          <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 max-sm:mt-[2px] sm:mt-[0px] lg:mt-[12px] lg:flex-row lg:gap-[12px] xl:absolute xl:left-[46px] xl:top-[182px] xl:mt-0 xl:w-[1348px] xl:gap-[20px]">
            <p className="lg:w-[594px] xl:w-[662px]">
              {t.asmIntro1Pre}
              {t.asmSlots.map((s, i) => (
                <span key={s}>
                  <span className="font-medium text-[#008cff]">{s}</span>
                  {i < t.asmSlots.length - 1 ? ", " : ""}
                </span>
              ))}
              {t.asmIntro1Post}
            </p>
            <p className="lg:w-[596px] xl:w-[666px]">{t.asmIntro2}</p>
          </div>
        </div>

        {/* Три группы постов: 375 — стопкой, 834/1024+ — рядом */}
        <div className="flex flex-col items-center gap-[9.35px] pb-[62px] pt-[64px] sm:flex-row sm:items-start sm:justify-center sm:gap-[9.35px] sm:pb-[74px] sm:pt-[63px] lg:justify-start lg:gap-[12px] lg:pb-[63px] lg:pl-[91px] lg:pt-[62px] xl:pl-0 xl:absolute xl:left-[220.08px] xl:top-[442px] xl:items-start xl:justify-start xl:py-0">
          {groups.map((g, i) => (
            <RevealImg
              key={g.src}
              delay={i * 0.06}
              alt={g.alt}
              src={`${A}/${g.src}`}
              draggable={false}
              className="block h-auto w-[var(--sw)] max-w-none shrink-0 lg:w-[var(--w)]"
              style={
                {
                  "--w": `${g.w}px`,
                  "--sw": `${g.sw}px`,
                  aspectRatio: `${g.w} / ${g.h}`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
