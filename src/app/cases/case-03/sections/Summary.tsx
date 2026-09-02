import Reveal from "@/components/Reveal";

// 07 Итог — 1:1 из актуальной Figma (node 2022:15038, высота 1539).
// Дисплейный заголовок 175px, две колонки текста (правая уехала на x726),
// доодл-«шеврон» между ними (node 2437:54102 → 527 / 336) и большой мокап
// сайта Stablegate на ноутбуке — фрейм пропорционально во всю ширину
// экрана (node 2030:15609, свежий экспорт).
const A = "/cases/case-03/sections";

export default function Summary() {
  return (
    <section className="relative flex w-full flex-col bg-[#fafafa]">
      <div className="relative mx-auto h-[592px] w-[1440px]">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">07</p>
          <p className="text-[#121212]">Итог</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Сегодня иллюстрации используются маркетинговой командой Stablegate в презентациях,
          email-рассылках, социальных сетях и других коммуникационных материалах. Собственная
          библиотека помогла сократить использование стоковых изображений и ускорить подготовку
          новых материалов.
        </p>
        <p className="absolute left-[896px] top-[368px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Главным результатом стала масштабируемая система 3D key visuals, которая помогает понятным
          визуальным языком объяснять сложные функции продукта и поддерживать единый стиль бренда во
          всех точках коммуникации.
        </p>

        {/* Доодл-«шеврон» между колонками (Figma node 2437:54102 → 527 / 348). */}
        <Reveal variant="doodle" className="absolute left-[527px] top-[348px] z-10 h-[125px] w-[158px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/chevron.png`} />
        </Reveal>
      </div>

      {/* Мокап сайта на ноутбуке (Figma node 2030:15609) — фрейм
          пропорционально во всю ширину экрана. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Сайт Stablegate с 3D-иллюстрациями на экране ноутбука"
        className="block w-full"
        src={`${A}/summary-mockup.jpg`}
      />
    </section>
  );
}
