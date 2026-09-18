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
  src: `${R}/stats-icons.svg`, // иконки1440.svg 2680×1141
  w: 2680,
  h: 1141,
  bands: [
    [2, 96], [115, 218], [234, 326], [345, 443],
    [700, 788], [811, 901], [925, 1018], [1039, 1133],
  ],
  minStripFactor: 0,
  gapFrac: 0,
};

const M1280: Cfg = {
  src: `${R}/reflow/stats-icons-1280.svg`, // иконки 1280.svg 2227×1002
  w: 2227,
  h: 1002,
  bands: [
    [2, 80], [97, 183], [198, 275], [292, 374],
    [629, 702], [723, 798], [820, 898], [917, 995],
  ],
  minStripFactor: 1.2,
  gapFrac: 0.2,
};

const M834: Cfg = {
  src: `${R}/reflow/stats-icons-834.svg`, // иконки834.svg 2227×1392
  w: 2227,
  h: 1392,
  bands: [
    [6, 79], [99, 177], [197, 275], [293, 378], [393, 471], [488, 570],
    [824, 897], [919, 993], [1015, 1093], [1112, 1190], [1211, 1288], [1306, 1391],
  ],
  minStripFactor: 1.2,
  // было 0.36 — с новым ассетом это давало z≈1.28 (byGap продавливал byHeight
  // в 2 раза), иконки рендерились непропорционально огромными и вылезали
  // далеко за пределы блока. byHeight и так даёт разрыв ~165px (хватает под
  // ряд цифр высотой 120px) — держим gapFrac чуть НИЖЕ byHeight, чтобы он
  // не доминировал, а масштаб определялся пропорциональным fit по высоте.
  gapFrac: 0.18,
};

const M375: Cfg = {
  src: `${R}/reflow/stats-icons-375.svg`, // иконки375.svg 1441×1002
  w: 1441,
  h: 1002,
  bands: [
    [4, 51], [62, 112], [123, 174], [183, 238], [246, 296], [305, 358],
    [645, 692], [704, 752], [764, 814], [825, 875], [887, 937], [946, 1001],
  ],
  minStripFactor: 1.22,
  // тот же эффект, что у M834 — было 0.42, продавливало byHeight; снижено,
  // чтобы разрыв под сетку 2×2 (~176px) задавал byHeight, а не byGap.
  gapFrac: 0.28,
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
  // Reflow — Z задаём так, чтобы (а) полоса была шире контейнера,
  // (б) центральный разрыв занимал нужную долю высоты блока, И (в) —
  // ГЛАВНОЕ — ряды иконок сверху/снизу физически покрывали всю высоту
  // блока (byHeight): (а)/(б) — константы minStripFactor/gapFrac,
  // подобранные под КОНКРЕТНЫЙ файл-текстуру; при замене SVG на другой
  // (другие пропорции native-разрыва/высоты) они могут перестать
  // гарантировать полное покрytие — тогда сверху/снизу остаётся светлый
  // просвет без иконок (ловили это на замене ассетов кейса «Статс»: тир
  // 1280 оставлял ~90px просвета). byHeight — универсальный пол: масштаб
  // всегда достаточен, чтобы ряд от первого до последнего band целиком
  // накрывал контейнер, независимо от того, какая картинка сейчас
  // подставлена. Сдвигаем текстуру так, чтобы РАЗРЫВ был по центру блока
  // (ряды сверху/снизу могут уезжать за край — их режет overflow-hidden).
  let z = 0;
  let offY = 0;
  if (size.h > 0 && size.w > 0) {
    const nativeSpan = cfg.bands[cfg.bands.length - 1][1] - cfg.bands[0][0];
    const byHeight = nativeSpan > 0 ? size.h / nativeSpan : 0;
    // самый большой промежуток между полосами = разрыв под цифры — считаем
    // его и на десктопе тоже: раньше десктоп не сдвигал текстуру (offY
    // всегда 0), разрыв центрировался только «случайно», когда z брал
    // значение size.h/cfg.h; как только byHeight-пол стал перетягивать z,
    // разрыв и цифры (которые всегда строго по центру блока) разъезжались —
    // сверху/снизу цифр получались разные отступы на 1440.
    let gapNative = 1;
    let gapMidNative = cfg.h / 2;
    for (let i = 0; i < cfg.bands.length - 1; i++) {
      const g = cfg.bands[i + 1][0] - cfg.bands[i][1];
      if (g > gapNative) {
        gapNative = g;
        gapMidNative = (cfg.bands[i + 1][0] + cfg.bands[i][1]) / 2;
      }
    }
    if (variant === "desktop") {
      z = Math.max(Math.min(size.h / cfg.h, size.w / 1360), byHeight);
    } else if (variant === "834") {
      // 834 — иконки в 100% нативного размера (z=1), не подгоняем под
      // блок; byWidth/byHeight остаются полом на случай непропорционально
      // высокого/широкого контейнера, чтобы не появился просвет.
      const byWidth = (size.w * cfg.minStripFactor) / cfg.w;
      z = Math.max(1, byWidth, byHeight);
    } else {
      const byWidth = (size.w * cfg.minStripFactor) / cfg.w;
      const byGap = (size.h * cfg.gapFrac) / gapNative;
      z = Math.max(byWidth, byGap, byHeight);
    }
    offY = gapMidNative * z - size.h / 2;
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
