"use client";

import DrawIn from "@/components/DrawIn";
import { useCanvasWide, useMinWidth } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C1 } from "../i18n";

// 07 Итог.
// ≥1440 (node 1961:32637) — абсолют 1:1, доодлы на местах.
// 834 (node 2539:9197) — «07 ИТОГ» 108px в строку, 2 абзаца во всю ширину
// стопкой, композиция 3 iPhone (714×559, обрезана низом секции), доодл-искра.
// 375 (node 2559:11224) — поток: «07 ИТОГ» (44), 2 абзаца стопкой, композиция
// 3 iPhone (готовый PNG). Доодлов нет.
const A = "/cases/case-01/sections";
const R = "/cases/case-01/sections/reflow";

export default function Summary() {
  const wide = useCanvasWide();
  const sm = useMinWidth(640);
  const lang = useLang();
  const t = C1[lang];
  const PARA_1 = t.summaryPara1;
  const PARA_2 = t.summaryPara2;
  const PHONES_ALT = t.summaryPhonesAlt;

  // 834 — фикс-высота 1080, композиция телефонов упирается в низ секции.
  if (!wide && sm) {
    return (
      <section className="relative h-[1080px] w-full overflow-clip bg-[#fafafa] px-[28px] pt-[72px] lg:h-[1057px] lg:px-[40px]">
        {/* Frame 2147231920/2147231926 — заголовок + 2 абзаца, gap 32 */}
        <div className="flex flex-col gap-[32px]">
          {/* «07 ИТОГ» — 834: Wix Bold 108 / ls 2px · 1280: 166 / ls 3px, gap 24 */}
          <div className="flex items-start gap-[24px] whitespace-nowrap font-heading text-[108px] font-bold uppercase leading-[1.05] tracking-[2px] lg:text-[166px] lg:leading-none lg:tracking-[3px]">
            <span className="text-[#008cff]">07</span>
            <span className="text-[#121212]">{t.summaryHeading}</span>
          </div>
          {/* 2 абзаца — Aeonik Reg 14 / 120% / ls 0.28 / op 70.
              834: во всю ширину стопкой gap 12 · 1280: в ряд (w425 + w500, gap 181) */}
          <div className="relative flex flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] lg:flex-row lg:gap-[181px]">
            <p className="opacity-70 lg:w-[425px] lg:shrink-0">{PARA_1}</p>
            <p className="opacity-70 lg:w-[500px] lg:shrink-0">{PARA_2}</p>
            {/* 1280: дудл-шеврон »» между абзацами (Figma doodles @ x437 y267) */}
            <DrawIn
              src={`${R}/screen-doodle-834.svg`}
              fit="contain"
              className="pointer-events-none hidden lg:absolute lg:left-[397px] lg:top-[-5px] lg:block lg:h-[125px] lg:w-[158px]"
            />
          </div>
        </div>

        {/* Frame 2147231680 — 3 iPhone (714 шириной, уже обрезана низом секции).
            834: x60 / y521 · 1280: x283 / y529. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${R}/summary-phones-834.png`}
          alt={PHONES_ALT}
          className="absolute left-[60px] top-[521px] block w-[714px] max-w-none lg:left-[283px] lg:top-[529px]"
        />

        {/* Доодл-«искра» (Vector 234257349–351). 834: Figma 2559:10665 @ (666,381)
            rot 17.8 (CCW) → CSS −18°. 1280: Frame 2147231819 @ (947,449), rot ≈ 0. */}
        <DrawIn
          src={`${R}/summary-doodle-834.svg`}
          fit="contain"
          className="pointer-events-none absolute left-[666px] top-[381px] h-[125px] w-[158px] -rotate-[18deg] lg:left-[947px] lg:top-[449px] lg:rotate-0"
        />

        {/* 1280: вторая «искра» слева-внизу (Frame 2147231820 @ x97 y848,
            AABB 186×163, rot −15.45). Отдельный SVG — своя геометрия. */}
        <DrawIn
          src={`${R}/summary-doodle-bl.svg`}
          fit="contain"
          className="pointer-events-none hidden lg:absolute lg:left-[97px] lg:top-[848px] lg:block lg:h-[163px] lg:w-[186px]"
        />
      </section>
    );
  }

  if (!wide) {
    return (
      // Секция 13 — pad-top 64, боковые 20, СНИЗУ 0: композиция телефонов
      // упирается в низ секции (в макете 2559:11224 она обрезана краем секции).
      <section className="w-full bg-[#fafafa] px-[20px] pt-[64px]">
        <div className="flex flex-col gap-[56px]">
          {/* Frame 2147231955 — заголовок + 2 абзаца, vertical AL gap 12 (Figma 2559:21858) */}
          <div className="flex flex-col gap-[12px]">
            {/* h — flex row · gap 10 · Wix Bold 26 / ls 1 (375) */}
            <div className="flex items-start gap-[10px] whitespace-nowrap font-heading text-[26px] font-bold uppercase tracking-[1px]">
              <span className="leading-[1.05] text-[#008cff]">07</span>
              <span className="leading-[1.1] text-[#121212]">{t.summaryHeading}</span>
            </div>
            {/* Frame 2147231954 — 2 абзаца, vertical gap 12, w335 */}
            <div className="flex flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
              <p className="w-[335px] max-w-full opacity-70">{PARA_1}</p>
              <p className="w-[335px] max-w-full opacity-70">{PARA_2}</p>
            </div>
          </div>

          {/* Frame 2147231680 — композиция 3 iPhone (готовый PNG из макета, 335) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R}/summary-phones-375.png`}
            alt={PHONES_ALT}
            className="block w-[335px] max-w-full"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1160px] xl:w-[1440px] xl:overflow-clip">
      <div className="relative flex flex-col gap-[28px] px-[var(--grid-margin)] py-[72px] xl:contents">
        <div className="flex items-baseline gap-x-[14px] whitespace-nowrap font-heading text-[clamp(2.5rem,12vw,175px)] font-bold uppercase leading-[1.05] tracking-[0.02em] xl:absolute xl:left-[47.5px] xl:top-[143px] xl:gap-[24px] xl:tracking-[5.25px] xl:!text-[175px]">
          <p className="text-[#008cff]">07</p>
          <p className="text-[#121212]">{t.summaryHeading}</p>
        </div>

        <div className="flex flex-col gap-[24px] sm:flex-row sm:flex-wrap sm:gap-[40px] xl:contents">
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:max-w-[498px] xl:absolute xl:left-[46px] xl:top-[368px] xl:w-[498px]">
            {PARA_1}
          </p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:max-w-[498px] xl:absolute xl:left-[726px] xl:top-[368px] xl:w-[498px]">
            {PARA_2}
          </p>
        </div>

        {/* Композиция iPhone-мокапов (Figma frame 1961:32647, 714 wide). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/summary.jpg`}
          alt={PHONES_ALT}
          className="mx-auto w-full max-w-[714px] xl:absolute xl:left-[363px] xl:top-[645px] xl:mx-0"
        />

        {/* Доодл-«шеврон» — на всех ширинах. */}
        <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="pointer-events-none absolute right-[8%] top-[36%] z-10 hidden h-[56px] w-[70px] xl:left-[526px] xl:right-auto xl:top-[348px] xl:block xl:h-[125px] xl:w-[158px]"
          />
        <DrawIn
          src={`${A}/summary-doodle-1.svg`}
          fit="contain"
          className="pointer-events-none absolute bottom-[4%] left-[2%] hidden h-[96px] w-[110px] xl:left-[193.29px] xl:top-[972.12px] xl:block xl:h-[162.57px] xl:w-[185.58px]"
        />
        <DrawIn
          src={`${A}/summary-doodle-2.svg`}
          fit="contain"
          delay={0.1}
          className="pointer-events-none absolute right-[4%] top-[52%] hidden h-[70px] w-[88px] xl:left-[1025.94px] xl:right-auto xl:top-[555.02px] xl:block xl:h-[125.02px] xl:w-[158.02px]"
        />
      </div>
    </section>
  );
}
