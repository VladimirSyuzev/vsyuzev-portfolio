"use client";

import { useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// siteEase — GSAP-эквивалент CSS cubic-bezier(0.16, 1, 0.3, 1) (--ease-site,
// globals.css), заданный тем же способом, каким CSS описывает кривую: старт
// (0,0), две контрольные точки, конец (1,1). Раньше Hero/About/Contacts
// использовали "родные" GSAP-кривые power2.out/power3.out — визуально
// другой темп, чем у CSS-переходов (Header/main-shell/аккордеон) — по
// просьбе свести весь сайт к одному "почерку" движения.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("siteEase", "M0,0 C0.16,1 0.3,1 1,1");
}

// Общая проверка системной настройки "уменьшить анимацию" — используется
// везде, где запускается gsap.from()/rAF-анимация, чтобы контент сразу
// появлялся в конечном виде вместо движения/масштабирования/сдвига.
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// useReducedMotion — React-хук поверх prefersReducedMotion(), безопасный
// для SSR-гидратации. Найдено между делом (проверка ребилда pipeline —
// StatsReveal/FullScreenCrossfade/PipelineFlow вызывали
// prefersReducedMotion() ПРЯМО в теле рендера, чтобы выбрать JSX-ветку —
// на сервере window нет, функция всегда возвращает false, но на клиенте
// ПЕРВЫЙ рендер уже видит настоящий window.matchMedia — если у
// пользователя реально включено "уменьшить анимацию" в ОС, клиентский
// HTML ПЕРВОГО рендера отличался бы от серверного, React бросает
// hydration mismatch — реально воспроизведено Playwright с
// contextOptions.reducedMotion:"reduce"). useSyncExternalStore — не
// useState+useEffect (первая версия ловила react-hooks/set-state-in-
// effect — синхронный setState внутри эффекта) — это как раз штатный
// API именно под эту задачу (подписка на внешний, изменяющийся мимо
// React источник данных): getServerSnapshot возвращает false ВСЕГДА
// (совпадает с сервером на этапе гидратации), getSnapshot — настоящее
// значение на клиенте.
export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

// "Волна" — названная и одобренная пользователем анимация (впервые
// построена для ячеек таблицы в "Аудит библиотеки", AuditReveal.tsx):
// диагональный reveal сетки ячеек. Элементы группируются по антидиагонали
// (row+col от начала сетки) — первая ячейка [0,0] одна, затем [1,0]+[0,1]
// вместе, затем [2,0]+[1,1]+[0,2] и т.д., с небольшим фиксированным шагом
// между группами. Возвращает ФУНКЦИЮ для gsap-опции stagger (не число/
// объект — только функция даёt точный контроль над порядком антидиагонали;
// обычный числовой/grid-based stagger идёт по индексу или euclid-расстоянию,
// не по этой диагонали). По просьбе — переиспользовать для ЛЮБой будущей
// анимации появления сетки/грида ячеек в проекте, не только там, где
// впервые применили.
export function waveStagger(cols: number, step = 0.045) {
  return (index: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return (row + col) * step;
  };
}

export { gsap, ScrollTrigger };
