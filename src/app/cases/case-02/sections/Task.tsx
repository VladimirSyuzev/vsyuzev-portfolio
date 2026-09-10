"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Reveal from "@/components/Reveal";
import { gsap, useReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// 01 Задача — на десктопе (≥1200) абсолют 1:1 из Figma (node 2009:12098,
// высота 1539). Ниже 1200 — поток в сетке (см. RESPONSIVE.md): заголовок
// уменьшается, текст на всю ширину, иконки «до/после» в ряд, обводка-эллипс
// (рукописная) скрывается — остаётся центрированная итоговая мысль.
const A = "/cases/case-02/sections";

// TaskIcons — на 834/1280/1440 одно цельное движение (~0.7с, ease того же
// «почерка», что и весь сайт — siteEase), а не три раздельных шага с паузами:
// серый ключ коротко въезжает с левого края секции, а голубой ключ и стрелка
// в тот же момент лежат РОВНО в позиции серого ключа — полностью им
// перекрыты (z-index выше у серого ключа работает как «квадратная маска» его
// размера) — и одним движением уезжают на своё место, обнажаясь по пути,
// будто выезжают из-под него. Стрелка стартует на 80мс позже голубого ключа
// (короткий сдвиг, чтобы не читались как один дубль — не самостоятельная
// пауза, всё укладывается в одно ощущение движения).
//
// Точка «под серым ключом» замеряется ОДИН РАЗ в самом начале таймлайна
// (timeline.onStart, до того как серый ключ сам сдвинется трансформом) —
// иначе на 80мс-стрелке мы бы мерили уже частично уехавший серый ключ.
function TaskIcons() {
  const grayRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const gray = grayRef.current;
      const blue = blueRef.current;
      const arrow = arrowRef.current;
      if (!gray || !blue || !arrow) return;

      // Левый край секции — точка, откуда въезжает сам серый ключ (реальный
      // бокс на любом брейке, в отличие от строки-обёртки — на xl она
      // `xl:contents` и у display:contents элемента нет геометрии).
      const section = gray.closest("section");
      let grayRestLeft = 0;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: gray, start: "top 85%", once: true },
        onStart: () => {
          grayRestLeft = gray.getBoundingClientRect().left;
        },
        defaults: { duration: 0.7, ease: "siteEase", immediateRender: false, clearProps: "transform" },
      });
      tl.from(
        gray,
        { x: () => -(grayRestLeft - (section ?? gray).getBoundingClientRect().left) },
        0,
      )
        .from(blue, { x: () => -(blue.getBoundingClientRect().left - grayRestLeft) }, 0)
        .from(arrow, { x: () => -(arrow.getBoundingClientRect().left - grayRestLeft) }, 0.08);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <div className="hidden sm:flex sm:justify-center sm:gap-[12px] lg:gap-[58px] xl:contents">
      <div
        ref={grayRef}
        className="relative z-20 sm:order-1 aspect-square sm:w-[42%] sm:max-w-[399px] xl:absolute xl:left-[216px] xl:top-[592px] xl:z-20 xl:!w-[399px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full object-contain"
          src={`${A}/task-key-old.png`}
        />
      </div>
      <div
        ref={blueRef}
        className="sm:order-3 aspect-square sm:w-[42%] sm:max-w-[399px] xl:absolute xl:left-[825px] xl:top-[592px] xl:!w-[399px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full object-contain"
          src={`${A}/task-key-new.svg`}
        />
      </div>
      <div
        ref={arrowRef}
        className="sm:order-2 aspect-[99/63] w-[12%] max-w-[99px] shrink-0 xl:absolute xl:left-[673px] xl:top-[763px] xl:z-10 xl:!w-[99px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/arrow-right.svg`} />
      </div>
    </div>
  );
}

