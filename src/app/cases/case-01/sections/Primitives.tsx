"use client";

// «Примитивы» — 1:1 из Figma.
// ≥1440 (node 1961:31926) — интерактив: в покое сетка-подложка + 9 ячеек
// (mesh-заливка + контур примитива) БЕЗ иконок; на ховере ячейка растёт и в
// ней проявляется иконка. Длительность ~180ms, ease-out.
// <1440 (node 2559:11132) — статичная сетка: секция 375×463, pad 64/20,
// контейнер 335×335 (белый r7, сетка 3×3, шаг 97, ячейка 51). Иконки
// показаны сразу, появляются диагональной «волной» при вскролле.
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion, waveStagger } from "@/lib/gsap";
import { useCanvasWide, useMinWidth } from "@/lib/breakpoint";

const A = "/cases/case-01/sections/primitives-assets";
const R = "/cases/case-01/sections/reflow";

const CANVAS = { w: 1008, h: 712.421 };
const CELL = 109.137;

type Cell = {
  left: number;
  top: number;
  mesh: string;
  icon: string;
  shape: string;
  shapeClass: string;
  rotate?: number;
  swap?: boolean; // поворот 90° с обменом сторон (containerType-трюк из Figma)
};

// Порядок — строчный (row-major), 3×3: нужно для waveStagger(3).
const CELLS: Cell[] = [
  { left: 243.19, top: 95.4, mesh: "mesh6.svg", icon: "home-light.svg", shape: "rect5-stroke.svg", shapeClass: "inset-[12.5%]" },
  { left: 449.34, top: 95.4, mesh: "mesh5.svg", icon: "clock.svg", shape: "vector-stroke.svg", shapeClass: "inset-[8.33%]" },
  { left: 655.49, top: 95.4, mesh: "mesh4.svg", icon: "star.svg", shape: "polygon1.svg", shapeClass: "inset-[8.33%_8.26%_16.84%_8.95%]" },
  { left: 243.19, top: 301.55, mesh: "mesh3.svg", icon: "trash.svg", shape: "subtract1.svg", shapeClass: "inset-[8.33%_16.67%]" },
  { left: 449.34, top: 301.55, mesh: "mesh2.svg", icon: "travel.svg", shape: "vector.svg", shapeClass: "inset-[4.17%_12.5%]", rotate: 90, swap: true },
  { left: 655.49, top: 301.55, mesh: "mesh1.svg", icon: "cafe.svg", shape: "rect39959.svg", shapeClass: "inset-[0_20.83%]", rotate: 180 },
  { left: 243.19, top: 507.7, mesh: "mesh.svg", icon: "mail.svg", shape: "subtract.svg", shapeClass: "inset-[16.66%_8.33%_16.67%_8.33%]", rotate: 90, swap: true },
  { left: 449.34, top: 507.7, mesh: "mesh8.svg", icon: "speech.svg", shape: "vector1.svg", shapeClass: "inset-[12.5%_4.17%]" },
  { left: 655.49, top: 507.7, mesh: "mesh7.svg", icon: "games.svg", shape: "rect39960.svg", shapeClass: "inset-[20.83%_0]", rotate: 90, swap: true },
];

// Позиции ячеек 3×3 в контейнере 335 (Figma 2559:11132): x 45.09/142/238.92,
// y 47.39/144.31/241.22, ячейка 51.307.
const COL_PCT = [13.46, 42.39, 71.32];
const ROW_PCT = [14.15, 43.08, 72.01];
const CELL_PCT = 15.32;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// mesh-заливка + контур примитива (общее для обеих раскладок).
function CellShape({ c }: { c: Cell }) {
  return (
    <div className="absolute inset-0 overflow-clip bg-[rgba(73,174,255,0.1)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/${c.mesh}`} alt="" className="absolute inset-0 block size-full max-w-none" />
      {c.swap ? (
        <div className={`absolute flex items-center justify-center ${c.shapeClass}`} style={{ containerType: "size" }}>
          <div className="relative h-[100cqw] w-[100cqh]" style={{ transform: `rotate(${c.rotate}deg)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/${c.shape}`} alt="" className="absolute inset-0 block size-full max-w-none" />
          </div>
        </div>
      ) : (
        <div className={`absolute ${c.shapeClass}`} style={c.rotate ? { transform: `rotate(${c.rotate}deg)` } : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/${c.shape}`} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
      )}
    </div>
  );
}

export default function Primitives() {
  const wide = useCanvasWide();
  const sm = useMinWidth(640);
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // <1440 — «волна»: иконки проявляются по антидиагонали 3×3 при вскролле.
  useGSAP(
    () => {
      if (wide || reduced || !scope.current) return;
      const tw = gsap.from(".prim-icon", {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "siteEase",
        stagger: waveStagger(3, 0.06),
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    },
    { scope, dependencies: [wide, reduced] },
  );

  // 834 — готовый SVG из макета (Figma 2547:22703, карточка 778×550,
  // секция pad 72/28). 1280 — та же карта, ширина 1008 по центру (Figma
  // 2533:9009 → Frame 2147231349 1008×712, тот же аспект). Волн/интерактива нет.
  if (!wide && sm) {
    return (
      <section className="flex w-full justify-center bg-[#fafafa] px-[28px] py-[72px] lg:px-[40px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${R}/primitives-834.svg`}
          alt="Примитивы: mesh-сетка и контуры базовых форм для иконок"
          className="block w-[778px] max-w-full lg:w-[1008px]"
        />
      </section>
    );
  }

  // 375 — статичная сетка из макета (иконки видны сразу, «волна» при вскролле).
  if (!wide) {
    return (
      <section ref={scope} className="w-full bg-[#fafafa] px-[20px] py-[64px]">
        <div className="relative aspect-square w-[335px] max-w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${R}/primitives-grid-375.svg`} alt="" className="absolute inset-0 block size-full" />
          {CELLS.map((c, i) => (
            <div
              key={c.icon}
              className="absolute"
              style={{
                left: `${COL_PCT[i % 3]}%`,
                top: `${ROW_PCT[Math.floor(i / 3)]}%`,
                width: `${CELL_PCT}%`,
                height: `${CELL_PCT}%`,
              }}
            >
              <CellShape c={c} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/${c.icon}`} alt="" className="prim-icon absolute inset-0 block size-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="relative flex w-full items-center justify-center overflow-clip bg-[#fafafa] py-[72px] xl:h-[1011px] xl:py-0">
      <div className="relative mx-auto w-full max-w-[1008px] px-[var(--grid-margin)] xl:px-0">
        <div className="relative w-full" style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/grid-bg.svg`} alt="" className="absolute inset-0 block size-full" />

          {CELLS.map((c) => (
            <div
              key={c.icon}
              className="group absolute transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform hover:z-10 hover:scale-[1.16] motion-reduce:transition-none motion-reduce:hover:scale-100"
              style={{ left: pct(c.left, CANVAS.w), top: pct(c.top, CANVAS.h), width: pct(CELL, CANVAS.w), height: pct(CELL, CANVAS.h) }}
            >
              <CellShape c={c} />
              {/* Иконка — скрыта в покое, проявляется на ховере (fade). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/${c.icon}`}
                alt=""
                className="pointer-events-none absolute inset-0 block size-full opacity-0 transition-opacity duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
