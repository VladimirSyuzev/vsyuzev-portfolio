"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";
import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761). Заголовок
// 32px, два абзаца слева, итоговая мысль с подчёркиванием.
//
// Иконка (Figma node 2009:12797, left 726 / top 318, 640×640) — два слоя:
// чёрный контур финальной версии 600×600 (статичен) и голубая 16px-версия,
// которая растёт с 16 до 640.
//
// Анимация (ТЗ пользователя):
//  1) блок доходит до якорной точки (top top) и закрепляется;
//  2) дальше прокрутка «тратится» на рост иконки (scrub), 16 → 640,
//     прозрачность 100 → 80 %;
//  3) конечное состояние ЛАТЧИТСЯ — при скролле назад иконка не
//     уменьшается, состояние держится до перезагрузки страницы;
//  4) после этого пин отпускает, страница скроллится дальше.
//
// Ниже 1200 (планшет/мобайл, см. RESPONSIVE.md) пин отключён: контент —
// статичный поток в сетке, иконка сразу в финальном размере.
const A = "/cases/case-02/sections";

const RENDER_SIZE = 640;
const SCALE_START = 16 / RENDER_SIZE;
const OPACITY_START = 1;
const OPACITY_END = 0.8;

// Холст ≥1440 — 1200px (xl:h-[1200px] на pinRef); запас на скраб — ещё
// SCRUB_PX (итого xl:h-[2200px] на wrapRef).
const SCRUB_PX = 1000; // прокрутка на анимацию роста (больше = медленнее)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// easeInOutCubic — сильнее встроенной ease-in-out
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function First16px() {
  const lang = useLang();
  const t = C2[lang];
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLImageElement>(null);
  const latch = useRef(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = blueRef.current;
      if (!el) return;

      const render = (p: number) => {
        const e = easeInOut(p);
        el.style.transform = `scale(${lerp(SCALE_START, 1, e)})`;
        el.style.opacity = `${lerp(OPACITY_START, OPACITY_END, e)}`;
      };

      const settle = () => {
        el.style.transform = "scale(1)";
        el.style.opacity = `${OPACITY_END}`;
      };

      // Планшет/мобайл/reduced-motion — иконка сразу в финальном размере,
      // никакого пина.
      settle();
      if (reduced) return;

      // Пин + скраб роста иконки — ТОЛЬКО на фикс-холсте ≥1440 (RESPONSIVE.md).
      // gsap.matchMedia сам создаёт и РЕВЁРТИТ пин (вместе с pin-spacer) на
      // пересечении 1440 — ручной ScrollTrigger.kill при ресайзе вниз оставлял
      // 2200px пустоты под блоком и дёргал скролл.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1440px)", () => {
        if (!wrapRef.current || !pinRef.current) return;
        // до первой отрисовки ужимаем до 16px — без вспышки «большая → маленькая».
        render(0);
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${SCRUB_PX}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            latch.current = Math.max(latch.current, self.progress);
            render(latch.current);
          },
          onRefresh: (self) => {
            latch.current = Math.max(latch.current, self.progress);
            render(latch.current);
          },
        });
        return () => {
          latch.current = 0;
          settle();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  const content = (
    <div className="mx-auto w-full max-w-[1440px] xl:relative xl:h-[1200px] xl:w-[1440px]">
      {/* 1280 (Figma 2613:16471): section gap 64, py 72.
          Группа 1 — заголовок + интро (gap 12; абзацы по 594, opacity 80).
          Группа 2 — блок h 640: иконка 640 справа (left calc(50%+280) center),
          текст «Маленький размер» 440 внизу-слева (top 500, наложение на иконку),
          стрелки-дудл, подчёркивание. */}
      <div className="flex flex-col gap-[32px] px-[var(--grid-margin)] py-[64px] sm:gap-[64px] sm:py-[72px] xl:contents">
        <div className="flex flex-col gap-[12px] xl:contents">
          <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[134px] xl:text-[32px]">
            <p className="text-[#008cff]">05</p>
            <p className="text-[#121212]">{t.first16Heading}</p>
          </div>

          {/* 1280 (Figma 2622:4702): абзацы по 594; п.1 — перенос после «px.»;
              п.2 без хвоста «Большая версия…» (он есть на 375/834/1440). */}
          <div className="flex flex-col gap-[6px] sm:max-w-[381px] lg:w-[594px] lg:max-w-full xl:contents">
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[496px]">
              {t.first16Para1}
            </p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 xl:absolute xl:left-[46px] xl:top-[221px] xl:w-[505px]">
              {t.first16Para2}
              <span className="lg:hidden xl:inline">
                {t.first16Para2Tail}
              </span>
            </p>
          </div>
        </div>

        {/* Группа 2 — наложение иконки и текста в блоке высотой 640. */}
        <div className="relative w-full lg:min-h-[640px] xl:contents">
          {/* Иконка: чёрный контур (статичен) + голубая версия (на десктопе
              растёт по скроллу, ниже 1440 — сразу в финальном размере). */}
          <div className="relative aspect-square w-full lg:absolute lg:left-[calc(50%+280px)] lg:top-0 lg:size-[640px] lg:-translate-x-1/2 xl:absolute xl:left-[726px] xl:top-[318px] xl:size-[640px] xl:translate-x-0 xl:bg-transparent">
            {/* <1440 — цельная композиция иконки (белый фон + конструкция +
                синий 0.8), экспорт из Figma (2609:28796). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              alt=""
              className="absolute inset-0 block size-full xl:hidden"
              src={`${A}/reflow/icon16-1280.svg`}
            />
            {/* ≥1440 — чёрный контур (статичен, с круглыми вырезами) + 16px-версия,
                растёт по скроллу до 640px. Экспорт 2009:12797_1440. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute left-0 top-0 hidden size-full max-w-none xl:block"
              src={`${A}/reflow/icon16-black-1440.svg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={blueRef}
              alt=""
              className="absolute left-0 top-0 hidden w-full max-w-none will-change-transform xl:block xl:size-[640px]"
              src={`${A}/icon16-blue.svg`}
              draggable={false}
              style={{
                transformOrigin: "top left",
                transform: "scale(1)",
                opacity: OPACITY_END,
              }}
            />
          </div>

          {/* Доодл-«стрелки» (Frame 2147231856) — 1280: (321,334) внутри блока,
              140×139, поворот −0.9°. Десктоп — своя позиция. */}
          <Reveal
            variant="doodle"
            className="pointer-events-none hidden h-[139px] w-[140px] lg:absolute lg:left-[298px] lg:top-[311px] lg:block xl:left-[481px] xl:top-[655px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img aria-hidden alt="" className="block size-full max-w-none lg:-rotate-[0.9deg] xl:rotate-0" src={`${A}/icon16-doodle.svg`} />
          </Reveal>

          {/* Текст «Маленький размер…» + подчёркивание.
              RU: 1280 — блок на (0,500) (как было, НЕ трогаем); ≥1440 —
              выровнен низом по низу иконки (y958).
              EN: 1280 И ≥1440 — выровнен НИЖНИМ краем по низу иконки, цитата
              с ручными переносами (4 строки, 1:1 с макетом). */}
          <div
            className={`contents lg:absolute lg:left-0 lg:block xl:left-[46px] xl:top-auto xl:bottom-[242px] xl:w-[640px] ${
              lang === "en" ? "lg:bottom-0 lg:!w-[492px]" : "lg:top-[500px] lg:!w-[454px]"
            }`}
          >
            {/* 1280: RU w440 (натур. перенос); EN w470 под 4 ручные строки.
                ≥1440: w589. Ручные переносы (first16QuoteXlLines):
                RU — только ≥1440; EN — начиная с 1280. `!w` — перебиваем
                sm:w-449 (у обоих одинаковый спец-вес, sm объявлен позже). */}
            <p
              className={`mt-[32px] font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70 sm:w-[449px] sm:max-w-full sm:text-[32px] sm:tracking-[0.96px] lg:mt-0 lg:text-[32px] xl:w-[589px] ${
                lang === "en" ? "lg:!w-[492px]" : "lg:!w-[440px]"
              }`}
            >
              <span className={lang === "en" ? "lg:hidden" : "xl:hidden"}>{t.first16Quote}</span>
              <span className={`hidden ${lang === "en" ? "lg:inline" : "xl:inline"}`}>
                {t.first16QuoteXlLines.map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </span>
            </p>

            {/* Подчёркивание (Vector 234257394) — 375: w312; 834/1280: w427;
                ≥1440: свой ассет 518×67 (Figma bbox 517.8×67.26, наклон в путях).
                Наклон +2.26° на 375/834/1280 (в потоке под цитатой). */}
            <Reveal
              variant="line"
              start="top 92%"
              className="pointer-events-none mt-[10px] block w-[312px] max-w-full sm:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="block w-full max-w-none rotate-[2.26deg]" src={`${A}/reflow/icon16-underline-375.svg`} />
            </Reveal>
            {/* 834 — в потоке под цитатой; 1280 — абсолют под НИЗОМ цитаты
                (чтобы блок EN мог выравниваться низом по иконке). */}
            <Reveal
              variant="line"
              start="top 92%"
              className="pointer-events-none mt-[10px] hidden w-[427px] max-w-full sm:block lg:absolute lg:left-[27px] lg:top-full xl:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="block w-full max-w-none rotate-[2.26deg]" src={`${A}/reflow/icon16-underline-1280.svg`} />
            </Reveal>
            {/* ≥1440: Vector 234257394 (Figma node 2959:38314) — path bbox
                (159, 964.37), 517.8×26.53. Относительно блока текста (низ 958):
                left 113 (159−46), верх на 6px ниже блока. Обводка 6px выходит
                за бокс (inset как в экспорте Figma). */}
            <Reveal
              variant="line"
              start="top 92%"
              className="pointer-events-none hidden xl:absolute xl:left-[113px] xl:top-full xl:mt-[6px] xl:block xl:h-[26.53px] xl:w-[517.8px]"
            >
              <div className="absolute inset-[-11.31%_-0.58%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/icon16-underline-1440.svg`} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );

  // ≥1440 — жёсткие высоты холста + запас на скраб (SECTION_H + SCRUB_PX).
  // Ниже — обычный поток, высоты через CSS не задаём (никакого JS-гейта,
  // чтобы при ресайзе не оставалось «залипших» inline-height).
  return (
    <div ref={wrapRef} className="relative w-full xl:h-[2200px]">
      <div ref={pinRef} className="relative w-full bg-[#fafafa] xl:h-[1200px]">
        {content}
      </div>
    </div>
  );
}
