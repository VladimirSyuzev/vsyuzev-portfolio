"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";

// Анимация стены иконок в блоке «Итог». По скроллу волной проходит по всем
// 36 плиткам: каждая по очереди увеличивается на 10 %, перекрашивается в
// #2B9FFE и возвращается в исходный серый; горизонтальные соседи в этот
// момент чуть раздвигаются. Иконки — инлайн-SVG (см. Summary.tsx),
// каждая плитка помечена классом .si и имеет свой fill; GSAP тянет fill и
// scale прямо по элементам <g>.
const GRAY = "#cccccc";
const BLUE = "#2b9ffe";
const COLS = 9;
const STEP = 0.09; // задержка старта между соседними иконками
const PULSE = 0.32; // длительность одного «удара» (туда-обратно)
const PUSH = 5; // на сколько px расходятся соседи

export default function IconWallPulse() {
  const ranRef = useRef(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || ranRef.current) return;
      const wall = document.querySelector(".summary-wall");
      if (!wall) return;
      const icons = gsap.utils.toArray<SVGGElement>(".summary-wall .si");
      if (!icons.length) return;

      gsap.set(icons, { transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wall, start: "top 65%", once: true },
        defaults: { ease: "sine.inOut" },
        onStart: () => {
          ranRef.current = true;
        },
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
