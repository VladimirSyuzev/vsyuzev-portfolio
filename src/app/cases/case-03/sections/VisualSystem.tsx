import Reveal from "@/components/Reveal";

// 03 Визуальная система — 1:1 из актуальной Figma (node 2022:14714,
// высота 1539). Тёмный full-bleed. Заголовок стопкой («03» / «Визуальная
// система»), два вводных абзаца, фото презентации на конференции во всю
// ширину, ниже — итоговая мысль в обводке-эллипсе.
const A = "/cases/case-03/sections";

export default function VisualSystem() {
  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[1539px] w-[1440px]">
        {/* Фото конференции — в 1440-сетке, ассет 2x, object-cover
            (пропорции сохраняются, ничего не растягивается по ширине). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Презентация иллюстраций Stablegate на конференции"
          className="absolute left-0 top-[318px] h-[704px] w-[1440px] max-w-none object-cover"
          src={`${A}/vislang-photo.jpg`}
        />

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

        {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2385:21395). */}
        <Reveal
          variant="line"
          start="top 86%"
          className="absolute left-[380px] top-[1158px] h-[222px] w-[681px]"
        >
          <img alt="" className="block size-full max-w-none" src={`${A}/vislang-ellipse.svg`} />
        </Reveal>

        <p className="absolute left-[387px] top-[1213px] w-[669px] text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Одна иллюстрация стала основой для масштабируемой визуальной системы
        </p>
      </div>
    </section>
  );
}
