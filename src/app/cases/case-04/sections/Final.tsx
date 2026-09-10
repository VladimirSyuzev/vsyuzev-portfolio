"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";
import FullBleedScale from "@/components/FullBleedScale";

// 06 Финальный результат — 1:1 из Figma (node 2034:15810, высота 1265).
// Заголовок «06 ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» (32px), два абзаца, доодл-стрелка,
// финальный билборд (растр) и крупная мысль с доодлом-«шевроном».
//
// <1440 — 1:1 из reflow-фрейма «case-04 · 1280» (node 2742:18018, 1280×1148).
const A = "/cases/case-04/sections";

export default function Final() {
  const t = C4[useLang()];
  return (
    <>
      <div className="relative hidden h-[1265px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">06</p>
        <p className="text-[#121212]">{t.finalHeading}</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.finalPara1}
      </p>
      <p className="absolute left-[46px] top-[224px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.finalPara2}
      </p>

      {/* Доодл-стрелка (Figma node 2284:40011 → x906 / y169, 167×137). */}
      <Reveal variant="doodle" className="absolute left-[906px] top-[169px] z-10 h-[137px] w-[167px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/final-arrow.svg`} />
      </Reveal>

      {/* Финальный билборд (Figma frame 2206:44755 → x48 / y319, 1346×535). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute left-[48px] top-[319px] h-[535px] w-[1346px] object-cover"
        src={`${A}/final-billboard.jpg`}
      />

      {/* Доодл-«шеврон» (Figma node 2402:35708 → x46 / y993, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[46px] top-[993px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
      </Reveal>
      {/* Мысль (Figma node 2401:35703 → x726 / y1003, w633). */}
      <p className="absolute left-[726px] top-[1003px] w-[633px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        {t.finalQuote}
      </p>
      {/* Декоративная линия-подчёркивание под мыслью (Figma node 2439:54105).
          Наклонная линия 522×53; bbox фрейма (853.85/1088) занижен по
          высоте — из-за этого линия налезала на последнюю строку. Якорь по
          translate фонового rect экспорта: левый-верх SVG = точка секции
          (849, 1105.37); viewBox расширен на поля -5, поэтому −5/−5. */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 844, top: 1100, width: 532, height: 63 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full" src={`${A}/final-underline.svg`} />
      </Reveal>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node 2742:18018,
          1280×1148). Поток flex-col gap-64 px-40 py-72 + 2 абсолютных доодла. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1148} mode="grow" className="w-full">
          <div className="relative flex h-[1148px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Заголовок + 2 абзаца (40, 72), w-594. */}
            <div className="flex w-[594px] flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">06</span>
                <span className="text-[#121212]">{t.finalHeading}</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  {t.finalPara1}
                </p>
                <p>
                  {t.finalPara2}
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2742:18023, bg #ececec, 1200×470). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block h-[470px] w-[1200px] shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-1280.jpg`}
            />

            {/* Мысль + доодл-«шеврон вправо» (Frame 2147232085, py-64, gap 451). */}
            <div className="flex shrink-0 items-start gap-[451px] py-[64px]">
              <Reveal variant="doodle" className="h-[125px] w-[158px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/final-chevron-1280.png`} />
              </Reveal>
              <p className="w-[591px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
                {t.finalQuote}
              </p>
            </div>

            {/* Доодл-«стрелка» (Vector, 667.36/154.2, 93.786×72.845). */}
            <Reveal
              variant="doodle"
              className="absolute left-[667.36px] top-[154.2px] z-10 h-[72.845px] w-[93.786px]"
            >
              <div className="absolute inset-[-4.12%_-3.2%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/final-arrow-1280.svg`} />
              </div>
            </Reveal>

            {/* Подчёркивание под мыслью (Vector 234257394, 649/1016.29,
                478.434×28.047, inset -10.7%/-0.63%). */}
            <Reveal
              variant="line"
              start="top 92%"
              className="absolute left-[649px] top-[1016.29px] z-10 h-[28.047px] w-[478.434px]"
            >
              <div className="absolute inset-[-10.7%_-0.63%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/final-underline-1280.svg`} />
              </div>
            </Reveal>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2752:31849,
          834×1132). Поток flex-col gap-64 px-28 py-72. Проще 1280: НЕТ доодла-
          стрелки и НЕТ шеврона — только мысль в обводке-эллипсе по центру. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1132} mode="grow" className="w-full">
          <div className="relative flex h-[1132px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]">
            {/* Заголовок + 2 абзаца (Frame 2147232086, w-776, gap 12). */}
            <div className="flex w-[776px] flex-col gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">06</span>
                <span className="text-[#121212]">{t.finalHeading}</span>
              </div>
              <div className="flex w-[776px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p className="whitespace-pre-wrap">
                  {t.finalPara1}
                </p>
                <p>
                  {t.finalPara2}
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2818:36023, bg #ececec, 777×470). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block h-[470px] w-[777px] shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-834.jpg`}
            />

            {/* Мысль в обводке-эллипсе (Frame 2818:36026, py-64, center) —
                Vector 234257391 (2835:53381, центр, top-29.2, 513×183). */}
            <div className="relative flex w-[777px] shrink-0 items-center justify-center py-[64px]">
              <Reveal
                variant="line"
                start="top 92%"
                className="absolute left-1/2 top-[29.2px] h-[183px] w-[513px] -translate-x-1/2"
              >
                <div className="absolute inset-[-1.64%_-0.58%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/final-ellipse-834.svg`} />
                </div>
              </Reveal>
              <p className="relative w-[461px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70 [word-break:break-word]">
                {t.finalQuote}
              </p>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2762:4728,
          375×867.848). Поток flex-col gap-32 px-19 py-64 items-end. Мысль —
          БЕЗ обводки, тонкое подчёркивание (Vector 234257394). */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={867.848} mode="grow" className="w-full">
          <div className="relative flex h-[867.848px] w-[375px] flex-col items-end gap-[32px] overflow-clip bg-[#fafafa] px-[19px] py-[64px]">
            {/* Заголовок стопкой + 2 абзаца (Frame 2825:40983, w-335, gap 16). */}
            <div className="flex w-[335px] flex-col gap-[16px] [word-break:break-word]">
              <div className="flex flex-col font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">06</span>
                <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">{t.finalHeading}</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  {t.finalPara1}
                </p>
                <p>
                  {t.finalPara2}
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2825:40991, bg #ececec, 337×203.848). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block h-[203.848px] w-full shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-375.jpg`}
            />

            {/* Мысль + тонкое подчёркивание (Frame 2825:40990, pb-64, влево).
                Подчёркивание — В ПОТОКЕ сразу под текстом (Vector 234257394 /
                2835:53382), чтобы не отрывалось от него при иной вёрстке абзацев.
                pt-32 из макета убран по правке пользователя (зазор до мокапа
                был велик). */}
            <div className="flex w-[335px] shrink-0 flex-col items-start pb-[64px]">
              <p className="w-[335px] font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70 [word-break:break-word]">
                {t.finalQuote}
              </p>
              <Reveal
                variant="line"
                start="top 92%"
                className="relative mt-[9px] h-[12.31px] w-[335.747px] self-start"
              >
                <div className="absolute inset-[-24.36%_-0.89%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/final-underline-375.svg`} />
                </div>
              </Reveal>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
