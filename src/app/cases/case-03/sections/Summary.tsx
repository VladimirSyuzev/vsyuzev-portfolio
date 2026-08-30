import Reveal from "@/components/Reveal";

// 07 Итог — 1:1 из актуальной Figma (node 2022:15038, высота 1539).
// Дисплейный заголовок 175px, две колонки текста, доодл-«молния» и
// большой мокап сайта Stablegate на ноутбуке (стеклянные плитки) —
// растровый ассет во всю ширину, уходит за нижнюю кромку блока.
const A = "/cases/case-03/sections";

export default function Summary() {
  return (
    <div className="relative h-[1539px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[143px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">Итог</p>
      </div>

      <p className="absolute left-[46px] top-[358px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Сегодня иллюстрации используются маркетинговой командой Stablegate в презентациях,
        email-рассылках, социальных сетях и других коммуникационных материалах. Собственная
        библиотека помогла сократить использование стоковых изображений и ускорить подготовку
        новых материалов.
      </p>
      <p className="absolute left-[556px] top-[358px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Главным результатом стала масштабируемая система 3D key visuals, которая помогает понятным
        визуальным языком объяснять сложные функции продукта и поддерживать единый стиль бренда во
        всех точках коммуникации.
      </p>

      {/* Доодл-«молния» (Figma node 2284:45796 → 1205 / 341). */}
      <Reveal variant="doodle" className="absolute left-[1205px] top-[341px] h-[107px] w-[85px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
      </Reveal>

      {/* Мокап сайта на ноутбуке (Figma node 2030:15609). Ассет уже обрезан
          нижней кромкой блока (1440×947, начало на y592). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Сайт Stablegate с 3D-иллюстрациями на экране ноутбука"
        className="absolute left-0 top-[592px] block w-full"
        src={`${A}/summary-mockup.jpg`}
      />
    </div>
  );
}
