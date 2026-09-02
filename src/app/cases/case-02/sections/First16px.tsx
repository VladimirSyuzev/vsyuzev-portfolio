"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761). Заголовок
// 32px, два абзаца слева, итоговая мысль с подчёркиванием.
//
// Иконка (Figma node 2009:12797, left 726 / top 318, 640×640) — два слоя
// одного размера, наложенные друг на друга:
//   состояние 1 — 16×16-версия (node 2009:12796), укрупнённая до 640:
//     «чанки», толстые формы — как выглядит иконка 16px в увеличении;
//   состояние 2 — детальная 640-версия (node 2383:21157): тонкие линии,
//     скругления, доп. детали.
// По просьбе: пина больше нет. Доходя до иконки при обычном скролле
// страницы, за ОДНО движение верхний слой (состояние 1) кроссфейдится в
// состояние 2 — «маленькую версию довели до большой». Разовый триггер,
// не scrub: никакого скролл-джекинга и артефактов входа в пин.
const A = "/cases/case-02/sections";

const BOX = { left: 726, top: 318 };
const SECTION_H = 1200;

export default function First16px() {
  const s1Ref = useRef<HTMLImageElement>(null); // состояние 1 — 16px @640
  const s2Ref = useRef<HTMLImageElement>(null); // состояние 2 — детальная 640
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !s1Ref.current || !s2Ref.current) return;
      gsap.set(s1Ref.current, { autoAlpha: 1, scale: 1 });
      gsap.set(s2Ref.current, { autoAlpha: 0, scale: 0.93 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: s1Ref.current, start: "top 62%", once: true },
      });
      tl.to(s1Ref.current, { autoAlpha: 0, scale: 1.05, duration: 0.5, ease: "power2.inOut" }).to(
        s2Ref.current,
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)", clearProps: "opacity,visibility,transform" },
        "-=0.38",
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <section className="relative w-full bg-[#fafafa]" style={{ height: SECTION_H }}>
      <div className="relative mx-auto w-[1440px]" style={{ height: SECTION_H }}>
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-[#121212]">сначала 16px</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
          Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px. Работу всегда начинали
          с маленькой версии.
        </p>
        <p className="absolute left-[46px] top-[221px] w-[505px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
          После её утверждения создавали большую. Это было не простое масштабирование: менялись
          пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали. Большая
          версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.
        </p>

        {/* Иконка — два слоя 640×640, кроссфейд состояние 1 → состояние 2. */}
        <div className="absolute size-[640px]" style={{ left: BOX.left, top: BOX.top }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={s2Ref}
            alt="Иконка Key Management Service, детальная версия 640×640"
            className="absolute inset-0 block size-full max-w-none will-change-transform"
            src={`${A}/icon16-black.svg`}
            draggable={false}
            style={{
              transformOrigin: "50% 50%",
              opacity: reduced ? 1 : 0,
              transform: reduced ? "none" : "scale(0.93)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={s1Ref}
            alt="Иконка Key Management Service в размере 16×16, укрупнённая"
            className="absolute inset-0 block size-full max-w-none will-change-transform"
            src={`${A}/icon16-blue.svg`}
            draggable={false}
            style={{ transformOrigin: "50% 50%", opacity: reduced ? 0 : 1 }}
          />
        </div>

        {/* Доодл-«стрелки» (Figma node 2383:21170). */}
        <Reveal variant="doodle" className="absolute left-[481px] top-[655px] h-[139px] w-[140px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/icon16-doodle.svg`} />
        </Reveal>

        {/* Подчёркивание под итоговой мыслью (Figma node 2383:21156). */}
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute"
          style={{ left: 161, top: 972, width: 518, height: 33 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full" src={`${A}/icon16-underline.svg`} />
        </Reveal>

        <p className="absolute left-[46px] top-[853px] w-[589px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          Маленький размер
          <br />
          проверял главное: силуэт, композицию и читаемость.
        </p>
      </div>
    </section>
  );
}