export default function Task() {
  const t = C2[useLang()];
  return (
    <section className="w-full overflow-x-clip bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1539px] xl:w-[1440px] xl:overflow-clip">
      {/* 1280 (Figma 2613:16467): gap 64, заголовок 152px (gap 24),
          интро 594, иконки 1008 по центру, цитата 594 / 32px. */}
      <div className="flex flex-col gap-[12px] px-[var(--grid-margin)] py-[64px] sm:gap-[64px] sm:py-[72px] xl:contents">
        {/* «01 Задача» — 375: Wix Bold 26 / leading-none / col-gap 12 (Figma 2640:38254).
            834: 100 · 1280: 152 · ≥1440: 175. */}
        <div className="flex flex-nowrap items-baseline gap-x-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none sm:gap-x-[18px] sm:!text-[100px] lg:gap-x-[24px] lg:!text-[152px] xl:absolute xl:left-[46px] xl:top-[143px] xl:gap-[24px] xl:tracking-[5.25px] xl:!text-[175px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">{t.taskHeading}</p>
        </div>

        <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:max-w-none lg:max-w-[594px] xl:absolute xl:left-[46px] xl:top-[368px] xl:w-[666px]">
          <p className="opacity-70">{t.taskPara1}</p>
          <p className="opacity-70">{t.taskPara2}</p>
        </div>

        {/* Иконки «до → после» — 375 (Figma 2637:30551): стопкой, стрелка вниз
            между иконками, без последовательной анимации. */}
        <div className="flex flex-col items-center gap-[24px] sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="w-full max-w-[335px]"
            src={`${A}/task-key-old.png`}
          />
          {/* 375: свой экспорт из Figma (2637:30554) — стрелка вниз реально
              рисуется как ГОРИЗОНТАЛЬНАЯ (96×61, тот же росчерк, что у
              arrow-right.svg) и в Figma просто повёрнута на 90°; поэтому
              картинку держим в родном размере и крутим сами, а не тянем
              size-full — иначе пропорции/размер плывут. */}
          <Reveal variant="doodle" className="flex w-[58px] shrink-0 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block w-[93px] max-w-none rotate-90" src={`${A}/reflow/task-arrow-375.svg`} />
          </Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="w-full max-w-[335px]"
            src={`${A}/task-key-new.svg`}
          />
        </div>

        {/* 834/1280/1440: серый ключ, голубой ключ и стрелка выезжают из
            ОДНОЙ точки слева (см. TaskIcons) — сначала серый ключ, потом
            голубой, потом стрелка. */}
        <TaskIcons />

        {/* Обводка-эллипс (рукописная) — только на десктопе. */}
        <Reveal
          variant="line"
          start="top 92%"
          className="hidden xl:absolute xl:block"
          style={{ left: 341, top: 1148, width: 760, height: 248 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full" src={`${A}/task-ellipse.svg`} />
        </Reveal>

        {/* 375: рукописная обводка облегает цитату — как в макете Figma
            (Vector 234257386, ≈104% ширины цитаты). Держим большой верхний
            отступ (pt-64), чтобы обводка не наезжала на голубой ключ выше.
            Размер в % от фактической высоты <p> (число строк «плавает»). */}
        <div className="pt-[64px] pb-[36px] sm:hidden">
          <div className="relative mx-auto w-[320px] max-w-full">
            <p className="relative z-10 text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.6px] text-[#121212] opacity-70">
              {t.taskQuote}
            </p>
            <Reveal
              variant="line"
              start="top 92%"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[calc(100%+64px)] w-[calc(100%+44px)] max-w-none -translate-x-1/2 -translate-y-1/2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="block size-full max-w-none object-fill" src={`${A}/reflow/task-ellipse-375.svg`} />
            </Reveal>
          </div>
        </div>

        {/* 834: +16.63° (bbox ≈581); 1280: та же обводка шире (649). */}
        <div className="relative hidden justify-center py-[44px] sm:flex lg:py-[64px] xl:contents">
          <p className="relative z-10 max-w-[589px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70 lg:max-w-[594px] lg:text-[32px] lg:tracking-[0.96px] xl:absolute xl:left-1/2 xl:top-[1205.63px] xl:w-[589px] xl:-translate-x-1/2 xl:text-[32px]">
            {t.taskQuote}
          </p>
          <Reveal
            variant="line"
            start="top 92%"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block xl:hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img aria-hidden alt="" className="block w-[624px] max-w-none rotate-[16.63deg] lg:w-[700px]" src={`${A}/reflow/task-ellipse-1280.svg`} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
