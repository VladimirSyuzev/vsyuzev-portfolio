import Reveal from "@/components/Reveal";

// 07 Итог — 1:1 из Figma (node 2022:15038). Светлый блок: 2 колонки
// текста + доодл-молния + большой мокап сайта Stablegate на ноутбуке.
const A = "/cases/case-03/sections";

export default function Summary() {
  return (
    <div className="relative h-[1234px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">Итог</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Сегодня этот набор регулярно используется маркетинговой командой Stablegate в
        презентациях, email-рассылках, публикациях в социальных сетях и других коммуникационных
        материалах. Появление собственной библиотеки иллюстраций позволило отказаться от
        большинства стоковых изображений и сделать визуальную коммуникацию более последовательной.
      </p>
      <p className="absolute left-[556px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Кроме того, подготовка новых маркетинговых материалов стала быстрее благодаря готовой
        системе 3D key visuals. Главным результатом проекта стала масштабируемая визуальная
        система, которая помогает простым и понятным языком объяснять сложные функции
        финтех-продукта и поддерживает единый стиль бренда во всех точках коммуникации.
      </p>

      {/* Доодл-молния (Figma node 2284:45796). */}
      <Reveal variant="doodle" className="absolute left-[1179px] top-[169px] flex h-[120.909px] w-[92.566px] items-center justify-center">
        <div className="rotate-[14.02deg]">
          <div className="relative h-[107.5px] w-[68.565px]">
            <div className="absolute inset-[-2.79%_-4.38%]">
              <img alt="" className="block size-full max-w-none" src={`${A}/summary-doodle.svg`} />
            </div>
          </div>
        </div>
      </Reveal>

      <img
        alt="Сайт Stablegate с 3D-иллюстрациями на экране ноутбука"
        className="absolute left-1/2 top-[318px] h-[1036px] w-[1493px] max-w-none -translate-x-[calc(50%+16.5px)] object-cover"
        src={`${A}/summary-mockup.jpg`}
      />
    </div>
  );
}
