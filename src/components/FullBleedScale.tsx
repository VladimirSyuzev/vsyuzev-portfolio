"use client";

import { useEffect, useRef, useState } from "react";

// FullBleedScale — растягивает фикс-1440 фон/картинку под фактическую
// ширину страницы РАВНОМЕРНО (scale по обеим осям, без искажения формы).
// Высота снаружи всегда равна исходной figma-высоте: когда ширина страницы
// больше 1440 и картинка становится выше самой себя, излишек обрезается
// снизу (overflow:hidden) — как background-size:cover, только без блюра.
// Текст/контент поверх сюда НЕ кладём — рисуем отдельным непомасштабированным
// слоем в центрированной 1440-сетке (см. cases/case-01/page.tsx), чтобы он
// совпадал по X с остальной (нерастягивающейся) версткой страницы при
// ширине экрана > 1440 — раньше текст прижимался к левому краю окна и
// "уползал" левее сетки остального контента.
export default function FullBleedScale({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
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

  return (
    <div ref={ref} className={className} style={{ width: "100%", height, overflow: "hidden" }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
