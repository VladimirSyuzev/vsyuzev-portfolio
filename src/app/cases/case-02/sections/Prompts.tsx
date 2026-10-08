"use client";

import RevealImg from "@/components/RevealImg";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// Блок 5 «04 Промты» (в макете нумерация «04»; нода «05 Промты») — 1:1 из
// Figma: 1440 = 3527:74264 (высота 1403), 1280 = 3644:87993 (1294), 834 =
// 3641:84250 (1806), 375 = 3641:85722 (1590). Заголовок 32px (375 — 26) +
// интро капсом (Aeonik Medium 14), две колонки «текст промта + граф Weavy»
// (фото и 3D; графы — цельные картинки с запечёнными проводами), доодл-молния
// (≥1024), итоговая мысль по центру в овале-обводке.
// Раскладка (обновлено по правкам автора в Figma, 1440 = 3527:74264 h1676,
// 1280 = 3644:87993 h1644): xl ≥1440 и lg 1024–1439 — ДВЕ СТРОКИ (фото-промт,
// затем 3D-промт): слева текст, справа граф; строки в 548px друг от друга
// (475 граф + 73), итоговая мысль ниже. На ≥1024 граф — новый экспорт
// (*-lg.webp, провода изменены); sm 640–1023 — колонки стопкой, граф по
// центру (старый экспорт — макет 834/375 не менялся); base <640 — то же.
const A = "/cases/case-02/prompts";

function Column({
  text,
  graph,
  graphLg,
  alt,
  className = "",
  graphLeftXl,
}: {
  text: string;
  graph: string;
  graphLg: string;
  alt: string;
  className?: string;
  /** левый край графа на xl, px от левого края колонки текста */
  graphLeftXl: number;
}) {
  return (
    <div className={`relative flex flex-col items-center gap-[32px] lg:block lg:h-[475px] lg:w-full ${className}`}>
      <p className="w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:max-w-[777px] lg:w-[min(594px,calc(50%-6px))] lg:max-w-none xl:w-[498px]">
        {text}
      </p>
      {/* <1024 — старый граф (макеты 834/375 не менялись) */}
      <RevealImg
        alt={alt}
        src={`${A}/${graph}`}
        className="block aspect-[511/475] w-[335px] max-w-full sm:w-[510px] lg:hidden"
      />
      {/* ≥1024 — новый граф, справа от текста */}
      <RevealImg
        alt={alt}
        src={`${A}/${graphLg}`}
        loading="lazy"
        style={{ "--gx": `${graphLeftXl}px` } as React.CSSProperties}
        className="hidden aspect-[511/475] w-[min(511px,calc(50%-6px))] max-w-none lg:absolute lg:left-[calc(50%+6.2px)] lg:top-0 lg:block xl:left-[var(--gx)] xl:w-[511px]"
      />
    </div>
  );
}

export default function Prompts() {
  const t = C2[useLang()];

  return (
    <section className="relative w-full overflow-x-clip bg-[#fafafa]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-[32px] px-[20px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:pb-[71px] sm:pt-[72px] lg:gap-[63px] lg:px-[40px] lg:pb-[70px] lg:pt-[73px] xl:gap-[103px] xl:px-0 xl:pb-[120px] xl:pl-[45px] xl:pt-[135px]">
        {/* Заголовок + интро капсом */}
        <div className="flex w-full flex-col gap-[12px] max-sm:mb-[3px] sm:-mb-[16px] sm:w-[498px] lg:mb-0 lg:w-[498px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">04</span>
            <span className="text-[#121212]">{t.promptsHeading}</span>
          </div>
          <p className="max-w-[335px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:max-w-[383px] lg:max-w-[498px]">
            {t.promptsIntro}
          </p>
        </div>

        {/* Доодл-молния — только ≥1024 (на 834/375 в макете нет) */}
        <DrawIn
          src={`${A}/bolt.svg`}
          className="pointer-events-none absolute hidden h-[102px] w-[98px] lg:right-[232px] lg:top-[69px] lg:block xl:left-[802px] xl:right-auto xl:top-[133px]"
        />

        {/* Две колонки: фото-промт и 3D-промт */}
        <div className="flex flex-col gap-[64px] max-sm:gap-[66px] sm:max-lg:gap-[66px] lg:gap-[73px] lg:flex-col">
          <Column text={t.promptsPhoto} graph="graph-photo.webp" graphLg="graph-photo-lg.webp" graphLeftXl={681} alt={t.promptsGraphPhotoAlt} />
          <Column text={t.prompts3d} graph="graph-3d.webp" graphLg="graph-3d-lg.webp" graphLeftXl={680.8} alt={t.promptsGraph3dAlt} className="max-lg:h-[529px] max-sm:gap-[34px]" />
        </div>

        {/* Итоговая мысль по центру в овале-обводке */}
        <div className="relative flex w-full items-center justify-center py-[32px] sm:py-[64px] lg:mt-[1px] xl:-ml-[45px] xl:-mt-[30px] xl:w-[1440px] xl:py-0">
          <p data-no-typo className="relative z-10 w-[293px] text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70 sm:w-[421px] sm:text-[32px] sm:leading-[1.1] sm:tracking-[0.96px]">
            {t.promptsThought}
          </p>
          <DrawIn
            src={`${A}/oval-375.svg`}
            className="pointer-events-none absolute left-1/2 top-[calc(50%-5px)] h-[148px] w-[312px] -translate-x-1/2 -translate-y-1/2 sm:hidden"
          />
          <DrawIn
            src={`${A}/oval.svg`}
            className="pointer-events-none absolute left-1/2 top-[calc(50%-5px)] hidden h-[218px] w-[463px] -translate-x-1/2 -translate-y-1/2 sm:block xl:top-[calc(50%-1px)]"
          />
        </div>
      </div>
    </section>
  );
}
