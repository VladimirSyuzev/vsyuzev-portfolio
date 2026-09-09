"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import GlassBubble from "@/components/GlassBubble";
import EdgeFade from "@/components/EdgeFade";
import { useDrag } from "@/lib/useDrag";

// 04 Процесс — тёмный full-bleed блок. На десктопе (≥1200) текст — абсолют
// 1:1 из Figma (node 2009:12647, высота 987), трек этапов — окно во всю
// ширину экрана на y620. Ниже 1200 — поток: заголовок меньше, вводный
// текст на всю ширину, трек ниже текста (перетаскивание/инерция работают
// на любой ширине). Механика трека — как «Построение процесса» в кейсе 1.
const A = "/cases/case-02/sections";

const STEPS = [
  { n: "01", title: "Анализ", desc: "Изучаем метафору сервиса и требования клиента" },
  { n: "02", title: "Референсы", desc: "Собираем визуальные ориентиры нового стиля" },
  { n: "03", title: "Эскизы", desc: "Проверяем несколько вариантов композиции\nи формы" },
  { n: "04", title: "Ревью", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "16×16 px", desc: "Отрабатываем силуэт, баланс и читаемость" },
  { n: "06", title: "640×640 px", desc: "Адаптируем форму для крупного размера, добавляя детали" },
  { n: "07", title: "Финализация", desc: "Проверяем, оформляем и передаем результат клиенту" },
];

