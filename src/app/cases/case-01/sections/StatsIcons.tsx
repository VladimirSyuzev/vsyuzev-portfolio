"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const NATIVE_W = 3001;
const NATIVE_H = 1270;
// Полосы рядов в stats-icons.svg — сняты пиксельным анализом реального
// файла (canvas + поиск границ non-background по Y), не на глаз: 8 рядов
// иконок, 4 сверху / 4 снизу от разрыва под текст статистики.
const ROW_BANDS: [number, number][] = [
  [2, 108],
  [144, 259],
  [293, 396],
  [433, 543],
  [730, 829],
  [870, 971],
  [1013, 1117],
  [1156, 1262],
];
const PAD = 8; // небольшой запас на каждую полосу, чтобы не срезать штрихи

// Один ряд — единственная (без повтора/тайлинга) копия своей полосы
// картинки, во всю её натуральную ширину, которая едет от одного края
// контейнера до другого и обратно. Общий scale — единый на все ряды,
// подобран так, чтобы вся картинка (1270px натуральной высоты) была
// пропорционально увеличена ровно до высоты блока Stats — поэтому ряд
// позиционируется через абсолютный top/height от исходных координат,
// а не через flex-раскладку.
function StatsRow({
  band,
  scale,
  containerWidth,
}: {
  band: [number, number];
  scale: number;
  containerWidth: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stripW = NATIVE_W * scale;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current || containerWidth <= 0 || stripW <= 0) return;
      const travel = containerWidth - stripW; // ширина полосы часто больше контейнера — travel может быть отрицательным, тогда это панорама, а не отступы по бокам
      const duration = 34 + Math.random() * 22; // 34–56s на проход из края в край (медленнее по просьбе)
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
        }
      );
      return () => {
        tween.kill();
      };
    },
    { dependencies: [containerWidth, stripW], revertOnUpdate: true }
  );

  if (scale <= 0) return null;

  const nativeTop = band[0] - PAD;
  const nativeHeight = band[1] - band[0] + 1 + PAD * 2;

  return (
    <div
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: nativeTop * scale, height: nativeHeight * scale }}
    >
      <div
        ref={ref}
        className="absolute left-0 top-0"
        style={{
          width: stripW,
          height: nativeHeight * scale,
          backgroundImage: "url(/cases/case-01/sections/stats-icons.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${stripW}px ${NATIVE_H * scale}px`,
          backgroundPosition: `0px ${-nativeTop * scale}px`,
        }}
      />
    </div>
  );
}

// «01-Stats» фон — stats-icons.svg, пропорционально увеличенный до высоты
// блока (ResizeObserver на сам блок, scale = высота блока / 1270): вся
// картинка растёт КАК ЦЕЛОЕ, как единый масштаб-1:1 с оригиналом, каждый
// ряд остаётся на своём исходном относительном месте (в т.ч. разрыв под
// текст ровно посередине — он и в исходнике примерно посередине холста).
export default function StatsIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

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

  const scale = size.h > 0 ? size.h / NATIVE_H : 0;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-90">
      {ROW_BANDS.map((band, i) => (
        <StatsRow key={i} band={band} scale={scale} containerWidth={size.w} />
      ))}
    </div>
  );
}
