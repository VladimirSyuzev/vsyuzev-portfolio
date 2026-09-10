"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, waveStagger } from "@/lib/gsap";
import { useBreakpoint } from "@/lib/breakpoint";
import { CASES } from "@/lib/cases-data";
import Case01IconGrid from "./Case01IconGrid";
import ResponsiveScale from "@/components/ResponsiveScale";
import DrawIn from "@/components/DrawIn";

// «кейсы» — на десктопе (≥1200) hover-раскрывающийся список 1:1 из Figma
// (node 2286:3887). Ниже 1200 hover нет — отдаём стопку карточек (номер +
// название + описание + обложка всегда видны, тап → переход). Планшет-гор
// — в две колонки, планшет-верт/мобайл — в одну. Секция ниже первого
// экрана, поэтому переключение по useBreakpoint без вспышки.

export default function CasesList() {
  const bp = useBreakpoint();
  return bp === "desktop" ? (
    <CasesListDesktop />
  ) : (
    <CasesListStacked landscape={bp === "tabletL"} mobile={bp === "mobile"} />
  );
}

function CasesListDesktop() {
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
        scrollTrigger: { trigger: scope.current, start: "top 85%" },
      });
    },
    { scope },
  );

  return (
    <div
      id="cases"
      ref={scope}
      className="relative mx-auto w-full max-w-[1440px] scroll-mt-16 bg-[#fafafa] pt-[318px] pb-[123px]"
    >
      <p className="absolute left-[46px] top-[134px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        КЕЙСЫ
      </p>
      <DrawIn src="/about/doodle-hooks.svg" fit="contain" className="absolute left-[174px] top-[89px] h-[125px] w-[158px]" />

      <div className="ml-[216px] flex w-[1178px] flex-col items-start">
        {CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="group grid w-full grid-rows-[113px] overflow-hidden border-b border-[rgba(18,18,18,0.7)] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:grid-rows-[537px] focus-visible:grid-rows-[537px]"
          >
            <div className="flex h-[537px] w-full">
              <div className="relative w-[510px] shrink-0 pl-[12px] pt-[24px]">
                <p className="case-wave-cell font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#008cff]">
                  {item.index}
                </p>
                <p className="case-wave-cell mt-[12px] w-[321px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  {item.title}
                </p>
                <p className="mt-[12px] w-[454px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-visible:opacity-70">
                  {item.description}
                </p>
                {/* Стрелка «открыть» — отступ 40px от правого и нижнего края
                    левой панели (510×537). Появляется вместе с раскрытием. */}
                <DrawIn
                  src="/cases/lil-arrow.svg"
                  play="mount"
                  className="pointer-events-none absolute bottom-[40px] right-[40px] h-[42px] w-[56px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </div>
              <div className="relative h-[536px] w-[668px] shrink-0 overflow-hidden opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.slug === "case-01" ? (
                  <Case01IconGrid className="relative h-[536px] w-[668px] overflow-clip bg-[rgba(18,18,18,0.7)]" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.cover}
                    alt=""
                    className="absolute max-w-none"
                    style={{
                      left: item.coverOffset.left,
                      top: item.coverOffset.top,
                      width: item.coverSize.width,
                      height: item.coverSize.height,
                    }}
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

function CasesListStacked({ landscape, mobile }: { landscape: boolean; mobile: boolean }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(gsap.utils.toArray<HTMLElement>(".case-card", scope.current), {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.08,
        ease: "siteEase",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: scope.current, start: "top 85%" },
      });
    },
    { scope },
  );

  return (
    <section
      id="cases"
      ref={scope}
      className="w-full scroll-mt-16 bg-[#fafafa] px-[var(--grid-margin)] pt-[88px] pb-[72px]"
    >
      <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] sm:text-[32px]">
        КЕЙСЫ
      </p>

      <div
        className={`mt-[28px] gap-[44px] ${landscape ? "grid grid-cols-2 gap-x-[24px] gap-y-[48px]" : "flex flex-col"}`}
      >
        {CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="case-card group relative block border-b border-[rgba(18,18,18,0.7)] pb-[96px]"
          >
            {item.slug === "case-01" ? (
              // фикс-композиция 668×536 — масштабируем целиком под ширину
              // карточки (иначе на широкой карточке снизу вылезала серая
              // подложка: чёрная панель не дотягивалась до низа бокса)
              <ResponsiveScale width={668} height={536} className="w-full overflow-hidden">
                <Case01IconGrid className="relative h-[536px] w-[668px] overflow-clip bg-[rgba(18,18,18,0.7)]" />
              </ResponsiveScale>
            ) : (
              <div className="relative aspect-[668/536] w-full overflow-hidden bg-[rgba(18,18,18,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover}
                  alt=""
                  className="absolute max-w-none"
                  style={{
                    left: `${(item.coverOffset.left / 668) * 100}%`,
                    top: `${(item.coverOffset.top / 536) * 100}%`,
                    width: `${(item.coverSize.width / 668) * 100}%`,
                    height: `${(item.coverSize.height / 536) * 100}%`,
                  }}
                />
              </div>
            )}
            <p className="mt-[16px] font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#008cff]">
              {item.index}
            </p>
            <p className="mt-[8px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
              {item.title}
            </p>
            <p className="mt-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {item.description}
            </p>
            {/* Стрелка «открыть» — привязана к нижней линии карточки: 40px
                от неё и от правого края, одинаково во всех карточках.
                Обводка — 6px (в файле), на 375 тоньше — 5px. */}
            <DrawIn
              src="/cases/lil-arrow.svg"
              play="mount"
              strokeWidth={mobile ? 5 : undefined}
              className="pointer-events-none absolute bottom-[40px] right-[40px] h-[42px] w-[56px]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
