"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

// 04 Процесс — 1:1 из актуальной Figma (node 2009:12647, высота 991,
// трек "Процесс" node 2013:14226). Тот же паттерн, что «04 Построение
// процесса» в кейсе 1 (см. Pipeline.tsx): окно трека — во всю ширину
// экрана, наведённое колесо мыши гонит ленту карточек ГОРИЗОНТАЛЬНО
// (нативный scrollLeft, без пина), на границах трека колесо отдаётся
// странице. Заголовок/подложка/стрелка — в центрированной 1440-сетке.
// Стекло-эффект на карточках — GLASS radius 84 (Figma) → backdrop-blur-84.
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
    <div ref={sectionRef} className="relative h-[991px] w-full overflow-clip bg-[#fafafa]">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-[#121212]">Процесс</p>
        </div>

        <div className="absolute left-[556px] top-[455px] flex w-[670px] gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p className="w-[328px]">
            После того как основные принципы стали понятны, мы превратили их в рабочий процесс и
            зафиксировали внутренние правила: работу с метафорами, последовательность этапов и
            критерии перехода между ними.
          </p>
          <p className="w-[328px]">
            Документ стал опорой для команды и помогал сохранять единый стиль и качество иконок,
            даже когда официальный гайдлайн продолжал развиваться.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-[46px] top-[580px] h-[286px] w-[1348px] max-w-none"
          src={`${A}/process-stripes.svg`}
        />

        {/* Стрелка-доодл (Figma node 2284:45839 → 1217 / 477). */}
        <Reveal variant="doodle" className="absolute left-[1217px] top-[477px] z-10 h-[129px] w-[162px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/process-arrow.svg`} />
        </Reveal>
      </div>

      {/* Окно трека — во всю ширину экрана, нативный горизонтальный скролл
          со скрытым скроллбаром; отступы считаются от реальной ширины
          секции (см. Pipeline.tsx в кейсе 1). */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute left-0 top-[620px] h-[205px] w-full overflow-x-auto"
        style={{ paddingLeft: padding.left, paddingRight: padding.right, paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="relative h-[125px] w-[2380px]">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="absolute flex h-[125px] w-[328px] flex-col justify-center gap-[8px] overflow-clip rounded-[20px] border-l-[3px] border-[#008cff] bg-white/20 p-[16px] shadow-[0px_4px_10px_0px_rgba(232,232,232,0.25)] backdrop-blur-[84px]"
              style={{ left: i * PITCH, top: 0 }}
            >
              <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
                {s.n}
              </p>
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-[#121212]">
                {s.title}
              </p>
              <p className="whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
