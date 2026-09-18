"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

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
        {t.finalIntro1}
      </p>
      <p className="absolute left-[46px] top-[224px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {t.finalIntro2}
      </p>

      {/* Доодл-стрелка (Figma node 2284:40011 → x906 / y169, 167×137). */}
      <DrawIn
        src={`${A}/final-arrow.svg`}
        fit="contain"
        className="absolute left-[906px] top-[169px] z-10 h-[137px] w-[167px]"
      />

      {/* Финальный билборд (Figma frame 2206:44755 → x48 / y319, 1346×535). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.finalBillboardAlt}
        className="absolute left-[48px] top-[319px] h-[535px] w-[1346px] object-cover"
        src={`${A}/final-billboard.jpg`}
      />

      {/* Доодл-«шеврон» (Figma node 2402:35708 → x46 / y993, 158×125). */}
      <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[46px] top-[993px] z-10 h-[125px] w-[158px]"
          />
      {/* Мысль (Figma node 2401:35703 → x726 / y1003, w633) + декоративная
          линия-подчёркивание (2439:54105) — общая обёртка, линия привязана
          к НИЗУ текста (top-[calc(100%-9px)], не фикс-px 1100) — не
          оторвётся при другом числе строк (перевод на английский); гэп
          отрицательный (линия слегка налезает на текст) — так и в Figma. */}
      <div className="absolute left-[726px] top-[1003px] w-[633px]">
        <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          {t.finalQuote}
        </p>
        <DrawIn
          src={`${A}/final-underline.svg`}
          fit="contain"
          className="absolute"
          style={{ left: 118, top: "calc(100% - 9px)", width: 532, height: 63 }}
        />
      </div>
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали два 14px-абзаца внутри масштабируемого канваса — текст
          «плыл» вместе с холстом на промежуточных ширинах. Билборд/доодлы/
          эллипс — как есть, без канваса, декор. */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#fafafa] sm:gap-[64px] xl:hidden">
        <div className="relative flex flex-col gap-[12px] px-[20px] pt-[64px] sm:px-[28px] sm:pt-[72px] lg:px-[40px] lg:pt-[72px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">06</span>
            <span className="text-[#121212]">{t.finalHeading}</span>
          </div>
          <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 lg:w-[594px]">
            <p>{t.finalIntro1}</p>
            <p>{t.finalIntro2}</p>
          </div>
          {/* Доодл-«стрелка» — только 1280 (в 375/834 её нет в макете), сразу
              справа от текстовой колонки. */}
          <div className="pointer-events-none absolute left-[627px] top-[82px] z-10 hidden h-[72.845px] w-[93.786px] lg:block">
            <DrawIn src={`${A}/final-arrow-1280.svg`} fit="contain" className="absolute inset-[-4.12%_-3.2%]" />
          </div>
        </div>

        {/* Финальный билборд-мокап — свой файл/аспект на каждом тире. */}
        <div className="px-[20px] sm:px-[28px] lg:px-[40px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.finalBillboardAlt} className="block aspect-[337/203.848] w-full bg-[#ececec] object-cover sm:hidden" src={`${A}/final-billboard-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.finalBillboardAlt} className="hidden aspect-[777/470] w-full bg-[#ececec] object-cover sm:block lg:hidden" src={`${A}/final-billboard-834.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.finalBillboardAlt} className="hidden aspect-[1200/470] w-full bg-[#ececec] object-cover lg:block" src={`${A}/final-billboard-1280.jpg`} />
        </div>

        {/* Мысль. 1280 — шеврон слева + текст справа. 834 — центр в
            обводке-эллипсе. 375 — влево, тонкое подчёркивание в потоке. */}
        <div className="hidden shrink-0 items-start gap-[451px] px-[40px] py-[64px] lg:flex">
          <DrawIn
            src={`${A}/final-chevron.svg`}
            fit="contain"
            className="h-[125px] w-[158px] shrink-0"
          />
          <div className="relative w-[591px]">
            <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
              {t.finalQuote}
            </p>
            <div className="pointer-events-none absolute left-0 top-[calc(100%+4px)] z-10 h-[28.047px] w-[478.434px]">
              <DrawIn src={`${A}/final-underline-1280.svg`} className="absolute inset-[-10.7%_-0.63%]" />
            </div>
          </div>
        </div>

        <div className="relative hidden w-full items-center justify-center px-[28px] py-[64px] sm:flex lg:hidden">
          <div className="relative w-[461px] max-w-full">
            <p className="relative z-10 text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70 [word-break:break-word]">
              {t.finalQuote}
            </p>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[148.6%] w-[111.28%] -translate-x-1/2 -translate-y-1/2">
              <DrawIn src={`${A}/final-ellipse-834.svg`} className="absolute inset-[-1.64%_-0.58%]" />
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start px-[20px] pb-[64px] sm:hidden">
          <p className="w-full font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70 [word-break:break-word]">
            {t.finalQuote}
          </p>
          <div className="relative mt-[9px] h-[12.31px] w-[335.747px] max-w-full self-start">
            <DrawIn src={`${A}/final-underline-375.svg`} className="absolute inset-[-24.36%_-0.89%]" />
          </div>
        </div>
      </div>
    </>
  );
}
