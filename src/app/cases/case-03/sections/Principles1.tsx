import Reveal from "@/components/Reveal";

// 04 Принципы дизайна (1 из 2) — 1:1 из Figma (node 2022:14721). Тёмный
// full-bleed. Текст + доодл-«//» + ряд 3D-сфер (материалы: пластик,
// стекло, металл) — растр с прозрачностью. Прогресс-индикатор 1/2.
const A = "/cases/case-03/sections";

export default function Principles1() {
  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[900px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Принципы дизайна</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          В основе визуального языка лежат простые округлые формы, реалистичные материалы и
          ограниченная палитра фирменных цветов. Такой подход позволил совместить ощущение
          надёжности финансового продукта с современным технологичным характером бренда. Для всех
          иллюстраций использовались единые материалы — пластик, стекло и металл, а также общая
          схема освещения. Приоритетом была не максимальная реалистичность, а быстрое считывание
          формы и смысла каждой композиции.
        </p>

        {/* Доодл «//» (Figma node 2284:39895). */}
        <Reveal variant="doodle" className="absolute left-[815px] top-[267px] h-[125px] w-[158px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/principles1-doodle.svg`} />
        </Reveal>

        <img
          alt="3D-сферы из разных материалов: пластик, стекло, металл"
          className="absolute left-[104.88px] top-[318px] h-[532.984px] w-[1231.019px] max-w-none"
          src={`${A}/principles1-spheres.jpg`}
        />

        {/* Прогресс-индикатор 1 из 2. */}
        <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
          <div className="h-[2px] w-[44.833px] bg-white" />
          <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
        </div>
      </div>
    </section>
  );
}
