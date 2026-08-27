"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, waveStagger } from "@/lib/gsap";
import { CASES } from "@/lib/cases-data";
import Case01IconGrid from "./Case01IconGrid";

// «кейсы» — 1:1 из Figma, секция «варианты кейсов» (node 2286:3887):
// «Кейсы_состояние 1» (свёрнуто — номер+название, 113px) раскрывается по
// наведению/фокусу в «Кейсы_состояние 3» (537px — + описание + обложка).
// Раскрывается ТОЛЬКО наведённая строка, остальные остаются свёрнутыми
// (не аккордеон на весь блок) — реализовано через grid-template-rows
// 113px→537px на каждой строке независимо; лишнее содержимое обрезается
// overflow-hidden, пока строка свёрнута.
//
// Reveal при появлении блока — «волна» (waveStagger), перенесённая как
// анимационная техника из «Новый проект 3.0» (единственное, что оттуда
// взято, по явной просьбе пользователя). Номер+заголовок каждой строки —
// плоский массив cols=2, антидиагональный wave по 5 строкам.
export default function CasesList() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cells = gsap.utils.toArray<HTMLElement>(".case-wave-cell", scope.current);
      gsap.from(cells, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: "siteEase",
        stagger: waveStagger(2, 0.08),
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
        },
      });
    },
    { scope }
  );

  return (
    <div id="cases" ref={scope} className="relative w-[1440px] bg-[#fafafa] pt-[318px] pb-[123px] scroll-mt-16">
      <p className="absolute left-[46px] top-[134px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        КЕЙСЫ
      </p>
      <div className="absolute left-[174px] top-[89px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src="/about/doodle-hooks.svg" />
      </div>

      {/* left-216, не mx-auto — по Figma список начинается на 216px, а НЕ
          центрирован в 1440-canvas (216+1178=1394, правое поле 46px, а не
          симметричные ~131px, которые давал mx-auto — реальный баг, из-за
          которого блок "плавал" не на своём месте). */}
      <div className="ml-[216px] flex w-[1178px] flex-col items-start">
        {CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="group grid w-full grid-rows-[113px] overflow-hidden border-b border-[rgba(18,18,18,0.7)] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:grid-rows-[537px] focus-visible:grid-rows-[537px]"
          >
            <div className="flex h-[537px] w-full">
              <div className="w-[510px] shrink-0 pl-[12px] pt-[24px]">
                <p className="case-wave-cell font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#008cff]">
                  {item.index}
                </p>
                <p className="case-wave-cell mt-[12px] w-[321px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  {item.title}
                </p>
                <p className="mt-[12px] w-[454px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-visible:opacity-70">
                  {item.description}
                </p>
              </div>
              <div className="relative h-[536px] w-[668px] shrink-0 overflow-hidden opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.slug === "case-01" ? (
                  <Case01IconGrid className="relative h-[536px] w-[668px] overflow-clip bg-[rgba(18,18,18,0.7)]" />
                ) : (
                  // Реальный ассет в родном разрешении Figma (2700-4100px по
                  // длинной стороне), обрезка тем же окном, что и в макете —
                  // не отдельный низкоразрешённый screenshot 668×536.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.cover}
                    alt=""
                    className="absolute max-w-none"
                    style={{ left: item.coverOffset.left, top: item.coverOffset.top, width: item.coverSize.width, height: item.coverSize.height }}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
