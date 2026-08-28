"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/gsap";

// «Зум энд кроп» — 2 РЕАЛЬНЫХ файла пользователя как есть, без пересчёта:
// state-1.svg (838×525, "Actions" при масштабе 1) — стартовый кадр,
// state-2.svg (1348×703, все 7 категорий) — конечный. Раньше стартовый кадр
// получался математически из state-2 (кроп+масштаб), визуально не совпадало
// с настоящим state-1.svg — теперь state-1 показывается как есть.
//
// Пин: анимация не должна идти ОДНОВРЕМЕННО со скроллом страницы. Блок
// "Задача" встаёт на своё якорное место (top top) — только тогда включается
// pin: страница физически замирает, скролл крутит прогресс 0→1 анимации, и
// только когда она закончена — pin отпускает, скролл едет дальше. Ровно та
// же техника, что в "01 Проблема" (см. ProblemScreen.tsx: pin + порогово-
// переключаемый gsap.to() для дискретной смены состояния, а НЕ scrub
// напрямую на opacity — см. память "Scrub-freeze pattern"). Здесь ЭТА же
// техника переключает state-1→state-2, а рост окна/масштаб — непрерывный
// scrub (это не дискретное состояние, фризов не даёт).
const STATE1 = "/cases/case-01/sections/task-states/state-1.svg";
const STATE2 = "/cases/case-01/sections/task-states/state-2.svg";
const NATIVE2 = { w: 1348, h: 703 };
const START = { w: 838, h: 525 };
const END = { w: 1348, h: 703 };
const START_SCALE2 = END.w / START.w; // масштаб state-2 под окно старта, пока идёт свап (≈1.608)
const SWAP_T = 0.06; // порог прогресса пина, на котором state-1 меняется на state-2
const SCRUB_PX = 640; // сколько px скролла отведено собственно на анимацию, пока страница запинена

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function TaskZoomCrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const state1Ref = useRef<HTMLImageElement>(null);
  const state2Ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !pinRef.current) return;

      const swap = { shown: 1 };
      function showState(n: 1 | 2) {
        if (swap.shown === n) return;
        swap.shown = n;
        gsap.to(state1Ref.current, { opacity: n === 1 ? 1 : 0, duration: 0.3, ease: "siteEase" });
        gsap.to(state2Ref.current, { opacity: n === 2 ? 1 : 0, duration: 0.3, ease: "siteEase" });
      }

      function renderSize(t: number) {
        const w = lerp(START.w, END.w, t);
        const h = lerp(START.h, END.h, t);
        const scale2 = lerp(START_SCALE2, 1, t);
        if (windowRef.current) {
          windowRef.current.style.width = `${w}px`;
          windowRef.current.style.height = `${h}px`;
        }
        if (state2Ref.current) {
          state2Ref.current.style.width = `${NATIVE2.w * scale2}px`;
          state2Ref.current.style.height = `${NATIVE2.h * scale2}px`;
        }
      }

      renderSize(0);

      function update(self: ScrollTrigger) {
        showState(self.progress < SWAP_T ? 1 : 2);
        renderSize(Math.max(0, (self.progress - SWAP_T) / (1 - SWAP_T)));
      }

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: `+=${SCRUB_PX}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: update,
        onRefresh: update,
      });

      return () => st.kill();
    },
    { scope: wrapRef, dependencies: [reduced] }
  );

  // При "уменьшить анимацию" — без pin/scroll-jack, сразу конечное
  // состояние (все 7 категорий), обычный поток.
  if (reduced) {
    return (
      <div className="relative flex w-full justify-center bg-[#fafafa]" style={{ height: END.h }}>
        <div className="relative w-[1440px]" style={{ height: END.h }}>
          <div className="absolute left-[46px] top-0 overflow-hidden" style={{ width: END.w, height: END.h }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Витрина категорий иконок — аудит библиотеки"
              src={STATE2}
              className="block"
              style={{ width: END.w, height: END.h }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    // wrapRef — обычный поток, высота = END.h + запас скролла на саму
    // анимацию (SCRUB_PX). pinRef внутри — то, что реально пинится (на всю
    // ширину экрана + flex-центрирование 1440-канвы, как в ProblemScreen, а
    // не mx-auto — position:fixed игнорирует auto-margins).
    <div ref={wrapRef} className="relative w-full" style={{ height: END.h + SCRUB_PX }}>
      <div ref={pinRef} className="relative flex w-full items-start justify-center overflow-hidden bg-[#fafafa]" style={{ height: END.h }}>
        <div className="relative w-[1440px]" style={{ height: END.h }}>
          <div ref={windowRef} className="absolute left-[46px] top-0 overflow-hidden" style={{ width: START.w, height: START.h }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={state1Ref}
              alt="Витрина категорий иконок — аудит библиотеки, состояние 1"
              src={STATE1}
              className="absolute left-0 top-0 max-w-none"
              style={{ width: START.w, height: START.h }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={state2Ref}
              alt="Витрина категорий иконок — аудит библиотеки, состояние 2"
              src={STATE2}
              className="absolute left-0 top-0 max-w-none"
              style={{ width: NATIVE2.w * START_SCALE2, height: NATIVE2.h * START_SCALE2, opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
