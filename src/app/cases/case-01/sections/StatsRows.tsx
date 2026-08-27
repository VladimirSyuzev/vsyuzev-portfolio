"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Геометрия рядов в stats-bg.svg (натуральный холст 1440×1024): 6 рядов
// иконок, три сверху / три снизу с разрывом под цифры статистики
// посередине — координаты сняты с фактического рендера файла.
const NATIVE_ROW_H = 145;
const ROW_H = 72; // высота ряда на экране — подобрана так, чтобы весь блок Stats (3 ряда + текст + 3 ряда) помещался в один экран без прокрутки на типичных высотах
const SWAY_BUFFER = 90; // запас с каждой стороны под свайп (> макс. амплитуды)

// Один ряд — бесконечно замощённый по горизонтали срез картинки
// (background-repeat: repeat-x), который плавно качается влево-вправо.
// repeat-x убирает нужду в отдельной логике "растянуть под ширину экрана"
// (FullBleedScale и т.п.) — ряд сам покрывает любую ширину страницы без
// искажений, а свайп всегда закрыт соседней копией той же картинки, швов
// не видно. У каждого ряда свои (случайные, только на клиенте — без
// рассинхрона с сервером) амплитуда/длительность/фаза, чтобы ряды качались
// вразнобой, а не синхронно — просьба "рандомно, каждый по-своему".
function StatsRow({ nativeY }: { nativeY: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const amplitude = 30 + Math.random() * 40; // 30–70px
    const duration = 7 + Math.random() * 6; // 7–13s, туда-обратно
    const direction = Math.random() < 0.5 ? -1 : 1;
    const tween = gsap.to(ref.current, {
      x: amplitude * direction,
      duration,
      delay: Math.random() * 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const scale = ROW_H / NATIVE_ROW_H;
  const tileWidth = 1440 * scale;
  const tileHeight = 1024 * scale;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: ROW_H }}>
      <div
        ref={ref}
        className="absolute inset-y-0"
        style={{
          left: -SWAY_BUFFER,
          width: `calc(100% + ${SWAY_BUFFER * 2}px)`,
          backgroundImage: "url(/cases/case-01/sections/stats-bg.svg)",
          backgroundRepeat: "repeat-x",
          backgroundSize: `${tileWidth}px ${tileHeight}px`,
          backgroundPosition: `0px ${-nativeY * scale}px`,
        }}
      />
    </div>
  );
}

export default function StatsRows({ nativeYs }: { nativeYs: number[] }) {
  return (
    <div className="flex w-full flex-col gap-[14px] opacity-90">
      {nativeYs.map((y) => (
        <StatsRow key={y} nativeY={y} />
      ))}
    </div>
  );
}
