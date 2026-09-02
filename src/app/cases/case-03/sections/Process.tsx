"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import { GLASS_BUBBLE } from "@/lib/glass";

// 05 Процесс — 1:1 из актуальной Figma (node 2022:14827, высота 2980).
// В новой версии Figma «Процесс», «Дизайн-система» и сет 3D-иконок слиты
// в один тёмный full-bleed раздел:
//  · заголовок 175px + вводный текст + доодл «»»»;
//  · трек «процесс» (node 2029:15514) — механика 1:1 как в кейсах 1 и 2
//    (наведённое колесо мыши гонит ленту ГОРИЗОНТАЛЬНО, нативный
//    scrollLeft), стекло-бабл — общий GLASS_BUBBLE (src/lib/glass.ts);
//  · «06 Дизайн-система» — текст + белая карточка из 4 3D-объектов;
//  · «Разные функции продукта. Один визуальный язык» в обводке-эллипсе;
//  · сет из 12 финальных 3D-иконок с подписями.
const A = "/cases/case-03/sections";

const STEPS = [
  { n: "01", title: "Sketch", desc: "Поиск идеи и композиции" },
  { n: "02", title: "Blocking", desc: "Построение базовых форм" },
  { n: "03", title: "Modeling", desc: "Создание финальной геометрии" },
  { n: "04", title: "Materials", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "Lighting", desc: "Постановка света и акцентов" },
  { n: "06", title: "Render", desc: "Финальный рендер и постобработка" },
  { n: "07", title: "Final Key Visual", desc: "Готовая иллюстрация" },
];

const PITCH = 340;

// Дизайн-система (Figma node 2387:22353) — белая карточка из 4 ОТДЕЛЬНЫХ
// 3D-объектов (не один запечённый ассет) + подписи. Ассеты 2x,
// прозрачный PNG, 262×262 в макете.
const DSYSTEM: [string, string][] = [
  ["dsystem-bank.png", "Bank"],
  ["dsystem-docs.png", "Supporting documents"],
  ["dsystem-onboarding.png", "Onboarding"],
  ["dsystem-manager.png", "Personal manager"],
];

