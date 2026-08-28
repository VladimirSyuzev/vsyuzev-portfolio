// 03 Визуальная система — 1:1 из Figma (node 2022:14714). Тёмный блок →
// full-bleed: фон #121212 + фото (презентация на сцене) на всю ширину
// экрана; текст — в центрированной 1440-сетке.
export default function VisualSystem() {
  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="absolute inset-x-0 top-[318px] h-[704px] overflow-clip">
        <img
          alt="Презентация иллюстраций Stablegate на конференции"
          className="block size-full object-cover"
          src="/cases/case-03/sections/vislang-photo.jpg"
        />
      </div>

      <div className="relative mx-auto h-[1022px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">Визуальная система</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[670px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Первой иллюстрацией стала Wallet, именно она задала направление для всего набора. После
          её утверждения я сформировал библиотеку материалов, настроил универсальную сцену
          освещения и определил правила построения композиций. Вместо создания отдельных
          изображений я разрабатывал масштабируемую систему, где каждая новая иллюстрация
          наследует одни и те же принципы: форму, материалы, цветовую палитру, освещение и
          уровень детализации. Это позволило добиться визуальной целостности всего набора.
        </p>
      </div>
    </section>
  );
}
