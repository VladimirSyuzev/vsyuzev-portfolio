import Reveal from "@/components/Reveal";

// 03 Визуальная система — 1:1 из актуальной Figma (node 2022:14714,
// высота 1539). Тёмный full-bleed. Заголовок стопкой («03» / «Визуальная
// система»), два вводных абзаца, фото презентации на конференции —
// фрейм пропорционально во всю ширину экрана (на мониторах шире 1440
// растёт вместе с шириной, высота — по соотношению сторон), ниже —
// итоговая мысль в обводке-эллипсе.
const A = "/cases/case-03/sections";

export default function VisualSystem() {
  return (
    <section className="relative flex w-full flex-col bg-[#121212]">
      {/* Заголовок + вводные абзацы — в центрированной 1440-сетке. */}
      <div className="relative mx-auto h-[318px] w-[1440px]">
        <div className="absolute left-[46px] top-[64px] flex flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">03</span>
          <span className="w-[246px] text-white">Визуальная система</span>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку
          материалов, настроил универсальную сцену освещения и определил правила построения
          композиций.
        </p>
        <p className="absolute left-[46px] top-[238px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие принципы
          работы с формой, материалами, цветом, светом и уровнем детализации.
        </p>

        {/* Доодл «//» (Figma node 2412:4318 → 1236 / 181, 158×125). */}
        <Reveal variant="doodle" className="absolute left-[1236px] top-[181px] z-10 h-[125px] w-[158px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/principles1-doodle.svg`} />
        </Reveal>
      </div>

      {/* Фото конференции (Figma frame 2385:21391, 1440×704) — фрейм
          пропорционально во всю ширину экрана. Ассет 2x. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Презентация иллюстраций Stablegate на конференции"
        className="block w-full"
        src={`${A}/vislang-photo.jpg`}
      />

      {/* Итоговая мысль в обводке-эллипсе — снова в центрированной 1440-сетке. */}
      <div className="relative mx-auto h-[440px] w-[1440px]">
        <Reveal
          variant="line"
          start="top 86%"
          className="absolute left-[380px] top-[136px] h-[222px] w-[681px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/vislang-ellipse.svg`} />
        </Reveal>

        <p className="absolute left-[387px] top-[191px] w-[669px] text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Одна иллюстрация стала основой для масштабируемой визуальной системы
        </p>
      </div>
    </section>
  );
}
