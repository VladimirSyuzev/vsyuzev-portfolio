"use client";

// 03 Аудит библиотеки — 1:1 из актуальной Figma (node 1965:42538, высота
// 1720). Заголовок «03 / АУДИТ / БИБЛИОТЕКИ» (175px, leading-none, top 55).
// Координаты по свежим метаданным: вводный абзац top 592, «в результате
// аудита» + список top 729, таблица top 866, стрелка-доодл 1255.82/722,
// итоговая мысль (центр, Wix Madefor Regular, top 1365.5) в обводке-эллипсе
// (экспорт узла 2322:5170, 674×253, начало SVG = координата секции
// 383.64 / 1302.91). Таблица — настоящий DOM: 9 колонок×6 строк.
// Появление ячеек-иконок — «волна» (waveStagger, см. lib/gsap.ts).
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion, waveStagger } from "@/lib/gsap";
import Dot from "@/components/Dot";

const A = "/cases/case-01/sections/audit-assets";

const FOUND_LEFT = [
  "определили существующие иконки",
  "нашли дубли",
  "выявили отсутствующие размеры",
];
const FOUND_RIGHT = [
  "определили недостающие outline- и filled-версии",
  "обнаружили полностью отсутствующие иконки",
  "расставили приоритеты производства",
];

const COLUMNS = ["Symbols", "Regular", "Outline", "Filled", "32", "24", "20", "16", "12"];
const QUANTITIES = ["256", "65", "65", "4", "28", "61", "37", "58", "47"];
// Высоты строк-данных 1:1 из Figma (Edit / Picture / Speaker max / Fire).
const ROW_H = [43, 42, 45, 43];

type Cell = { icon: string; alt: string } | "check" | "dash";

const ROWS: { label: string; cells: Cell[] }[] = [
  {
    label: "Edit",
    cells: [
      { icon: `${A}/edit-symbols.svg`, alt: "Edit / Symbols" },
      { icon: `${A}/edit-regular.svg`, alt: "Edit / Regular" },
      "check",
      "dash",
      "check",
      "check",
      "check",
      "check",
      "dash",
    ],
  },
  {
    label: "Picture",
    cells: [
      { icon: `${A}/image-symbols.svg`, alt: "Picture / Symbols" },
      { icon: `${A}/image-regular.svg`, alt: "Picture / Regular" },
      "check",
      "dash",
      "check",
      "check",
      "check",
      "check",
      "check",
    ],
  },
  {
    label: "Speaker max",
    cells: [
      { icon: `${A}/volume-symbols.svg`, alt: "Speaker max / Symbols" },
      { icon: `${A}/volume-regular.svg`, alt: "Speaker max / Regular" },
      "check",
      "check",
      "check",
      "check",
      "check",
      "check",
      "check",
    ],
  },
  {
    label: "Fire",
    cells: [
      { icon: `${A}/fire-symbols.svg`, alt: "Fire / Symbols" },
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
    ],
  },
];

function Cell({ cell }: { cell: Cell }) {
  if (cell === "check") {
    return <img alt="" src={`${A}/check.svg`} className="size-[24px]" />;
  }
  if (cell === "dash") {
    // Нативный размер dash.svg — 20×1.6 (тонкая черта): size-[24px] тут
    // растянул бы её в сплошной квадрат (preserveAspectRatio="none" в самом
    // файле игнорирует пропорции при явном width/height).
    return (
      <div className="flex size-[24px] items-center justify-center">
        <img alt="" src={`${A}/dash.svg`} style={{ width: 20, height: 1.6 }} />
      </div>
    );
  }
  return <img alt={cell.alt} src={cell.icon} className="size-[24px]" />;
}

