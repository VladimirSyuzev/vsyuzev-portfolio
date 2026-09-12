"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";
import IconWallPulse from "./IconWallPulse";

const A = "/cases/case-02/sections";

// Клиентская часть «06 Итог» — весь реальный текст/переводы. Сама секция
// (Summary.tsx) остаётся async server component: читает SVG стены иконок
// с диска (readFile) и передаёт готовую разметку сюда пропсами.
export default function SummaryContent({
  iconWall,
  iconWall375,
}: {
  iconWall: string;
  iconWall375: string;
}) {
  const t = C2[useLang()];

  return (
    <section className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1446px] xl:w-[1440px] xl:overflow-clip">
      {/* 375: заголовок→текст gap 12 (Figma 2646:39991). 1280: gap 64, заголовок 152px,
          тексты — левая колонка 289, отступ 317, затем две колонки по 291 (gap 12). */}
      <div className="flex flex-col gap-[12px] px-[var(--grid-margin)] py-[72px] sm:gap-[24px] lg:gap-[64px] xl:contents">
        {/* «06 Итог» — 375: Wix Bold 26 / leading-none / col-gap 10. 834: 100 · 1280: 152 · ≥1440: 175. */}
        <div className="flex flex-row items-baseline gap-[10px] font-heading text-[26px] font-bold uppercase leading-none sm:gap-[18px] sm:!text-[100px] lg:gap-[24px] lg:!text-[152px] xl:absolute xl:left-[46px] xl:top-[152px] xl:flex-col xl:gap-0 xl:tracking-[5.25px] xl:!text-[175px]">
          <span className="text-[#008cff]">06</span>
          <span className="text-[#121212]">{t.summaryHeading}</span>
        </div>

        {/* 375 (Figma 2633:4713): один столбец, gap 24 — абзац, затем блок из
            двух абзацев (gap 6). 834: два столбца — левый абзац 383, правый
            блок 366 (gap 12 между ними). 1280 — три абзаца в ряд. */}
        <div className="relative flex flex-col gap-[24px] sm:flex-row sm:justify-between sm:gap-[12px] lg:flex-nowrap lg:justify-start lg:gap-x-[12px] xl:contents">
          {/* Доодл «»» (2637:30758) — 834: бокс 158×125 @ (−43, +34) от верха
              текст-ряда (Figma y166 vs текст y132); чернила стрелок с отступом
              ~40/30 → визуально под левым абзацем, уходят в левое поле.
              1280: между левой колонкой и правым блоком. */}
          <DrawIn
            src={`${A}/summary-doodle.svg`}
            fit="contain"
            className="pointer-events-none absolute hidden sm:left-[-43px] sm:top-[34px] sm:block sm:h-[125px] sm:w-[158px] lg:left-[264px] lg:top-[-38px] xl:hidden"
          />
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 sm:w-[383px] sm:shrink-0 lg:mr-[317px] lg:w-[289px] lg:shrink-0 xl:absolute xl:left-[46px] xl:top-[592px] xl:w-[326px]">
            {t.summaryPara1}
          </p>
          <div className="flex flex-col gap-[6px] sm:w-[366px] sm:shrink-0 lg:contents">
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 lg:w-[291px] lg:shrink-0 xl:absolute xl:left-[726px] xl:top-[592px] xl:w-[314px]">
              {t.summaryPara2}
            </p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 lg:w-[291px] lg:shrink-0 xl:absolute xl:left-[1066px] xl:top-[592px] xl:w-[328px]">
              {t.summaryPara3}
            </p>
          </div>
        </div>

        {/* Доодл «»»» — десктоп. */}
        <DrawIn
          src={`${A}/summary-doodle.svg`}
          fit="contain"
          className="hidden xl:absolute xl:left-[343px] xl:top-[560px] xl:block xl:h-[125px] xl:w-[158px]"
        />

        {/* Ковёр иконок — светло-серый #CCC (собственный цвет ассета) на всех
            размерах. Две раскладки: 375 (35 плиток, 5×7, экспорт из Figma
            2646:39849) и 834+ (36 плиток, 9 в ряд); переключаются по брейку,
            волну на каждой гоняет IconWallPulse независимо (data-cols). */}
        <div
          className="summary-wall block w-full [&_svg]:block [&_svg]:size-full sm:hidden"
          style={{ aspectRatio: "335 / 472" }}
          data-cols={5}
          role="img"
          aria-label={t.iconWallAlt}
          dangerouslySetInnerHTML={{ __html: iconWall375 }}
        />
        <div
          className="summary-wall hidden aspect-[1348/591] w-full [&_svg]:block [&_svg]:size-full sm:block sm:aspect-[778/341] lg:aspect-[1200/525] xl:absolute xl:left-[46px] xl:top-[729px] xl:aspect-auto xl:h-[591px] xl:w-[1348px]"
          data-cols={9}
          role="img"
          aria-label={t.iconWallAlt}
          dangerouslySetInnerHTML={{ __html: iconWall }}
        />
      </div>
      <IconWallPulse />
    </section>
  );
}
