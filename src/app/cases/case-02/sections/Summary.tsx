import { readFile } from "node:fs/promises";
import path from "node:path";
import Reveal from "@/components/Reveal";
import IconWallPulse from "./IconWallPulse";

// 06 Итог — 1:1 из актуальной Figma (node 2009:12811, высота 1446).
// Крупный дисплейный заголовок «06 / ИТОГ» стопкой (175px, leading-none).
// Три колонки текста (left 46 / 726 / 1066, top 592). Доодл «»»».
//
// Стена из 36 плиток иконок (Figma node 2009:12819) — инлайн-SVG (а не
// <img>), чтобы GSAP мог анимировать каждую плитку по отдельности: каждый
// <g> помечен классом .si и имеет собственный fill #CCCCCC (это #121212
// при 20 % над #fafafa — прежняя group opacity убрана, цвет «запечён»,
// чтобы синий #2B9FFE в пике был насыщенным, а не бледным). Волновую
// анимацию по плиткам гоняет IconWallPulse.
const A = "/cases/case-02/sections";

export default async function Summary() {
  const iconWall = await readFile(
    path.join(process.cwd(), "public/cases/case-02/sections/summary-icons.svg"),
    "utf8"
  );

  return (
    <div className="relative h-[1446px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[152px] flex flex-col font-heading text-[175px] font-bold uppercase leading-none tracking-[5.25px]">
        <span className="text-[#008cff]">06</span>
        <span className="text-[#121212]">Итог</span>
      </div>

      <p className="absolute left-[46px] top-[592px] w-[326px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        За три недели команда из двух человек разработала 34 иконки в двух размерах
        <br />
        для разных сценариев использования.
      </p>
      <p className="absolute left-[726px] top-[592px] w-[314px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        Для меня главным результатом стали
        <br />
        не только готовые иконки, но и опыт построения процесса в ситуации, когда сама
        дизайн-система ещё находилась в разработке.
      </p>
      <p className="absolute left-[1066px] top-[592px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        Простые принципы, понятный процесс
        <br />и постоянный диалог с клиентом помогли сохранить целостность библиотеки
        <br />и выполнить проект в сжатые сроки.
      </p>

      {/* Доодл «»»» (Figma node 2279:39655 → 343 / 560). */}
      <Reveal variant="doodle" className="absolute left-[343px] top-[560px] h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
      </Reveal>

      <div
        className="summary-wall absolute left-[46px] top-[729px] h-[591px] w-[1348px] [&_svg]:block [&_svg]:size-full"
        role="img"
        aria-label="Итоговая библиотека из 34 иконок сервисов Yandex Cloud"
        dangerouslySetInnerHTML={{ __html: iconWall }}
      />
      <IconWallPulse />
    </div>
  );
}
