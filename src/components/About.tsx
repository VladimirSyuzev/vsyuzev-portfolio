"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { T, CLIENTS } from "@/lib/i18n";

// «о себе» — на ≥1200 абсолют 1:1 из Figma (node 2279:32548, фрейм
// 1440×900). Ниже 1200 внутренняя обёртка становится `contents` и её
// дети раскладываются потоком (стопка с полями сетки) — см. RESPONSIVE.md.
// Чипы — один поток flex-wrap: при сужении переносятся все вместе (строки
// пересобираются), а не тремя независимыми группами.

export default function About() {
  const scope = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const t = T[lang];
  const clients = CLIENTS[lang];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".about-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "siteEase",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });
    },
    { scope },
  );

  return (
    <section
      id="about"
      ref={scope}
      className="relative w-full scroll-mt-16 bg-[#fafafa] xl:mx-auto xl:h-[900px] xl:w-full xl:max-w-[1440px] xl:overflow-clip"
    >
      {/* ≥1440 (абсолют по сетке 1440) + <640 (поток) */}
      <div className="flex flex-col gap-[24px] px-[var(--grid-margin)] py-[56px] sm:hidden xl:contents">
        <p className="about-reveal font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] xl:absolute xl:left-[46px] xl:top-[134px] xl:whitespace-nowrap xl:text-[32px]">
          {t.aboutHeading}
        </p>

        {/* Био — два абзаца. На десктопе абсолют (top 181 / 238, w668). */}
        <p className="about-reveal text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[668px]">
          {t.aboutBio[0]}
        </p>
        <p className="about-reveal text-[14px] leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 xl:absolute xl:left-[46px] xl:top-[238px] xl:w-[668px]">
          {t.aboutBio[1]}
        </p>

        {/* фото — прижато к правому краю сетки (ниже 1200), на десктопе абсолют */}
        <div className="about-reveal aspect-[498/399] w-full overflow-clip sm:ml-auto sm:w-[58%] lg:w-[46%] xl:absolute xl:left-[896px] xl:top-[318px] xl:!ml-0 xl:aspect-auto xl:!h-[399px] xl:!w-[498px]">
          {/* photo.png — готовый рендер ровно этого контейнера. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Вова Сюзёв" src="/about/photo.png" className="size-full object-cover" />
        </div>

        <div className="about-reveal flex flex-wrap items-center gap-[6px] xl:absolute xl:left-[46px] xl:top-[592px] xl:w-[722px]">
          {clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px]"
            >
              <p className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#32323c]">
                {client}
              </p>
            </div>
          ))}
        </div>

        {/* Доодлы — декоративные, привязаны к десктопным координатам. */}
        <Reveal
          variant="doodle"
          className="hidden xl:absolute xl:left-[562px] xl:top-[674px] xl:block xl:h-[125px] xl:w-[158px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/about/doodle-scribble.svg" />
        </Reveal>
        <Reveal
          variant="doodle"
          delay={0.1}
          className="hidden xl:absolute xl:left-[1125.68px] xl:top-[44px] xl:block xl:h-[212.282px] xl:w-[268.324px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src="/about/doodles.svg" />
        </Reveal>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «главная · 834» (node
          2886:29829), холст 834×978. Дудла-«каракулей» на 834 нет. */}
      <div className="hidden sm:block lg:hidden">
        <FullBleedScale width={834} height={978} mode="grow" className="w-full">
          <div className="relative h-[978px] w-[834px] overflow-clip bg-[#fafafa]">
            <p className="about-reveal absolute left-[28px] top-[44px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
              {t.aboutHeading}
            </p>

            <div className="about-reveal absolute left-[28px] top-[91px] flex w-[381px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]">
              <p className="opacity-70">{t.aboutBio[0]}</p>
              <p className="opacity-70">{t.aboutBio[1]}</p>
            </div>

            {/* Фото (Frame 2886:29834, 383×399, overflow-clip). */}
            <div className="about-reveal absolute left-[422px] top-[348px] h-[399px] w-[383px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Вова Сюзёв" src="/about/photo-834.jpg" className="size-full object-cover" />
            </div>

            {/* Чипы клиентов (Frame 2886:29843, x28 y811, перенос ~3 ряда). */}
            <div className="about-reveal absolute left-[28px] top-[811px] flex w-[795px] flex-wrap content-start items-center gap-[6px]">
              {clients.map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px]"
                >
                  <p className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#32323c]">
                    {client}
                  </p>
                </div>
              ))}
            </div>

            {/* Доодл-«смайл» (Frame 2886:29839, x566 y0). Каракулей на 834 нет. */}
            <Reveal
              variant="doodle"
              delay={0.1}
              className="absolute left-[566px] top-0 h-[212.282px] w-[268.324px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/about/doodles.svg" />
            </Reveal>
          </div>
        </FullBleedScale>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «главная · 1280» (node
          2886:22304), холст 1280×900. */}
      <div className="hidden lg:block xl:hidden">
        <FullBleedScale width={1280} height={900} mode="grow" className="w-full">
          <div className="relative h-[900px] w-[1280px] overflow-clip bg-[#fafafa]">
            <p className="about-reveal absolute left-[40px] top-[134px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
              {t.aboutHeading}
            </p>

            <div className="about-reveal absolute left-[40px] top-[181px] flex w-[587px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]">
              <p className="opacity-70">{t.aboutBio[0]}</p>
              <p className="opacity-70">{t.aboutBio[1]}</p>
            </div>

            {/* Фото (Frame 2886:22309, 594×399, overflow-clip). */}
            <div className="about-reveal absolute left-[646px] top-[318px] h-[399px] w-[594px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Вова Сюзёв" src="/about/photo-1280.jpg" className="size-full object-cover" />
            </div>

            {/* Чипы клиентов (Frame 2886:22317, x40 y551, перенос ~4 ряда). */}
            <div className="about-reveal absolute left-[40px] top-[551px] flex w-[560px] flex-wrap content-start items-center gap-[6px]">
              {clients.map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px]"
                >
                  <p className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#32323c]">
                    {client}
                  </p>
                </div>
              ))}
            </div>

            {/* Доодлы. */}
            <Reveal
              variant="doodle"
              className="absolute left-[469px] top-[654px] h-[125px] w-[158px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/about/doodle-scribble.svg" />
            </Reveal>
            <Reveal
              variant="doodle"
              delay={0.1}
              className="absolute left-[1012px] top-0 h-[212.282px] w-[268.324px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/about/doodles.svg" />
            </Reveal>
          </div>
        </FullBleedScale>
      </div>
    </section>
  );
}
