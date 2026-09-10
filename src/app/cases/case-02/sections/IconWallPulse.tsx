"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";

// Анимация стены(-ен) иконок в блоке «Итог». Волной проходит по всем плиткам:
// каждая по очереди увеличивается на 10 %, перекрашивается в #2B9FFE и
// возвращается в исходный серый; горизонтальные соседи в этот момент чуть
// раздвигаются. Иконки — инлайн-SVG (см. Summary.tsx), каждая плитка
// помечена классом .si и имеет свой fill; GSAP тянет fill и scale прямо по
// элементам <g>.
//
// На странице может быть НЕСКОЛЬКО `.summary-wall` одновременно — разные
// раскладки для 375/834+ (см. Summary.tsx), скрытые друг от друга через CSS
// (`hidden`/`sm:hidden`). Каждая стена запускает свою волну независимо;
// число колонок в сетке (для «соседей» слева/справа) берётся из её
// `data-cols`, иначе дефолт 9 (десктопная раскладка).
//
// Цикл: волна стартует, когда блок входит в экран, и повторяется
// бесконечно с паузой 3 с между проходами; за экраном таймлайн ставится
// на паузу, при возврате — продолжает (toggleActions).
const GRAY = "#cccccc";
const BLUE = "#2b9ffe";
const DEFAULT_COLS = 9;
const STEP = 0.1725; // задержка старта между соседними иконками (−15 % к темпу)
const PULSE = 0.506; // длительность одного «удара» (туда-обратно, −15 % к темпу)
const PUSH = 5; // на сколько px расходятся соседи
const LOOP_DELAY = 3; // пауза между проходами волны, с

// `ready` — сигнал, что инлайн-SVG стен иконок уже вставлены в DOM
// (Summary.tsx подтягивает их fetch-ем после монтирования). Без него
// useGSAP отрабатывает один раз до загрузки SVG, не находит `.si` и волна
// никогда не запускается.
export default function IconWallPulse({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ready) return;
      const walls = gsap.utils.toArray<HTMLElement>(".summary-wall");
      if (!walls.length) return;

      let built = false;
      walls.forEach((wall) => {
        const icons = gsap.utils.toArray<SVGGElement>(".si", wall);
        if (!icons.length) return;
        built = true;
        const cols = Number(wall.dataset.cols) || DEFAULT_COLS;

        gsap.set(icons, { transformOrigin: "50% 50%" });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: LOOP_DELAY,
          scrollTrigger: {
            trigger: wall,
            start: "top 65%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
          defaults: { ease: "sine.inOut" },
        });

        const half = PULSE / 2;

        icons.forEach((el, i) => {
          const at = i * STEP;
          const row = Math.floor(i / cols);

          tl.to(el, { scale: 1.1, fill: BLUE, duration: half }, at).to(
            el,
            { scale: 1, fill: GRAY, duration: half },
            at + half
          );

          const left = icons[i - 1];
          if (left && Math.floor((i - 1) / cols) === row) {
            tl.to(left, { x: -PUSH, duration: half, overwrite: "auto" }, at).to(
              left,
              { x: 0, duration: half, overwrite: "auto" },
              at + half
            );
          }
          const right = icons[i + 1];
          if (right && Math.floor((i + 1) / cols) === row) {
            tl.to(right, { x: PUSH, duration: half, overwrite: "auto" }, at).to(
              right,
              { x: 0, duration: half, overwrite: "auto" },
              at + half
            );
          }
        });
      });

      // Стены иконок грузятся fetch-ем уже после первого layout/`load`, а
      // ScrollTrigger кэширует start/end в момент создания. Без refresh триггер
      // указывает на устаревшую позицию секции (высота страницы ещё росла по
      // мере догрузки картинок) и волна не стартует.
      if (built) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    },
    { dependencies: [reduced, ready] }
  );

  return null;
}
