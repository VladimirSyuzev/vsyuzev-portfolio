"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/gsap";
import { useDrag } from "@/lib/useDrag";

// useStepCarousel — общая механика «шаговой» карусели в стиле «Вариантов»
// (VariantsCarousel): активный элемент по центру и крупный, остальные мельче;
// перелистывание по ОДНОМУ элементу за жест. Хук не рисует разметку — отдаёт
// состояние (index, dragDX) и привязки (trackRef, bind) для трека.
//
// Управление:
//  · колесо мыши / горизонтальный жест трекпада: ОДИН ЖЕСТ = ОДИН ШАГ.
//    Жест — непрерывный поток wheel-событий (пауза >160мс = конец). Трекпад
//    после флика досылает «хвост» инерции ~1–2с — после шага остаток потока
//    проглатывается (preventDefault); новый шаг — только после паузы, нотча
//    мыши (одинаковые крупные дельты 100/120) или нового импульса того же
//    направления. Дельты обратного знака внутри потока (отскок/«дребезг»)
//    новый жест НЕ открывают — иначе карусель откатывалась бы назад. Если
//    жест начался на краю (дальше листать некуда) — весь поток уходит
//    странице: ловушки на карусели нет.
//  · перетаскивание (мышь/тач): ≥70px или быстрый флик = шаг, на краях
//    резинка (×0.32);
//  · step(±1) — для боковых стрелок ‹ ›.
export function useStepCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [dragDX, setDragDX] = useState(0);
  const idxRef = useRef(0);
  const reduced = useReducedMotion();
  const last = count - 1;

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  const step = (dir: number) => setIndex((cur) => Math.max(0, Math.min(last, cur + dir)));

  const { dragging, bind } = useDrag({
    onMove: (dx) => {
      const cur = idxRef.current;
      const atEdge = (dx > 0 && cur === 0) || (dx < 0 && cur === last);
      setDragDX(atEdge ? dx * 0.32 : dx);
    },
    onEnd: (dx, vx) => {
      setDragDX(0);
      let d = 0;
      if (dx <= -70 || vx <= -0.4) d = 1;
      else if (dx >= 70 || vx >= 0.4) d = -1;
      step(d);
    },
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced) return;
    let acc = 0;
    let lastT = 0;
    let consumed = false; // в этом жесте шаг уже сделан
    let pass = false; // жест отдан странице
    let minAbs = Infinity; // минимум |delta| после шага (детект нового импульса)
    let dirOfGesture = 0;
    let lockedUntil = 0;
    let lastAbs = 0;
    let lastDir = 0;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      // deltaMode: 0 — пиксели, 1 — строки (Firefox/мышь), 2 — страницы
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? 400 : 1;
      const dx = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit;
      if (!dx) return;
      const now = performance.now();
      const abs = Math.abs(dx);
      const dir = dx > 0 ? 1 : -1;
      const gap = now - lastT;
      lastT = now;
      const notch = abs >= 50 && abs === lastAbs && dir === lastDir;
      lastAbs = abs;
      lastDir = dir;

      if (gap > 160) {
        acc = 0;
        consumed = false;
        pass = false;
        minAbs = Infinity;
        dirOfGesture = 0;
      } else if (consumed && now >= lockedUntil) {
        minAbs = Math.min(minAbs, abs);
        if (notch || (dir === dirOfGesture && abs >= 20 && abs >= minAbs * 1.8)) {
          acc = 0;
          consumed = false;
          pass = false;
          minAbs = Infinity;
        }
      }

      if (pass) return;
      if (consumed) {
        e.preventDefault(); // глотаем хвост инерции
        return;
      }

      const cur = idxRef.current;
      if ((dir < 0 && cur === 0) || (dir > 0 && cur === last)) {
        pass = true; // на краю — страница листается дальше как обычно
        return;
      }
      e.preventDefault();
      acc += dx;
      if (Math.abs(acc) >= 40) {
        const d = acc > 0 ? 1 : -1; // направление берём ДО обнуления acc
        acc = 0;
        consumed = true;
        dirOfGesture = d;
        minAbs = abs;
        lockedUntil = now + 350;
        setIndex((c) => Math.max(0, Math.min(last, c + d)));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [reduced, last]);

  return { trackRef, index, setIndex, step, dragging, bind, dragDX, reduced, last };
}
