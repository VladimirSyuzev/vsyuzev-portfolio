"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// «Зум энд кроп» — теперь на настоящих SVG-экспортах пользователя (2
// состояния витрины категорий из Figma), не на ручной DOM-реконструкции.
// Оба состояния — это ОДНА и та же композиция на разном масштабе:
// state-1.svg (838×525) показывает только "Actions" при масштабе 1,
// state-2.svg (1348×703) показывает все 7 категорий при масштабе ≈0.2652
// (222.3/838.33) — т.е. state-1 математически равен кропу state-2,
// увеличенному в 1/0.2652≈3.771 раза. Поэтому используется только
// state-2.svg как единственный источник: окно растёт с 838×525 до
// 1348×703, а сама картинка внутри масштабируется с 3.771 до 1 — то же
// самое "фрейм растёт/картинка внутри уменьшается", но без риска
// рассинхрона/скачка между двумя раздельными файлами.
const IMG = "/cases/case-01/sections/task-states/state-2.svg";
const NATIVE = { w: 1348, h: 703 };
const START = { w: 838, h: 525, scale: 1348 / 838 };
const END = { w: 1348, h: 703, scale: 1 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function TaskZoomCrop() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !triggerRef.current) return;

      function render(t: number) {
        const w = lerp(START.w, END.w, t);
        const h = lerp(START.h, END.h, t);
        const scale = lerp(START.scale, END.scale, t);
        if (windowRef.current) {
          windowRef.current.style.width = `${w}px`;
          windowRef.current.style.height = `${h}px`;
        }
        if (imgRef.current) {
          imgRef.current.style.width = `${NATIVE.w * scale}px`;
          imgRef.current.style.height = `${NATIVE.h * scale}px`;
        }
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
    // Внешний контейнер сразу занимает максимальный (конечный) размер —
    // растущее окно не должно наезжать на соседний контент ниже по странице.
    <div ref={triggerRef} className="relative" style={{ width: END.w, height: END.h }}>
      <div ref={windowRef} className="absolute left-0 top-0 overflow-hidden" style={{ width: START.w, height: START.h }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          alt="Витрина категорий иконок — аудит библиотеки"
          src={IMG}
          className="absolute left-0 top-0 max-w-none"
          style={{ width: NATIVE.w * START.scale, height: NATIVE.h * START.scale }}
        />
      </div>
    </div>
  );
}
