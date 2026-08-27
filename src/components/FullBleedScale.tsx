"use client";

import { useEffect, useRef, useState } from "react";

// FullBleedScale — растягивает фикс-1440 фон/картинку под фактическую
// ширину страницы РАВНОМЕРНО (scale по обеим осям, без искажения формы).
// Два режима:
// - mode="crop" (по умолчанию): высота снаружи всегда равна исходной
//   figma-высоте, излишек при масштабе >1 обрезается снизу (overflow:hidden)
//   — как background-size:cover. Годится для декоративного фона (Stats),
//   где обрезка нижней части текстуры не потеря контента.
// - mode="grow": обёртка НЕ обрезает — её height выставляется РАВНЫМ
//   реальной масштабированной высоте (height*scale), поэтому блок честно
//   раздвигает поток документа и следующий контент уезжает вниз, ничего не
//   срезается. Для Hero — раньше crop-режим на широких мониторах отрезал
//   нижний ряд иконок, что выглядело как "растянуто"/незакомплитная сетка.
// CSS transform НЕ двигает соседние элементы сам по себе — поэтому в обоих
// режимах обёртка явно задаёт себе height через style, иначе schedule
// одного transform: scale() на потомке ничего не сдвинет в потоке.
// Текст/контент поверх сюда НЕ кладём — рисуем отдельным непомасштабированным
// слоем в центрированной 1440-сетке (см. cases/case-01/page.tsx), чтобы он
// совпадал по X с остальной (нерастягивающейся) версткой страницы при
// ширине экрана > 1440.
export default function FullBleedScale({
  width,
  height,
  mode = "crop",
  children,
  className,
}: {
  width: number;
  height: number;
  mode?: "crop" | "grow";
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const outerHeight = mode === "grow" ? height * scale : height;

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: "100%", height: outerHeight, overflow: mode === "crop" ? "hidden" : "visible" }}
    >
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
