"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";

// «Зум энд кроп» — ОДНО изображение (state-2.svg, полная композиция всех
// 7 категорий), которое непрерывно ТРАНСФОРМИРУЕТСЯ: окно пропорционально
// растёт, картинка внутри пропорционально уменьшается — никакой подмены
// файлов. state-1.svg и state-2.svg, которые дал пользователь, — это
// СКРИНШОТЫ одной и той же композиции в двух состояниях (референс, как
// должно выглядеть), а не два раздельных ассета для показа.
//
// Точный scale/offset между состояниями найден не на глаз, а сравнением
// координат ОДНИХ И ТЕХ ЖЕ элементов в обоих SVG-файлах напрямую в
// исходном коде: у категории "Actions" в state-2.svg общий фон-подложка —
// rect(x=0,y=14.7305, w=222.302,h=652.716), а у state-1.svg аналогичный
// фон — rect(y=-1.66406, w=838.331,h=2461.48). Отношение — 3.77114
// (совпадает по ширине/высоте/радиусу скругления с точностью до 0.01%).
// Подставив тот же коэффициент в позицию первой иконки-карточки
// (11.8242,26.5547 → ожидаем 44.5918,42.9297 из state-1), масштаб один в
// один сошёлся по X (0 смещения), но по Y — нет: понадобился ДОПОЛНИТЕЛЬНЫЙ
// сдвиг -57.2148 (не просто общий масштаб от угла (0,0), а сначала
// масштаб, потом сдвиг вверх) — с ним расчётная позиция (44.59, 42.93)
// совпала с реальной state-1.svg с точностью до 0.005px.
const STATE2 = "/cases/case-01/sections/task-states/state-2.svg";
const NATIVE2 = { w: 1348, h: 703 };
const WINDOW_START = { w: 838, h: 525 };
const WINDOW_END = { w: 1348, h: 703 };
const SCALE_START = 3.77114;
const SCALE_END = 1;
const OFFSET_Y_START = -57.2148;
const OFFSET_Y_END = 0;

// Пин: анимация не должна идти ОДНОВРЕМЕННО со скроллом страницы — блок
// встаёт на якорь (top top), дальше скролл крутит прогресс 0→1, страница
// физически замирает, и только по завершении отпускает скролл дальше (та
// же техника, что в "01 Проблема"). anticipatePin — чтобы на быстром
// скролле (одним рывком колеса) пин срабатывал СРАЗУ на нужном пикселе, а
// не с опозданием на кадр, когда картинка уже "уезжает".
const SCRUB_PX = 640;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function TaskZoomCrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !pinRef.current) return;

      function render(t: number) {
        const w = lerp(WINDOW_START.w, WINDOW_END.w, t);
        const h = lerp(WINDOW_START.h, WINDOW_END.h, t);
        const scale = lerp(SCALE_START, SCALE_END, t);
        const offsetY = lerp(OFFSET_Y_START, OFFSET_Y_END, t);
        if (windowRef.current) {
          windowRef.current.style.width = `${w}px`;
          windowRef.current.style.height = `${h}px`;
        }
        if (imgRef.current) {
          imgRef.current.style.width = `${NATIVE2.w * scale}px`;
          imgRef.current.style.height = `${NATIVE2.h * scale}px`;
          imgRef.current.style.top = `${offsetY}px`;
        }
      }

      render(0);

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: `+=${SCRUB_PX}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // При "уменьшить анимацию" — без pin/scroll-jack, сразу конечное
  // состояние (все 7 категорий), обычный поток.
  if (reduced) {
    return (
      <div className="relative flex w-full justify-center bg-[#fafafa]" style={{ height: WINDOW_END.h }}>
        <div className="relative w-[1440px]" style={{ height: WINDOW_END.h }}>
          <div className="absolute left-[46px] top-0 overflow-hidden" style={{ width: WINDOW_END.w, height: WINDOW_END.h }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Витрина категорий иконок — аудит библиотеки"
              src={STATE2}
              className="block"
              style={{ width: NATIVE2.w, height: NATIVE2.h }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: WINDOW_END.h + SCRUB_PX }}>
      <div ref={pinRef} className="relative flex w-full items-start justify-center overflow-hidden bg-[#fafafa]" style={{ height: WINDOW_END.h }}>
        <div className="relative w-[1440px]" style={{ height: WINDOW_END.h }}>
          <div ref={windowRef} className="absolute left-[46px] top-0 overflow-hidden" style={{ width: WINDOW_START.w, height: WINDOW_START.h }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              alt="Витрина категорий иконок — аудит библиотеки"
              src={STATE2}
              className="absolute left-0 max-w-none"
              style={{ width: NATIVE2.w * SCALE_START, height: NATIVE2.h * SCALE_START, top: OFFSET_Y_START }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
