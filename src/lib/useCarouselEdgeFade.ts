"use client";

import { useEffect, useState, type CSSProperties, type RefObject } from "react";
import { edgeFadeMaskStyle } from "@/lib/edgeFadeMask";

// useCarouselEdgeFade — маска-затухание по краям трека шаговой карусели
// (как у «Вариантов»: карточки у краёв экрана уходят в прозрачность, а не
// режутся жёстко). Меряет РЕАЛЬНУЮ ширину трека и фактический зазор от краёв
// трека до краёв активного элемента (чтобы фейд не наезжал на ключевое
// изображение), строит градиент через общий edgeFadeMaskStyle (adaptive).
// Замер повторяется после перелистывания (transition сдвига ~550мс), на
// resize и scroll. Маску вешать на сам трек (НЕ на предка кнопок ‹ › — mask
// отключает у потомков backdrop-filter).
export function useCarouselEdgeFade(
  trackRef: RefObject<HTMLElement | null>,
  activeSelector: string,
  deps: unknown[],
): CSSProperties | undefined {
  const [width, setWidth] = useState(0);
  const [clear, setClear] = useState<{ l: number; r: number } | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const tr = track.getBoundingClientRect();
      if (!tr.width) return;
      setWidth(track.clientWidth);
      const active = track.querySelector<HTMLElement>(activeSelector);
      if (!active) return;
      // активный элемент может быть группой: берём границы по его содержимому
      const cr = active.getBoundingClientRect();
      setClear({ l: cr.left - tr.left, r: tr.right - cr.right });
    };
    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const t = window.setTimeout(measure, 620);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef, activeSelector, ...deps]);

  return edgeFadeMaskStyle(width, { adaptive: true, clearLeft: clear?.l, clearRight: clear?.r });
}
