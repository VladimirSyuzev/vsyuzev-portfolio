"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion, waveStagger } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import BalanceBoard1 from "./BalanceBoard1";
import BalanceBoard2 from "./BalanceBoard2";
import Reveal from "@/components/Reveal";

const R = "/cases/case-01/sections/reflow";

// 06 Контроль консистентности — тёмный full-bleed блок. На десктопе (≥1440)
// контент — абсолют 1:1 из Figma (node 1961:32477, высота 900). Ниже 1440 —
// поток в сетке: заголовок и текст на всю ширину, обе Balance Board (328px)
// в ряд/стопкой, рукописные доодлы скрыты.
export default function Consistency() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useCanvasWide();

  // «Волна» по каждой иконке обеих Balance Board — диагональный reveal.
  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const tw = gsap.from(".bb-icon", {
        opacity: 0,
        scale: 0.55,
        duration: 0.4,
        ease: "siteEase",
        stagger: waveStagger(5, 0.028),
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 68%", once: true },
      });
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { scope, dependencies: [reduced, wide] },
  );

  // <1440 — переверстка по макету 2559:11213: заголовок стопкой + интро,
  // 2 Balance Board стопкой, мысль-цитата по центру, тонкая линия у низа
  // (Vector 234257394). Доодла-«глаза» нет.
  if (!wide) {
    return (
      <section ref={scope} className="relative w-full overflow-clip bg-[#121212] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px]">
        <div className="flex flex-col gap-[32px] lg:gap-[64px]">
          {/* Frame 2147231952/…919/…914 — заголовок + интро, vertical gap 12 */}
          <div className="flex flex-col gap-[12px]">
            {/* 06 / КОНТРОЛЬ / КОНСИСТЕНТНОСТИ — стопкой. 375: Wix Bold 26 / ls 0.8 ·
                834/1280: 32 / lh 110 / ls 0.96 */}
            <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.8px] sm:text-[32px] sm:tracking-[0.96px]">
              <span className="text-[#008cff]">06</span>
              <span className="text-white">КОНТРОЛЬ</span>
              <span className="text-white">КОНСИСТЕНТНОСТИ</span>
            </div>
            {/* интро — Aeonik Regular 14/120%/ls0.28/op70. 375: w335, pre-wrap +
                двойные пробелы · 834: во всю ширину · 1280: w593 (Figma 2535:8971). */}
            <p className="w-[335px] max-w-full whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:w-full sm:whitespace-normal lg:w-[593px]">
              {"Чтобы новые иконки оставались частью  единой системы, мы использовали несколько инструментов проверки. Главным из них стал Balance Board: общая сетка, в которой существующие и новые иконки можно было сравнить между собой в одном контексте.  Это позволяло быстро оценить их визуальный вес, пропорции, толщину линий, характер скруглений и общий баланс библиотеки."}
            </p>
          </div>

          {/* Frame 2147231956/2539:9191 — 2 Balance Board (328×328).
              375: стопкой · 834: в ряд по центру, gap 12. */}
          <div className="flex flex-col gap-[12px] sm:flex-row sm:justify-center sm:gap-[12px]">
            <div className="size-[328px] max-w-full shrink-0 overflow-hidden">
              <BalanceBoard1 />
            </div>
            <div className="size-[328px] max-w-full shrink-0 overflow-hidden">
              <BalanceBoard2 />
            </div>
          </div>

          {/* Frame 2147231953/…915 — мысль-цитата, pad-y 32, текст ВЛЕВО.
              375: Wix Reg 22 / ls 0.6, w335, жёсткие <br> · 834: 28 / lh 110 /
              ls 0.96, w578, автоперенос (Figma 2558:9300).
              Линия-скетч Vector 234257394 — у низа блока. */}
          <div className="relative flex flex-col items-start py-[32px]">
            <p className="w-[335px] max-w-full whitespace-pre-wrap font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.6px] text-white opacity-70 sm:w-[578px] sm:whitespace-normal sm:text-[28px] sm:leading-[1.1] sm:tracking-[0.96px]">
              Balance Board{" "}
              <br className="sm:hidden" />
              помогал находить несоответствия{" "}
              <br className="sm:hidden" />
              и принимать решения ещё до передачи работы клиенту
            </p>
            {/* линия. 375: consistency-line-375.svg 332×24, bottom 20 / left 4 ·
                834: consistency-underline.svg 518×31 (Figma w518, наклон ~−2.7°
                уже в пути), left 30 / bottom 6. */}
            <Reveal
              variant="line"
              className="pointer-events-none absolute bottom-[20px] left-[4px] h-[24px] w-[332px] max-w-[calc(100%-4px)] sm:-bottom-[8px] sm:left-[30px] sm:h-[31px] sm:w-[518px] sm:max-w-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="block size-full sm:hidden" src={`${R}/consistency-line-375.svg`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="hidden size-full sm:block" src="/cases/case-01/sections/consistency-underline.svg" />
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={scope} className="w-full overflow-clip bg-[#121212]">
      <div className="mx-auto w-full max-w-[1440px] xl:relative xl:h-[900px]">
        <div className="flex flex-col gap-[28px] px-[var(--grid-margin)] py-[72px] xl:contents">
          {/* Заголовок стопкой: «06 / КОНТРОЛЬ / КОНСИСТЕНТНОСТИ». */}
          <div className="flex flex-col font-heading text-[26px] font-bold leading-[1.1] tracking-[0.96px] sm:text-[32px] xl:absolute xl:left-[46px] xl:top-[64px] xl:text-[32px]">
            <span className="whitespace-nowrap text-[#008cff]">06</span>
            <span className="text-white">КОНТРОЛЬ</span>
            <span className="text-white">КОНСИСТЕНТНОСТИ</span>
          </div>

          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-[668px] xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[668px]">
            Чтобы новые иконки оставались частью единой системы, мы использовали несколько
            инструментов проверки. Главным из них стал Balance Board: общая сетка, в которой
            существующие и новые иконки можно было сравнить между собой в одном контексте.{" "}
            <br className="hidden xl:inline" />
            Это позволяло быстро оценить их визуальный вес, пропорции, толщину линий, характер
            скруглений и общий баланс библиотеки.
          </p>

          {/* Balance Board — две доски 328×328. */}
          <div className="flex flex-wrap gap-[12px] xl:contents">
            <div className="size-[328px] shrink-0 overflow-hidden xl:absolute xl:left-[726px] xl:top-[389px]">
              <BalanceBoard1 />
            </div>
            <div className="size-[328px] shrink-0 overflow-hidden xl:absolute xl:left-[1066px] xl:top-[389px]">
              <BalanceBoard2 />
            </div>
          </div>

          {/* Крупная фраза (Wix Madefor Display Regular) с рукописным
              подчёркиванием — по левому краю на всех ширинах (по макетам). */}
          <div className="relative w-full sm:max-w-[578px] xl:absolute xl:left-[46px] xl:top-[581.98px] xl:w-[578.354px]">
            <p className="font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70 sm:text-[28px] xl:text-[32px]">
              Balance Board помогал находить несоответствия{" "}
              <br className="hidden xl:inline" />
              и принимать решения ещё{" "}
              <br className="hidden xl:inline" />
              до передачи работы клиенту
            </p>
            <Reveal
              variant="line"
              className="pointer-events-none absolute left-[8%] bottom-[-14px] h-[22px] w-[86%] xl:left-[106px] xl:bottom-auto xl:top-[141px] xl:h-[31px] xl:w-[518px]"
            >
              <img alt="" className="block size-full" src="/cases/case-01/sections/consistency-underline.svg" />
            </Reveal>
          </div>

          {/* Доодл-«глаз» — на всех ширинах: справа от вводного текста.
              ≥1440: 1:1 из Figma (instance 2359:4040, (1079.255, 134)). */}
          <Reveal
            variant="doodle"
            className="ml-auto flex h-[100px] w-[116px] items-center justify-center xl:absolute xl:left-[1079.255px] xl:top-[134px] xl:ml-0 xl:h-[155.398px] xl:w-[180.731px]"
          >
            <img alt="" className="block h-full w-full max-w-none object-contain" src="/cases/case-01/sections/consistency-eye-doodle.svg" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