const PITCH = 340; // шаг между карточками (x в Figma: 0, 340, 680 … 2040)

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(20);
  const [trackWidth, setTrackWidth] = useState(1440);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      // Левый отступ трека = текущий --grid-margin (20/28/40/44 по брейку),
      // не хардкод — иначе на 375/834 трек уезжал левее текста (был вшит
      // десктопный 46). На фикс-холсте ≥1440 добавляем гаттер сверх margin.
      const margin =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--grid-margin")) || 20;
      const gutter = Math.max(0, (w - 1440) / 2);
      setLeft(margin + gutter);
      setTrackWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Перетаскивание вбок вместо колеса — БЕЗ нативного скролла (не
  // overflow-x-auto/scrollLeft), точно так же, как в VariantsCarousel:
  // индекс карточки + transform: translateX(), трек «catch»-ится в
  // overflow-hidden. Раньше был нативный scrollLeft, которым мы рулили
  // руками через JS — на реальных touch-устройствах это на практике
  // конфликтовало с системными жестами/инерцией браузера и обратная
  // прокрутка не проходила, хотя вся арифметика (проверено симуляцией)
  // была верна в обе стороны. Без native-scroll конфликтовать нечему.
  //
  // На отпускании — РОВНО один шаг ±1 карточка (или 0, если палец прошёл
  // мало): dx <= -70 || vx <= -0.4 → шаг, порог тот же, что в «Вариантах».
  const [index, setIndex] = useState(0);
  const idxRef = useRef(0);
  const [dragDX, setDragDX] = useState(0);
  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  const { dragging, bind } = useDrag({
    onMove: (dx) => {
      const cur = idxRef.current;
      const atEdge = (dx > 0 && cur === 0) || (dx < 0 && cur === STEPS.length - 1);
      setDragDX(atEdge ? dx * 0.32 : dx);
    },
    onEnd: (dx, vx) => {
      setDragDX(0);
      let step = 0;
      if (dx <= -70 || vx <= -0.4) step = 1;
      else if (dx >= 70 || vx >= 0.4) step = -1;
      setIndex((cur) => Math.max(0, Math.min(STEPS.length - 1, cur + step)));
    },
  });

  const offset = left - index * PITCH + (dragging ? dragDX : 0);

  const track = (
    <div
      {...bind}
      className={`relative w-full touch-pan-y select-none overflow-hidden ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      } lg:relative lg:z-[1] xl:absolute xl:left-0 xl:top-[580px] xl:h-[286px]`}
      style={{ paddingTop: 80, paddingBottom: 81 }}
    >
      <div
        className="relative h-[125px] w-[2368px] will-change-transform"
        style={{
          transform: `translateX(${offset}px)`,
          transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
        }}
      >
        {/* Линейка-риска (Group 2136141446/48). В макете это ОТДЕЛЬНЫЙ слой
            секции, не внутри трека: карточки листаются — линейка стоит. Здесь
            она первый ребёнок трека, но в ОБРАТНОМ translateX (гасит скролл
            трека) → визуально неподвижна, при этом в том же backdrop-контексте,
            что и карточки, поэтому их frost её размывает, а карточки поверх.
            Ширина/шаг из макета: 375 → 8 линий (в край экрана), 834 → 14 (от
            поля 28), ≥1024 → 20. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            transform: `translateX(${index * PITCH - (dragging ? dragDX : 0)}px)`,
            transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
          }}
        >
          {/* Точные экспорты из Figma (Group 2136141446/47/48): path
              opacity 0.2, вертикальный градиент white 0→50%→0, БЕЗ доп.
              CSS-прозрачности (было opacity-60 → 0.12, поэтому линий почти
              не видно). 375 → 8 линий, 834 → 14, 1280 → 20, ≥1440 → 20. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-[-20px] top-[-80px] h-[286px] w-[375px] max-w-none sm:hidden" src={`${A}/process-stripes-375.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[778px] max-w-none sm:block lg:hidden" src={`${A}/process-stripes-834.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[1200px] max-w-none lg:block xl:hidden" src={`${A}/process-stripes-1280.svg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden className="absolute left-0 top-[-80px] hidden h-[286px] w-[1348px] max-w-none xl:block" src={`${A}/process-stripes.svg`} />
        </div>
        {STEPS.map((s, i) => (
          <div key={s.n} className="absolute h-[125px] w-[328px] shrink-0" style={{ left: i * PITCH, top: 0 }}>
            {/* Единый <GlassBubble> для кейсов 1/2/3. БЕЗ тёмного «занавеса»
                (frost просвечивает фоновые полосы) и БЕЗ border (ложное
                свечение) — акцент слева отдельным дочерним элементом. */}
            <GlassBubble className="flex size-full flex-col justify-center gap-[8px]">
              <p
                className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.n}
              </p>
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">
                {s.title}
              </p>
              <p className="whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-white">
                {s.desc}
              </p>
            </GlassBubble>
          </div>
        ))}
      </div>
      {/* Затухание краёв до цвета секции на >1440 (замена mask — она ломала
          frost карточек). */}
      <EdgeFade width={trackWidth} />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-clip bg-[#121212] xl:h-[987px]"
    >
      {/* 375: заголовок→текст gap 12 (Figma 2631:4740). 1280: gap 32, заголовок 152px, интро широкая (897/809). */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[12px] px-[var(--grid-margin)] pt-[72px] pb-[40px] sm:gap-[32px] xl:absolute xl:left-1/2 xl:top-0 xl:block xl:h-full xl:w-[1440px] xl:max-w-none xl:-translate-x-1/2 xl:p-0">
        {/* «04 Процесс» — 375: Wix Bold 26 / leading-none / col-gap 10 (Figma 2631:4740).
            834: 100 · 1280: 152 · ≥1440: 175. */}
        <div className="flex flex-nowrap items-baseline gap-x-[10px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none sm:gap-x-[18px] sm:!text-[100px] lg:gap-x-[24px] lg:!text-[152px] xl:absolute xl:left-[39px] xl:top-[152px] xl:gap-[24px] xl:tracking-[5.25px] xl:!text-[175px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Процесс</p>
        </div>

        <div className="flex flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-none sm:gap-[6px] lg:max-w-[900px] xl:absolute xl:left-[46px] xl:top-[359px] xl:w-[498px]">
          <p className="lg:w-[897px] lg:max-w-full">
            После того как основные принципы стали понятны, мы превратили их в рабочий процесс и
            зафиксировали внутренние правила: работу с метафорами, последовательность этапов и
            критерии перехода между ними.
          </p>
          <p className="lg:w-[809px] lg:max-w-full">
            Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок,
            даже когда официальный гайдлайн продолжал развиваться.
          </p>
        </div>

        {/* Стрелка-доодл «→» у конца трека — только на десктопе. */}
        <Reveal
          variant="doodle"
          className="hidden xl:absolute xl:left-[1241px] xl:top-[878px] xl:z-10 xl:block xl:h-[63px] xl:w-[99px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/process-arrow.svg`} />
        </Reveal>
      </div>

      {/* Линейка-риска — в {track}, но с обратным translateX: стоит на месте,
          карточки листаются поверх (как в макете — отдельный слой секции). */}
      <div className="relative xl:contents">{track}</div>

      <div className="pb-[72px] xl:hidden" aria-hidden />
    </div>
  );
}
