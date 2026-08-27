"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, waveStagger } from "@/lib/gsap";

// Сетка ячеек для reveal-анимации: делим видимую область фона (1440×900,
// верхние 900px из родного 1440×1024 SVG — Figma-фрейм обрезает нижний
// излишек так же, как раньше был обрезан stats-bg.png) на 8×5 = 40 ячеек
// 180×180. Каждая ячейка — окно (background-position со сдвигом) в один и
// тот же SVG-спрайт, без искажений и без дублирования тяжёлого DOM.
const COLS = 8;
const ROWS = 5;
const CELL_W = 1440 / COLS;
const CELL_H = 900 / ROWS;

// «Фон-табличка» — теперь настоящий SVG (stats-bg.svg) вместо screenshot
// (stats-bg.png). Reveal — «волна» (waveStagger), та же техника и параметры
// антидиагонального стаггера, что и в CasesList/AuditLibrary — единственная
// анимация, переносимая из прошлого проекта, здесь применена к тому же
// самому файлу-фону, как в прошлом проекте у аналогичного блока "табличка".
export default function StatsBg() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cells = gsap.utils.toArray<HTMLElement>(".stats-wave-cell", scope.current);
      gsap.from(cells, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "siteEase",
        stagger: waveStagger(COLS, 0.045),
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
        },
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="absolute left-0 top-0 grid opacity-90"
      style={{
        width: 1440,
        height: 900,
        gridTemplateColumns: `repeat(${COLS}, ${CELL_W}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL_H}px)`,
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        return (
          <div
            key={i}
            className="stats-wave-cell"
            style={{
              width: CELL_W,
              height: CELL_H,
              backgroundImage: "url(/cases/case-01/sections/stats-bg.svg)",
              backgroundSize: "1440px 1024px",
              backgroundPosition: `-${col * CELL_W}px -${row * CELL_H}px`,
              backgroundRepeat: "no-repeat",
            }}
          />
        );
      })}
    </div>
  );
}
