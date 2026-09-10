"use client";

// 03 Аудит библиотеки — на десктопе (≥1440) абсолют 1:1 из Figma (node
// 1965:42538, высота 1795). Ниже 1440 — поток в сетке: заголовок ужимается,
// текст на всю ширину, таблица прокручивается горизонтально в своём окне,
// рукописные доодлы/эллипс скрыты.
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion, waveStagger } from "@/lib/gsap";
import { useCanvasWide } from "@/lib/breakpoint";
import Dot from "@/components/Dot";
import DrawIn from "@/components/DrawIn";

const A = "/cases/case-01/sections/audit-assets";
const R = "/cases/case-01/sections/reflow";

// --- Reflow <1440. 375 — Figma 2559:11097 (одна колонка из 6, точки-скетчи).
// 834 — Figma 2539:9073 (две колонки по 3, gap 12; заголовок 100px ls 0;
// таблица 778×152; цитата Wix Reg 28 + эллипс Vector 234257386 rot 4.59). ---
const AUDIT_BULLETS: { text: string; dot: number }[] = [
  { text: "определили существующие иконки", dot: 1 },
  { text: "нашли дубли", dot: 3 },
  { text: "выявили отсутствующие размеры", dot: 2 },
  { text: "определили недостающие outline- и filled-версии", dot: 1 },
  { text: "обнаружили полностью отсутствующие иконки", dot: 2 },
  { text: "расставили приоритеты производства", dot: 4 },
];

