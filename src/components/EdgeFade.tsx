import type { CSSProperties } from "react";

// Затухание краёв трека до цвета секции на экранах шире 1440.
//
// Раньше край-фейд делался через `mask-image` (см. edgeFadeMaskStyle). Но
// `mask` на предке в Chrome отключает `backdrop-filter` (frost) у потомков —
// на >1440 у карточек <GlassBubble> пропадал стеклянный эффект, и линейка-
// риска рендерилась резкими линиями поверх полупрозрачного фона. Здесь тот
// же визуальный результат на тёмном фоне: две градиентные полосы ПОВЕРХ
// трека в зоне гаттера (край экрана → край центральной 1440-колонки), без
// какого-либо `mask` на предках.
//
// className/style — позиционирование обёртки. По умолчанию `absolute inset-0`
// (когда EdgeFade — ребёнок самого трека). Для кейса 3, где трек — нативный
// скролл-контейнер, EdgeFade кладётся СНАРУЖИ него и позиционируется вручную.
export default function EdgeFade({
  width,
  color = "#121212",
  className,
  style,
}: {
  width: number | null | undefined;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  if (!width || width <= 1440) return null;
  const gutter = (width - 1440) / 2;
  if (gutter < 1) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none z-10 ${className ?? "absolute inset-0"}`}
      style={style}
    >
      <div
        className="absolute inset-y-0 left-0"
        style={{ width: gutter, background: `linear-gradient(to right, ${color}, transparent)` }}
      />
      <div
        className="absolute inset-y-0 right-0"
        style={{ width: gutter, background: `linear-gradient(to left, ${color}, transparent)` }}
      />
    </div>
  );
}
