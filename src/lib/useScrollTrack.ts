"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "@/lib/useDrag";

// useScrollTrack — общая механика горизонтальной ленты для треков
// «процесс»/«построение процесса» (кейсы 1/2/3). Нативный
// overflow-x-auto (trackRef.scrollLeft), НЕ индекс карточки + transform:
//  · Драг/тач — свободная прокрутка 1:1 под пальцем + инерция на
//    отпускании. Можно пролистнуть сразу несколько карточек — не «по
//    одной за раз» (для этого touch-action:pan-y на самом элементе, чтобы
//    браузер не перехватывал горизонтальный тач-жест — им рулит сам bind).
//  · Колесо мыши/трекпад (десктоп, наведение на трек) — тоже двигает
//    ленту горизонтально. Слушатель нативный (addEventListener), а не
//    React onWheel — React вешает wheel как passive, preventDefault()
//    внутри synthetic-обработчика не сработает. На границах трека — не
//    перехватываем событие, отдаём странице (вертикальный скролл идёт
//    как обычно).
//  · scrollByStep(dir) — для стрелочек ‹ ›, на step px (smooth).
//  · canPrev/canNext — disabled-состояние стрелочек у краёв трека.
export function useScrollTrack(step = 680) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    el.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return; // край — странице
      e.preventDefault();
      el.scrollLeft += delta;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Драг — свободная прокрутка (без снапа к карточке), инерция на
  // отпускании: та же арифметика, что раньше была только в кейсе 3.
  const startSL = useRef(0);
  const inertia = useRef(0);
  const { dragging, bind } = useDrag({
    onStart: () => {
      cancelAnimationFrame(inertia.current);
      startSL.current = trackRef.current?.scrollLeft ?? 0;
    },
    onMove: (dx) => {
      if (trackRef.current) trackRef.current.scrollLeft = startSL.current - dx;
    },
    onEnd: (_dx, vx) => {
      const el = trackRef.current;
      if (!el) return;
      let v = -vx * 16;
      const tick = () => {
        if (Math.abs(v) < 0.5) return;
        el.scrollLeft += v;
        v *= 0.92;
        inertia.current = requestAnimationFrame(tick);
      };
      inertia.current = requestAnimationFrame(tick);
    },
  });
  useEffect(() => () => cancelAnimationFrame(inertia.current), []);

  const scrollByStep = useCallback(
    (dir: number) => {
      trackRef.current?.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [step],
  );

  return { trackRef, bind, dragging, canPrev, canNext, scrollByStep };
}
