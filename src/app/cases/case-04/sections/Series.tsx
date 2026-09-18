"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

// 04 Серия сценариев — 1:1 из Figma (node 2034:15790, высота 1262).
// Заголовок «04 СЕРИЯ СЦЕНАРИЕВ» (32px), два абзаца, два KV-постера
// (автомобиль и яхта, растр), доодл-«шеврон» и крупная мысль в обводке.
//
// <1440 — 1:1 из reflow-фрейма «case-04 · 1280» (node 2740:17992, 1280×1181.5).
const A = "/cases/case-04/sections";

export default function Series() {
  const t = C4[useLang()];
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[1262px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-[#121212]">{t.seriesHeading}</p>
        </div>

        <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p>{t.seriesIntro1}</p>
          <p>{t.seriesIntro2}</p>
        </div>

        {/* Два KV-постера (Figma frames 2115:30599 / 2115:30938 → y318, 668×446). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.seriesCarAlt}
          className="absolute left-[46px] top-[318px] h-[446px] w-[668px] object-cover"
          src={`${A}/series-1.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.seriesYachtAlt}
          className="absolute left-[726px] top-[318px] h-[446px] w-[668px] object-cover"
          src={`${A}/series-2.jpg`}
        />

        {/* Доодл-«шеврон» (Figma node 2284:40000 → x641 / y764, 158×125). */}
        <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[641px] top-[764px] z-10 h-[125px] w-[158px]"
          />

        {/* Мысль (Figma node 2401:35697) + обводка-эллипс (2401:35698) —
            общая центрированная обёртка (раньше были независимыми
            элементами с фикс-координатами), эллипс в % от блока текста
            (244.3%/107.2%) — масштабируется вместе с текстом при другом
            числе строк (перевод на английский). */}
        <div className="absolute left-1/2 top-[1038px] w-[900px] -translate-x-1/2 -translate-y-1/2">
          <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
            {t.seriesQuote}
          </p>
          <DrawIn
            src={`${A}/series-ellipse.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[244.3%] w-[107.2%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали два 14px-абзаца внутри масштабируемого канваса — текст
          «плыл» вместе с холстом на промежуточных ширинах. Постеры/доодл/
          эллипс — как есть, без канваса, декор. */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#fafafa] sm:gap-[64px] xl:hidden">
        <div className="flex flex-col gap-[12px] px-[20px] pt-[64px] sm:px-[28px] sm:pt-[72px] lg:px-[40px] lg:pt-[72px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">04</span>
            <span className="text-[#121212]">{t.seriesHeading}</span>
          </div>
          <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 lg:w-[593px]">
            <p>{t.seriesIntro1}</p>
            <p>{t.seriesIntro2}</p>
          </div>
        </div>

        {/* Два KV-постера — рядом на 1280, стопкой на 834/375 (одинаковое
            соотношение сторон ~1.498 на всех тирах). */}
        <div className="flex w-full flex-col gap-[12px] px-[20px] sm:px-[28px] lg:flex-row lg:px-[40px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.seriesCarAlt} className="block aspect-[335/223.629] w-full object-cover sm:hidden" src={`${A}/series-1-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.seriesYachtAlt} className="block aspect-[335/223.629] w-full object-cover sm:hidden" src={`${A}/series-2-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.seriesCarAlt} className="hidden aspect-[778/519.353] w-full object-cover sm:block lg:aspect-[594/396.524] lg:w-[calc(50%-6px)]" src={`${A}/series-1-1280.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.seriesYachtAlt} className="hidden aspect-[778/519.353] w-full object-cover sm:block lg:aspect-[594/396.524] lg:w-[calc(50%-6px)]" src={`${A}/series-2-1280.jpg`} />
        </div>

        <DrawIn
          src={`${A}/chevron.svg`}
          fit="contain"
          className="h-[125px] w-[158px] shrink-0 self-center"
        />

        {/* Мысль + обводка-эллипс — эллипс в % от блока текста (не от
            холста), работает без изменений в резиновом flow. */}
        <div className="flex w-full justify-center px-[20px] pb-[64px] sm:px-[28px] sm:pb-[72px] lg:px-[40px] lg:pb-[72px]">
          <div className="relative w-[303px] max-w-full sm:w-[538px] lg:w-[626px]">
            <p className="relative z-10 text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70 sm:text-[28px] sm:leading-[1.1] sm:tracking-[0.84px] lg:text-[32px] lg:tracking-[0.96px]">
              {t.seriesQuote}
            </p>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[146.9%] w-[110.44%] -translate-x-1/2 -translate-y-1/2 sm:hidden">
              <DrawIn src={`${A}/series-ellipse-375.svg`} className="absolute inset-[-1.62%_-0.9%]" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[150.4%] w-[116.8%] -translate-x-1/2 -translate-y-1/2 sm:block lg:hidden">
              <DrawIn src={`${A}/series-ellipse-834.svg`} className="absolute inset-[-2.16%_-0.48%]" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[133%] w-[110.76%] -translate-x-1/2 -translate-y-1/2 lg:block">
              <DrawIn src={`${A}/series-ellipse-1280.svg`} className="absolute inset-[-2.14%_-0.43%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