function AuditFlow() {
  const cols = [AUDIT_BULLETS.slice(0, 3), AUDIT_BULLETS.slice(3)];
  return (
    // Секция — 375 pad 64/20 gap 32 · 834 pad 72/28 gap 64 · 1280 pad 72/40
    <section className="relative w-full overflow-clip bg-[#fafafa] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px]">
      <div className="flex flex-col gap-[32px] sm:gap-[64px]">
        {/* Frame 2147231944 — заголовок + интро, UPPERCASE.
            375: vertical AL gap 12 (Figma 2559:19085) · 834: gap 32 */}
        <div className="flex flex-col gap-[12px] uppercase sm:gap-[32px]">
          {/* 03 / АУДИТ / БИБЛИОТЕКИ — стопкой. 375: Wix Bold 26 / leading-none · 834: 100 / ls 0 · 1280: 152 */}
          <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold leading-none sm:text-[100px] lg:text-[152px] lg:leading-[1.05]">
            <span className="text-[#008cff]">03</span>
            <span className="text-[#121212]">АУДИТ</span>
            <span className="text-[#121212]">БИБЛИОТЕКИ</span>
          </div>
          {/* интро — Aeonik Pro Medium 14 / 120% / ls 0.28, opacity 100.
              375: 3 жёстких строки w335 · 834: w383 · 1280: w593 (Figma 2533:8978) */}
          <p className="w-[335px] max-w-full font-body text-[14px] font-medium leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[383px] lg:w-[593px]">
            Работу начали с полной ревизии.
            <br className="sm:hidden" /> Мы объединили обе библиотеки, распределили иконки по категориям
            <br className="sm:hidden" /> и проанализировали каждую позицию.
          </p>
        </div>

        {/* результат аудита. 375: всё gap 32 · 834: буллеты→таблица 52 · 1280: 32 */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[32px] sm:gap-[52px] lg:gap-[32px]">
            {/* Frame 2147231945/2147231916/2147231910 — «В РЕЗУЛЬТАТЕ...» + буллеты.
                375/834: стопкой gap 12 · 1280: в ряд, gap 119 (Figma H) */}
            <div className="flex flex-col gap-[12px] lg:flex-row lg:items-start lg:gap-[119px]">
              <p className="w-[190px] font-body text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[186px] lg:w-[184px] lg:shrink-0">
                В РЕЗУЛЬТАТЕ АУДИТА была собрана таблица:
              </p>
              {/* 375: одна колонка из 6 · 834: две колонки по 3 (row gap 12, w383).
                  Строка flex gap 8; точка 12×12 (скетч-SVG). */}
              <div className="flex flex-col gap-[6px] sm:flex-row sm:gap-[12px]">
                {cols.map((col, ci) => (
                  <ul key={ci} className="flex flex-col gap-[6px] sm:w-[383px]">
                    {col.map(({ text, dot }, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]"
                      >
                        <img aria-hidden alt="" className="mt-[2px] block size-[12px] shrink-0" src={`${R}/dot-${dot}.svg`} />
                        <span className="opacity-70">{text}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Frame 2147231946/2147231907 — таблица.
                375: audit-table-375.svg 335×162 · 834: audit-table-834.svg 778×152 */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Таблица аудита библиотеки иконок по размерам и вариантам"
                src={`${R}/audit-table-375.svg`}
                className="block w-[335px] max-w-full sm:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                aria-hidden
                alt=""
                src={`${R}/audit-table-834.svg`}
                className="hidden w-[778px] max-w-full sm:block lg:w-[1200px]"
              />
            </div>
          </div>

          {/* Frame 2147231948/— центр — мысль-цитата + обводка-эллипс.
              center/center; 375: pad-y 32 · 834: pad-y 64.
              Цитата — 375: Wix Reg 22 / ls 0.6 · 834: 28 / lh 110 / ls 0.96, w589.
              Эллипс Vector 234257386 — absolute, rotate −4.59. */}
          <div className="relative flex flex-col items-center justify-center py-[32px] sm:py-[64px]">
            <p className="relative z-10 w-[335px] max-w-full text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.6px] text-[#121212] opacity-70 sm:w-[589px] sm:text-[28px] sm:leading-[1.1] sm:tracking-[0.96px]">
              Полная карта библиотеки показала, что уже есть, чего
              <br className="sm:hidden" /> не хватает и что нужно сделать в первую очередь
            </p>
            {/* появление — прочерчивание обводки (DrawIn) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[235px] w-[363px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[239px] sm:w-[643px]">
              <DrawIn
                src={`${R}/audit-ellipse-375.svg`}
                fit="contain"
                className="h-[211.9px] w-[350px] -rotate-[4.59deg] sm:hidden"
              />
              <DrawIn
                src={`${R}/audit-ellipse-834.svg`}
                fit="contain"
                className="hidden h-[195px] w-[636px] -rotate-[4.59deg] sm:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const wide = useCanvasWide();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const tl = gsap.timeline({
        defaults: { ease: "siteEase" },
        scrollTrigger: { trigger: scope.current, start: "top 72%", once: true },
      });
      tl.from(".audit-intro", { opacity: 0, x: -12, duration: 0.5, stagger: 0.05 })
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
    { scope, dependencies: [reduced, wide] },
  );

  // <1440 — переверстка по макету 2559:11097 (готовые SVG таблицы/эллипса,
  // без стрелки-доодла). ≥1440 — прежний абсолют 1:1.
  if (!wide) return <AuditFlow />;

  return (
    <section
      ref={scope}
      className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1795px] xl:w-[1440px] xl:overflow-clip"
    >
      <div className="flex flex-col gap-[28px] px-[var(--grid-margin)] py-[72px] xl:contents">
        {/* Крупный дисплейный заголовок (Figma node 1965:42541, 175px) —
            стопкой на всех ширинах (по макетам адаптива). */}
        <div className="flex flex-col font-heading text-[clamp(2.25rem,11vw,175px)] font-bold uppercase leading-none tracking-[0.02em] xl:absolute xl:left-[46px] xl:top-[55px] xl:w-[439px] xl:tracking-[5.25px]">
          <span className="whitespace-nowrap text-[#008cff]">03</span>
          <span className="whitespace-nowrap text-[#121212]">АУДИТ</span>
          <span className="whitespace-nowrap text-[#121212]">БИБЛИОТЕКИ</span>
        </div>

        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] sm:max-w-[629px] xl:absolute xl:left-[46px] xl:top-[612px] xl:w-[629px]">
          Работу начали с полной ревизии. Мы объединили обе библиотеки, распределили иконки по
          категориям и проанализировали каждую позицию.
        </p>

        <p className="audit-intro whitespace-pre-line text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 xl:absolute xl:left-[46px] xl:top-[866px] xl:w-[200px]">
          {"В РЕЗУЛЬТАТЕ АУДИТА\nбыла СОБРАНА ТАБЛИЦА:"}
        </p>
        <div className="flex flex-col gap-[12px] sm:flex-row sm:flex-wrap sm:gap-[12px] xl:absolute xl:left-[556px] xl:top-[866px] xl:w-[838px] xl:flex-nowrap">
          <ul className="audit-intro flex flex-col gap-[6px] sm:max-w-[328px] xl:w-[328px]">
            {FOUND_LEFT.map((item, i) => (
              <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot seed={31 + i} />
                <span className="opacity-70">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="audit-intro flex flex-col gap-[6px] sm:max-w-[442px] xl:w-[442.667px]">
            {FOUND_RIGHT.map((item, i) => (
              <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <Dot seed={47 + i} />
                <span className="opacity-70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Стрелка-доодл — на всех ширинах (по макетам). Ниже xl вписана
            над таблицей справа. */}
        <div className="flex h-[90px] w-[104px] items-center justify-center self-end xl:absolute xl:left-[1255.82px] xl:top-[857px] xl:h-[161.104px] xl:w-[184.616px] xl:self-auto">
          <DrawIn
            src={`${A}/arrow-doodle.svg`}
            fit="contain"
            className="h-[72px] w-[91px] rotate-[14.75deg] xl:h-[125px] xl:w-[158px]"
          />
        </div>

        {/* Таблица аудита — настоящий DOM, 1:1 из Figma (node 1965:42569).
            Ниже 1440 ужимается под ширину сетки (по макетам): шрифт и
            иконки мельче, служебная колонка у́же. */}
        <div className="w-full xl:absolute xl:left-[46px] xl:top-[1003px] xl:w-[1348px]">
          <div
            className="audit-table flex w-full flex-col text-[10px] text-[#121212] [&_.audit-cell_img]:size-[16px] sm:text-[12px] sm:[&_.audit-cell_img]:size-[18px] xl:text-[14px] xl:[&_.audit-cell_img]:size-[24px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {/* Quantity row */}
            <div className="flex h-[36px] w-full border border-black/10 bg-[#f3f3f3] sm:h-[40px] xl:h-[43px]">
              <div className="flex w-[64px] shrink-0 items-center justify-center border-r border-black/10 font-bold sm:w-[100px] xl:w-[135px]">Quantity</div>
              {QUANTITIES.map((q, i) => (
                <div key={i} className="flex flex-1 items-center justify-center border-r border-black/10 font-bold last:border-r-0">
                  {q}
                </div>
              ))}
            </div>
            {/* Name row */}
            <div className="flex h-[38px] w-full border-x border-b border-black/10 bg-white sm:h-[42px] xl:h-[45px]">
              <div className="flex w-[64px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff] sm:w-[100px] xl:w-[135px]">Name</div>
              {COLUMNS.map((c) => (
                <div key={c} className="flex flex-1 items-center justify-center overflow-hidden border-r border-black/10 text-center last:border-r-0">
                  {c}
                </div>
              ))}
            </div>
            {/* Data rows */}
            {ROWS.map((row, ri) => (
              <div key={row.label} className="flex w-full border-x border-b border-black/10 bg-white" style={{ minHeight: ROW_H[ri] * 0.82 }}>
                <div className="flex w-[64px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff] text-center sm:w-[100px] xl:w-[135px]">{row.label}</div>
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
        </div>

        {/* Обводка-эллипс вокруг итоговой мысли — на всех ширинах. */}
        <div className="relative mx-auto w-full max-w-[589px] xl:absolute xl:left-1/2 xl:top-[1420.63px] xl:w-[589px] xl:-translate-x-1/2">
          <DrawIn
            src={`${A}/ellipse-doodle.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[152%] w-[120%] -translate-x-1/2 -translate-y-1/2 xl:h-[253px] xl:w-[674px]"
          />
          <p className="audit-intro relative text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70 sm:text-[28px] xl:text-[32px]">
            Полная карта библиотеки показала, что уже есть, чего не хватает и что нужно сделать в
            первую очередь
          </p>
        </div>
      </div>
    </section>
  );
}
