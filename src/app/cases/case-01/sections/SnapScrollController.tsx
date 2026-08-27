"use client";

import { useEffect, useRef } from "react";

// SnapScrollController — "1 скролл = 1 блок" СТРОГО между секциями с
// data-snap-stop (Stats-Проблема-Экран-Задача), обычный скролл везде
// вокруг. Раньше это было через CSS scroll-snap-type:mandatory —
// застревало на границах цепочки (нельзя было уйти скроллом ни выше
// первого снап-пункта — к обложке, ни ниже последнего — к «Аудит
// библиотеки»): mandatory не отпускал скролл, если рядом с границей нет
// ещё одного снап-пункта. Здесь то же самое сделано вручную на wheel: за
// пределами диапазона [первый .. последний snap-stop] колесо работает как
// обычно, внутри — один тик колеса анимированно двигает на один блок,
// а попытка уйти дальше последнего/выше первого просто не перехватывается.
const EPS = 4;
const ANIMATION_MS = 650;

export default function SnapScrollController() {
  const animatingRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function getStops() {
      return Array.from(document.querySelectorAll<HTMLElement>("[data-snap-stop]")).map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      );
    }

    function onWheel(e: WheelEvent) {
      const stops = getStops();
      if (stops.length < 2) return;

      const y = window.scrollY;
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (y < first - EPS || y > last + EPS) return; // вне зоны — обычный скролл, событие не трогаем

      if (animatingRef.current) {
        e.preventDefault();
        return;
      }

      let idx = 0;
      for (let i = 0; i < stops.length; i++) {
        if (y >= stops[i] - EPS) idx = i;
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir === 1 && idx >= stops.length - 1) return; // на последнем блоке, дальше вниз — отпускаем
      if (dir === -1 && idx <= 0) return; // на первом блоке, дальше вверх — отпускаем

      e.preventDefault();
      const target = stops[idx + dir];
      animatingRef.current = true;
      window.scrollTo({ top: target, behavior: "smooth" });
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = setTimeout(() => {
        animatingRef.current = false;
      }, ANIMATION_MS);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, []);

  return null;
}
