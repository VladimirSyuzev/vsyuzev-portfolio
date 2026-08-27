"use client";

import { useEffect, useRef, useState } from "react";

// ResponsiveScale — оборачивает блок, свёрстанный под фиксированный canvas
// Figma (width×height в px), и масштабирует его целиком (transform: scale)
// под фактическую ширину страницы — пропорции и вся внутренняя раскладка
// остаются пиксель-в-пиксель как в макете на любой ширине экрана, вместо
// обрезки/центрирования на фиксированных 1440px. Высота обёртки пересчитывается
// от текущего scale, чтобы не ломать поток документа под блоком.
export default function ResponsiveScale({
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
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} className={className} style={{ width: "100%", height: Math.round(height * scale) }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
