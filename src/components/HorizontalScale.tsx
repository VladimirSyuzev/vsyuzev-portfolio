"use client";

import { useEffect, useRef, useState } from "react";

// HorizontalScale — растягивает фикс-1440 фон/картинку ТОЛЬКО по ширине
// (scaleX) под фактическую ширину страницы, высота не трогается. Для
// блоков вида "текст остаётся на месте и своего размера, а фон и
// изображения увеличиваются по ширине страницы": оборачиваем в это ТОЛЬКО
// фоновый/декоративный слой, текст рисуем отдельным непомасштабированным
// слоем поверх (см. cases/case-01/page.tsx).
export default function HorizontalScale({
  width,
  children,
  className,
}: {
  width: number;
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
    <div ref={ref} className={className} style={{ width: "100%", overflow: "hidden" }}>
      <div style={{ width, transform: `scaleX(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
