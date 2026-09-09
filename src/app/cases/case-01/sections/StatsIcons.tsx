"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Построчная панорама фоновой текстуры блока Stats — на КАЖДОМ брейкпоинте
// своё изображение (из Figma-экспорта под этот размер), одна и та же
// механика: 8/12 рядов, каждый ряд — одна копия своей полосы, едет от
// края к краю и обратно (независимая фаза/скорость). В середине — разрыв
// под цифры статистики.
//
// bands сняты попиксельно (canvas alpha-профиль по Y реальных файлов).

type Band = [number, number];

type Cfg = {
  src: string;
  w: number;
  h: number;
  bands: Band[];
  // множитель ширины полосы относительно ширины блока: гарантирует, что
  // полоса шире контейнера и есть куда «панорамировать».
  minStripFactor: number;
  // какую долю высоты блока должен занимать центральный разрыв под цифры
  // (375 — 3 ряда цифр, 834 — 2 ряда, 1280 — 1 ряд).
  gapFrac: number;
};

const R = "/cases/case-01/sections";

const DESKTOP: Cfg = {
  src: `${R}/stats-icons.svg`,
  w: 3001,
  h: 1270,
  bands: [
    [2, 108], [144, 259], [293, 396], [433, 543],
    [730, 829], [870, 971], [1013, 1117], [1156, 1262],
  ],
  minStripFactor: 0,
  gapFrac: 0,
};

const M1280: Cfg = {
  src: `${R}/reflow/stats-icons-1280.svg`, // иконки_1280.svg 2227×877
  w: 2227,
  h: 877,
  bands: [
    [0, 82], [95, 182], [190, 272], [284, 370],
    [508, 590], [602, 684], [696, 780], [788, 872],
  ],
  minStripFactor: 1.2,
  gapFrac: 0.2,
};

const M834: Cfg = {
  src: `${R}/reflow/stats-icons-834.svg`, // иконки_834.svg 2227×1375
  w: 2227,
  h: 1375,
  bands: [
    [3, 83], [93, 177], [189, 271], [281, 373], [380, 462], [471, 561],
    [820, 900], [914, 994], [1006, 1088], [1097, 1184], [1196, 1278], [1288, 1375],
  ],
  minStripFactor: 1.2,
  gapFrac: 0.36,
};

const M375: Cfg = {
  src: `${R}/reflow/stats-icons-375.svg`, // иконки_375.svg 375×636
  w: 375,
  h: 636,
  bands: [
    [0, 53], [61, 111], [123, 172],
    [465, 515], [526, 575], [586, 636],
  ],
  minStripFactor: 1.22,
  gapFrac: 0.42,
};

const CFG: Record<string, Cfg> = { desktop: DESKTOP, "1280": M1280, "834": M834, "375": M375 };

// небольшой запас на полосу; держим малым, иначе соседние полосы
// (особенно на плотном 375) перекрываются и один ряд иконок «двоится».
const PAD = 2;

function StatsRow({
  band,
  nextStart,
  z,
  offY,
  cfg,
  containerWidth,
}: {
  band: Band;
  nextStart: number;
  z: number;
  offY: number;
  cfg: Cfg;
  containerWidth: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stripW = cfg.w * z;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current || containerWidth <= 0 || stripW <= 0) return;
      const travel = containerWidth - stripW; // обычно < 0 — это панорама, а не поля по краям
      const duration = 34 + Math.random() * 22;
      const startAtZero = Math.random() < 0.5;
      const tween = gsap.fromTo(
        ref.current,
        { x: startAtZero ? 0 : travel },
        {
          x: startAtZero ? travel : 0,
          duration,
          delay: Math.random() * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
      return () => {
        tween.kill();
      };
    },
    { dependencies: [containerWidth, stripW], revertOnUpdate: true },
  );

  if (z <= 0) return null;

  const nativeTop = band[0] - PAD;
  // низ полосы не заходит на следующую полосу — иначе один ряд иконок «двоится»
  const nativeBottom = Math.min(band[1] + PAD, nextStart - 1);
  const nativeHeight = Math.max(1, nativeBottom - nativeTop + 1);

  return (
    <div
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: nativeTop * z - offY, height: nativeHeight * z }}
    >
      <div
        ref={ref}
        className="absolute left-0 top-0"
        style={{
          width: stripW,
          height: nativeHeight * z,
          backgroundImage: `url(${cfg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${stripW}px ${cfg.h * z}px`,
          backgroundPosition: `0px ${-nativeTop * z}px`,
        }}
      />
    </div>
  );
}

export default function StatsIcons({ variant = "desktop" }: { variant?: "desktop" | "1280" | "834" | "375" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const cfg = CFG[variant] ?? DESKTOP;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Единый масштаб Z. Десктоп — прежняя формула (fit по высоте, кап 1360).
  // Reflow — Z задаём так, чтобы (а) полоса была шире контейнера и
  // (б) центральный разрыв занимал нужную долю высоты блока; затем
  // сдвигаем текстуру так, чтобы РАЗРЫВ был по центру блока (ряды сверху/
  // снизу могут уезжать за край — их режет overflow-hidden).
  let z = 0;
  let offY = 0;
  if (size.h > 0 && size.w > 0) {
    if (variant === "desktop") {
      z = Math.min(size.h / cfg.h, size.w / 1360);
    } else {
      // самый большой промежуток между полосами = разрыв под цифры
      let gapNative = 1;
      let gapMidNative = cfg.h / 2;
      for (let i = 0; i < cfg.bands.length - 1; i++) {
        const g = cfg.bands[i + 1][0] - cfg.bands[i][1];
        if (g > gapNative) {
          gapNative = g;
          gapMidNative = (cfg.bands[i + 1][0] + cfg.bands[i][1]) / 2;
        }
      }
      const byWidth = (size.w * cfg.minStripFactor) / cfg.w;
      const byGap = (size.h * cfg.gapFrac) / gapNative;
      z = Math.max(byWidth, byGap);
      offY = gapMidNative * z - size.h / 2;
    }
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-90">
      <div ref={containerRef} className="absolute inset-0">
        {cfg.bands.map((band, i) => (
          <StatsRow
            key={i}
            band={band}
            nextStart={cfg.bands[i + 1]?.[0] ?? cfg.h + PAD + 2}
            z={z}
            offY={offY}
            cfg={cfg}
            containerWidth={size.w}
          />
        ))}
      </div>
    </div>
  );
}
