"use client";

import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";

// Анимация стены иконок в блоке «Итог». Волной проходит по всем 36 плиткам:
// каждая по очереди увеличивается на 10 %, перекрашивается в #2B9FFE и
// возвращается в исходный серый; горизонтальные соседи в этот момент чуть
// раздвигаются. Иконки — инлайн-SVG (см. Summary.tsx), каждая плитка
// помечена классом .si и имеет свой fill; GSAP тянет fill и scale прямо по
// элементам <g>.
//
// Цикл: волна стартует, когда блок входит в экран, и повторяется
// бесконечно с паузой 3 с между проходами; за экраном таймлайн ставится
// на паузу, при возврате — продолжает (toggleActions).
const GRAY = "#cccccc";
const BLUE = "#2b9ffe";
const COLS = 9;
const STEP = 0.15; // задержка старта между соседними иконками
const PULSE = 0.44; // длительность одного «удара» (туда-обратно)
const PUSH = 5; // на сколько px расходятся соседи
const LOOP_DELAY = 3; // пауза между проходами волны, с

export default function IconWallPulse() {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const wall = document.querySelector(".summary-wall");
      if (!wall) return;
      const icons = gsap.utils.toArray<SVGGElement>(".summary-wall .si");
      if (!icons.length) return;

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
        const row = Math.floor(i / COLS);

        tl.to(el, { scale: 1.1, fill: BLUE, duration: half }, at).to(
          el,
          { scale: 1, fill: GRAY, duration: half },
          at + half
        );

        const left = icons[i - 1];
        if (left && Math.floor((i - 1) / COLS) === row) {
          tl.to(left, { x: -PUSH, duration: half, overwrite: "auto" }, at).to(
            left,
            { x: 0, duration: half, overwrite: "auto" },
            at + half
          );
        }
        const right = icons[i + 1];
        if (right && Math.floor((i + 1) / COLS) === row) {
          tl.to(right, { x: PUSH, duration: half, overwrite: "auto" }, at).to(
            right,
            { x: 0, duration: half, overwrite: "auto" },
            at + half
          );
        }
      });
    },
    { dependencies: [reduced] }
  );

  return null;
}
