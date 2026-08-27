"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import TaskSectionFull from "./TaskSection";

// «Зум энд кроп» — окно с витриной категорий пропорционально растёт, а
// изображение внутри пропорционально уменьшается (то же самое явление,
// только не руками, а как в Figma между "состояние 1" (окно 838.33×524.315,
// масштаб контента 1 — видна только "Actions") и "состояние 2" (окно
// 1348×702.89, масштаб ≈0.2652 — видны все 7 категорий сразу, каждая
// обрезана по высоте окна). Оба состояния СВЕРЕНЫ по факту (см. metadata
// узлов 2284:43014/2284:43015): у обоих один и тот же left/top-якорь,
// растёт именно size, а не позиция — поэтому анимация это просто
// интерполяция width/height окна + scale контента, без отдельного "кадра".
const START = { w: 838.33, h: 524.315, scale: 1, offsetY: -55.5 };
const END = { w: 1348, h: 702.89, scale: 1348 / 5083.5, offsetY: 0 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function TaskZoomCrop() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !triggerRef.current) return;

      function render(t: number) {
        const w = lerp(START.w, END.w, t);
        const h = lerp(START.h, END.h, t);
        const scale = lerp(START.scale, END.scale, t);
        const offsetY = lerp(START.offsetY, END.offsetY, t);
        if (windowRef.current) {
          windowRef.current.style.width = `${w}px`;
          windowRef.current.style.height = `${h}px`;
        }
        if (offsetRef.current) offsetRef.current.style.top = `${offsetY}px`;
        if (scaleRef.current) scaleRef.current.style.transform = `scale(${scale})`;
      }

      render(0);

      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 75%",
        end: "bottom 40%",
        scrub: 0.4,
        onUpdate: (self) => render(self.progress),
      });

      return () => st.kill();
    },
    { scope: triggerRef }
  );

  return (
    // Внешний контейнер сразу занимает МАКСИМАЛЬный (конечный) размер —
    // растущее окно не должно "вылезать" за пределы своего родителя и
    // наезжать на соседний контент ниже по странице.
    <div ref={triggerRef} className="relative" style={{ width: END.w, height: END.h }}>
      <div ref={windowRef} className="absolute left-0 top-0 overflow-hidden" style={{ width: START.w, height: START.h }}>
        <div ref={offsetRef} className="absolute left-0" style={{ top: START.offsetY }}>
          <div ref={scaleRef} style={{ transform: `scale(${START.scale})`, transformOrigin: "top left" }}>
            <TaskSectionFull />
          </div>
        </div>
      </div>
    </div>
  );
}