export default function AuditLibrary() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const tl = gsap.timeline({
        defaults: { ease: "siteEase" },
        scrollTrigger: { trigger: scope.current, start: "top 72%", once: true },
      });
      tl.from(".audit-intro", { opacity: 0, x: -12, duration: 0.5, stagger: 0.05 })
        .from(".audit-doodle", { opacity: 0, scale: 0.86, rotate: -5, duration: 0.6, stagger: 0.12 }, 0.1)
        .from(".audit-table", { opacity: 0, y: 16, duration: 0.5 }, 0.15)
        .from(
          ".audit-cell",
          { opacity: 0, scale: 0.72, duration: 0.4, stagger: waveStagger(9, 0.03), clearProps: "transform,opacity" },
          "-=0.2",
        );
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative h-[1720px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Крупный дисплейный заголовок (Figma node 1965:42541, 175px, leading-none). */}
      <div className="absolute left-[46px] top-[55px] flex w-[439px] flex-col font-heading text-[175px] font-bold uppercase leading-none tracking-[5.25px]">
        <span className="whitespace-nowrap text-[#008cff]">03</span>
        <span className="whitespace-nowrap text-[#121212]">АУДИТ</span>
        <span className="whitespace-nowrap text-[#121212]">БИБЛИОТЕКИ</span>
      </div>

      <p className="absolute left-[46px] top-[592px] w-[393.246px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Работу начали с полной ревизии.
        <br />
        Мы объединили обе библиотеки, распределили иконки по категориям и проанализировали каждую
        позицию.
      </p>

      <p className="audit-intro absolute left-[46px] top-[729px] w-[200px] whitespace-pre-line text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        {"В РЕЗУЛЬТАТЕ АУДИТА\nбыла СОБРАНА ТАБЛИЦА:"}
      </p>
      <div className="absolute left-[556px] top-[729px] flex w-[838px] gap-[12px]">
        <ul className="audit-intro flex w-[328px] flex-col gap-[6px]">
          {FOUND_LEFT.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <Dot index={i} />
              {item}
            </li>
          ))}
        </ul>
        <ul className="audit-intro flex w-[442.667px] flex-col gap-[6px]">
          {FOUND_RIGHT.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <Dot index={i} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Стрелка-доодл, указывающая на таблицу (Figma node 2283:39751 → 1255.82 / 722). */}
      <div className="audit-doodle absolute left-[1255.82px] top-[722px] flex h-[161.104px] w-[184.616px] items-center justify-center">
        <div className="rotate-[14.75deg]">
          <img alt="" className="block h-[125px] w-[158px] max-w-none" src={`${A}/arrow-doodle.svg`} />
        </div>
      </div>

      {/* Таблица аудита — настоящий DOM, 1:1 из Figma (node 1965:42569). */}
      <div className="audit-table absolute left-[46px] top-[866px] flex w-[1348px] flex-col text-[14px] text-[#121212]" style={{ fontFamily: "var(--font-body)" }}>
        {/* Quantity row */}
        <div className="flex h-[43px] w-full border border-black/10 bg-[#f3f3f3]">
          <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 font-bold">Quantity</div>
          {QUANTITIES.map((q, i) => (
            <div key={i} className="flex flex-1 items-center justify-center border-r border-black/10 font-bold last:border-r-0">
              {q}
            </div>
          ))}
        </div>
        {/* Name row */}
        <div className="flex h-[45px] w-full border-x border-b border-black/10 bg-white">
          <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff]">Name</div>
          {COLUMNS.map((c) => (
            <div key={c} className="flex flex-1 items-center justify-center border-r border-black/10 last:border-r-0">
              {c}
            </div>
          ))}
        </div>
        {/* Data rows */}
        {ROWS.map((row, ri) => (
          <div key={row.label} className="flex w-full border-x border-b border-black/10 bg-white" style={{ height: ROW_H[ri] }}>
            <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff]">{row.label}</div>
            {row.cells.map((cell, i) => (
              <div key={i} className="flex flex-1 items-center justify-center border-r border-black/10 last:border-r-0">
                <span className="audit-cell inline-flex">
                  <Cell cell={cell} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2322:5170) —
          экспорт узла с запечённым наклоном; начало SVG = координата
          секции 383.64 / 1302.91. */}
      <div className="audit-doodle absolute left-[383.643px] top-[1302.91px] h-[253px] w-[674px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/ellipse-doodle.svg`} />
      </div>

      {/* Итоговая мысль (Figma node 1965:42546) — отдельный центрированный
          текст, Wix Madefor Display Regular. */}
      <p className="audit-intro absolute left-1/2 top-[1365.51px] w-[589px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Полная карта библиотеки показала, что уже есть, чего не хватает и что нужно сделать в
        первую очередь
      </p>
    </div>
  );
}
