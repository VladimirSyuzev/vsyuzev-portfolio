// 06 Итог — 1:1 из Figma (node 2009:12811). Текст — реальный DOM. Стена
// из 36 иконок (4×9, серые, opacity 0.2) — единый SVG (summary-icons.svg,
// 1348×591). Доодл «»»» — SVG.
import Reveal from "@/components/Reveal";

const A = "/cases/case-02/sections";

export default function Summary() {
  return (
    <div className="relative h-[1035px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">06</p>
        <p className="text-[#121212]">Итог</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        За три недели команда из двух человек разработала 34 иконки, каждая из которых была
        подготовлена в двух размерах и для разных сценариев использования.
      </p>
      <p className="absolute left-[556px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Главным результатом проекта для меня стали не только сами иконки, но и опыт построения
        процесса в ситуации, когда дизайн-система еще находилась в разработке.
      </p>
      <p className="absolute left-[896px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Простые принципы, понятный рабочий процесс и постоянный диалог с клиентом позволили
        сохранить целостность библиотеки и выполнить проект в сжатые сроки.
      </p>

      {/* Доодл «»»» (Figma node 2279:39655). */}
      <Reveal variant="doodle" className="absolute left-[378px] top-[153.5px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
      </Reveal>

      <img
        alt="Итоговая библиотека из 34 иконок сервисов Yandex Cloud"
        className="absolute left-[46px] top-[318px] h-[591px] w-[1348px]"
        src={`${A}/summary-icons.svg`}
      />
    </div>
  );
}
