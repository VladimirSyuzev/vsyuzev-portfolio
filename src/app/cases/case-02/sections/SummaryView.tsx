"use client";

import Reveal from "@/components/Reveal";
import IconWallPulse from "./IconWallPulse";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

const A = "/cases/case-02/sections";

export default function SummaryView({
  iconWall,
  iconWall375,
}: {
  iconWall: string;
  iconWall375: string;
}) {
  const t = C2[useLang()];

  return (
    <section className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1446px] xl:w-[1440px] xl:overflow-clip">
      <div className="flex flex-col gap-[12px] px-[var(--grid-margin)] py-[72px] sm:gap-[24px] lg:gap-[64px] xl:contents">
        <div className="flex flex-row items-baseline gap-[10px] font-heading text-[26px] font-bold uppercase leading-none sm:gap-[18px] sm:!text-[100px] lg:gap-[24px] lg:!text-[152px] xl:absolute xl:left-[46px] xl:top-[152px] xl:flex-col xl:gap-0 xl:tracking-[5.25px] xl:!text-[175px]">
          <span className="text-[#008cff]">06</span>
          <span className="text-[#121212]">{t.summaryHeading}</span>
        </div>

        <div className="relative flex flex-col gap-[24px] sm:flex-row sm:justify-between sm:gap-[12px] lg:flex-nowrap lg:justify-start lg:gap-x-[12px] xl:contents">
          <Reveal
            variant="doodle"
            className="pointer-events-none absolute hidden sm:left-[-43px] sm:top-[34px] sm:block sm:h-[125px] sm:w-[158px] lg:left-[264px] lg:top-[-38px] xl:hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img aria-hidden alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
          </Reveal>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 sm:w-[383px] sm:shrink-0 lg:mr-[317px] lg:w-[289px] lg:shrink-0 xl:absolute xl:left-[46px] xl:top-[592px] xl:w-[326px]">
            {t.summaryPara1}
          </p>
          <div className="flex flex-col gap-[6px] sm:w-[366px] sm:shrink-0 lg:contents">
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 lg:w-[291px] lg:shrink-0 xl:absolute xl:left-[726px] xl:top-[592px] xl:w-[314px]">
              {t.summaryPara2}
            </p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80 lg:w-[291px] lg:shrink-0 xl:absolute xl:left-[1066px] xl:top-[592px] xl:w-[328px]">
              {t.summaryPara3}
            </p>
          </div>
        </div>

        <Reveal
          variant="doodle"
          className="hidden xl:absolute xl:left-[343px] xl:top-[560px] xl:block xl:h-[125px] xl:w-[158px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
        </Reveal>

        <div
          className="summary-wall block w-full [&_svg]:block [&_svg]:size-full sm:hidden"
          style={{ aspectRatio: "335 / 472" }}
          data-cols={5}
          role="img"
          aria-label=""
          dangerouslySetInnerHTML={{ __html: iconWall375 }}
        />
        <div
          className="summary-wall hidden aspect-[1348/591] w-full [&_svg]:block [&_svg]:size-full sm:block sm:aspect-[778/341] lg:aspect-[1200/525] xl:absolute xl:left-[46px] xl:top-[729px] xl:aspect-auto xl:h-[591px] xl:w-[1348px]"
          data-cols={9}
          role="img"
          aria-label=""
          dangerouslySetInnerHTML={{ __html: iconWall }}
        />
      </div>
      <IconWallPulse ready={Boolean(iconWall) || Boolean(iconWall375)} />
    </section>
  );
}
