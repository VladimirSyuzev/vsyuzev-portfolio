"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { GLASS_BUBBLE } from "@/lib/glass";

// 04 Процесс — 1:1 из актуальной Figma (node 2009:12647, высота 987).
// Пользователь сделал раздел ТЁМНЫМ full-bleed и убрал фрейм «варианты»:
// остались дисплейный заголовок «04 ПРОЦЕСС» (175px), вводный текст в два
// абзаца слева, трек этапов (node 2013:14226) и стрелка-доодл «→» у конца
// трека. Механика трека — 1:1 как «Построение процесса» в кейсе 1
// (Pipeline.tsx): окно во всю ширину экрана, наведённое колесо мыши гонит
// ленту горизонтально (нативный scrollLeft), стекло-бабл — общий
// GLASS_BUBBLE (src/lib/glass.ts).
const A = "/cases/case-02/sections";

const STEPS = [
  { n: "01", title: "Анализ", desc: "Изучаем метафору сервиса и требования клиента" },
  { n: "02", title: "Референсы", desc: "Собираем визуальные ориентиры нового стиля" },
  { n: "03", title: "Эскизы", desc: "Проверяем несколько вариантов композиции\nи формы" },
  { n: "04", title: "Ревью", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "16×16 px", desc: "Отрабатываем силуэт, баланс и читаемость" },
  { n: "06", title: "640×640 px", desc: "Адаптируем форму для крупного размера, добавляя детали" },
  { n: "07", title: "Финализация", desc: "Проверяем, оформляем и передаем результат клиенту" },
];

const PITCH = 340; // шаг между карточками (x в Figma: 0, 340, 680 … 2040)

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState({ left: 46, right: 1440 / 2 - 164 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      const gutter = Math.max(0, (w - 1440) / 2);
      setPadding({ left: 46 + gutter, right: w / 2 - 164 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (!el) return;
      const delta = e.deltaY;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      el.scrollLeft += delta;
      e.preventDefault();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[987px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[39px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Процесс</p>
        </div>

        <div className="absolute left-[46px] top-[359px] flex w-[498px] flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>
            После того как основные принципы стали понятны, мы превратили их в рабочий процесс и
            зафиксировали внутренние правила: работу с метафорами, последовательность этапов и
            критерии перехода между ними.
          </p>
          <p>
            Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок,
            даже когда официальный гайдлайн продолжал развиваться.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-[46px] top-[580px] h-[286px] w-[1348px] max-w-none opacity-60"
          src={`${A}/process-stripes.svg`}
        />

        {/* Стрелка-доодл «→» у конца трека (Figma node 2437:54096 → 1241 / 878, 99×63). */}
        <Reveal variant="doodle" className="absolute left-[1241px] top-[878px] z-10 h-[63px] w-[99px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/process-arrow.svg`} />
        </Reveal>
      </div>

      {/* Окно трека — во всю ширину экрана, нативный горизонтальный скролл
          со скрытым скроллбаром (Figma track 2013:14226 → y660). */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute left-0 top-[620px] h-[205px] w-full overflow-x-auto"
        style={{ paddingLeft: padding.left, paddingRight: padding.right, paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="relative h-[125px] w-[2368px]">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`absolute flex h-[125px] w-[328px] flex-col justify-center gap-[8px] border-[#008cff] ${GLASS_BUBBLE}`}
              style={{ left: i * PITCH, top: 0 }}
            >
              <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
                {s.n}
              </p>
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">
                {s.title}
              </p>
              <p className="whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