// Сет из 12 финальных 3D-иконок (Figma node 2022:15013, сетка 1000×738):
// [файл, подпись, left, top] — иконка 218×218, подпись по центру колонки
// (109 / 369 / 629.5 / 890.5) на 2px ниже иконки. Ассеты 2x, прозрачный PNG.
const ICONSET: [string, string, number, number][] = [
  ["wallet.png", "Wallet", 0, 0],
  ["supporting-documents.png", "Supporting documents", 260, 0],
  ["exchainge.png", "Exchainge", 520.5, 0],
  ["payment-complete.png", "Payment Complete", 781.5, 0],
  ["bank.png", "Bank", 0, 260],
  ["gate.png", "Gate", 260, 260],
  ["onboarding.png", "Onboarding", 520.5, 260],
  ["fees.png", "Fees", 781.5, 260],
  ["coin.png", "Coin", 0, 520],
  ["transactions.png", "Transactions", 260, 520],
  ["personal-manager.png", "Personal manager", 520.5, 520],
  ["security.png", "Security", 781.5, 520],
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dsysRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState({ left: 46, right: 1440 / 2 - 164 });
  const reduced = useReducedMotion();

  // «Волна» по 4 объектам дизайн-системы: каждый по очереди чуть
  // подскакивает (scale + подъём) и возвращается; проход повторяется с
  // паузой, пока блок в экране (как пульс-волна сета иконок в кейсе 2).
  useGSAP(
    () => {
      if (reduced || !dsysRef.current) return;
      const objs = gsap.utils.toArray<HTMLElement>(".dsystem-obj", dsysRef.current);
      if (!objs.length) return;
      gsap.set(objs, { transformOrigin: "50% 60%" });
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.2,
        defaults: { ease: "sine.inOut" },
        scrollTrigger: {
          trigger: dsysRef.current,
          start: "top 78%",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });
      objs.forEach((el, i) => {
        const at = i * 0.16;
        tl.to(el, { scale: 1.09, y: -8, duration: 0.28 }, at).to(
          el,
          { scale: 1, y: 0, duration: 0.34 },
          at + 0.28,
        );
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reduced], scope: dsysRef },
  );

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
    <div ref={sectionRef} className="relative h-[2980px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* — Процесс — */}
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-white">Процесс</p>
        </div>

        <div className="absolute left-[46px] top-[368px] flex w-[670px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>
            Каждая иллюстрация проходила один рабочий цикл: поиск метафоры, быстрый скетч,
            построение композиции, настройка материалов и освещения, затем финальный рендер.
          </p>
          <p>
            Такой подход позволял принимать ключевые решения на ранних этапах. Библиотека
            материалов и готовых объектов ускоряла создание новых сцен и помогала сохранять единый
            стиль.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-[46px] top-[580px] h-[286px] w-[1348px] max-w-none opacity-60"
          src={`${A}/process-stripes.svg`}
        />

        {/* Стрелка-доодл «→» у конца трека (Figma node 2446:62566 → 1243 / 872, 99×63). */}
        <Reveal variant="doodle" delay={0.1} className="absolute left-[1243px] top-[872px] z-10 h-[63px] w-[99px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/process-arrow.svg`} />
        </Reveal>

        {/* — Дизайн-система — (пользователь выровнял заголовок и текст по левому краю) */}
        <div className="absolute left-[46px] top-[1092px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-white">Дизайн-система</p>
        </div>

        <p className="absolute left-[46px] top-[1139px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-80">
          Каждая иллюстрация создавалась как часть общей системы. Геометрия, материалы, освещение и
          цветовая палитра формировали единый визуальный язык независимо от темы конкретной сцены.
        </p>

        {/* Белая карточка из 4 ОТДЕЛЬНЫХ 3D-объектов + подписи
            (Figma node 2387:22353). По объектам проходит «волна». */}
        <div ref={dsysRef} className="absolute left-[78px] top-[1277px] h-[399px] w-[1284px]">
          <Reveal
            variant="fade"
            className="flex h-full w-full items-center gap-[12px] rounded-[76px] bg-white px-[100px] py-[44px]"
          >
            {DSYSTEM.map(([src, label]) => (
              <div key={label} className="flex w-[262px] shrink-0 flex-col items-center gap-[12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={label}
                  className="dsystem-obj block aspect-square w-full max-w-none object-contain will-change-transform"
                  src={`${A}/${src}`}
                />
                <p className="w-full text-center text-[15.62px] font-medium leading-[1.44] text-[#2541ff]">
                  {label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Обводка-эллипс вокруг фразы (Figma node 2387:22373). */}
        <Reveal
          variant="line"
          start="top 88%"
          className="absolute left-[414px] top-[1759px] h-[156px] w-[637px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/process-ellipse.svg`} />
        </Reveal>

        <p className="absolute left-1/2 top-[1812px] w-[669px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Разные функции продукта.
          <br />
          Один визуальный язык
        </p>

        {/* Сет из 12 3D-иконок (Figma node 2022:15013) — 12 отдельных
            ассетов. При наведении иконка растёт на 20%, подпись уезжает
            вниз и гаснет; курсор убрали — всё возвращается. */}
        <Reveal variant="fade" className="absolute left-[220px] top-[2099px] h-[738px] w-[1000px]">
          {ICONSET.map(([src, label, left, top]) => (
            <div
              key={label}
              className="group absolute h-[218px] w-[218px]"
              style={{ left, top }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={label}
                className="block size-full max-w-none object-contain transition-transform duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                src={`${A}/iconset/${src}`}
              />
              <p className="pointer-events-none absolute left-1/2 top-[220px] -translate-x-1/2 whitespace-nowrap text-center text-[15px] leading-[1.2] text-white transition-all duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[10px] group-hover:opacity-0 motion-reduce:transition-none">
                {label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Окно трека — во всю ширину экрана, горизонтальный скролл по колесу. */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute left-0 top-[622px] h-[205px] w-full overflow-x-auto"
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
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{s.title}</p>
              <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
