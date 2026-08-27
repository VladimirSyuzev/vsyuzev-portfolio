// «Экран» (01 Проблема, слайд 2 из 2) — 1:1 из Figma (node 1965:41904).
// Текст/буллиты/прогресс-индикатор/диаграмма-аннотация ("Экран 2": пунктирные
// кружки+линии, подписи ICONS REGULAR/ICONS SYMBOLS) — настоящий DOM+SVG.
// Корпус телефона — упрощённый CSS-мокап (не точная figma-геометрия с
// mask-image/hypot()-поворотами блика камеры — слишком специфичная под
// один рендер CSS-техника, не несущая содержательной информации), тот же
// компромисс, что и в Summary.tsx: настоящая рамка + реальные аннотации
// поверх, а содержимое экрана (реалистичный скрин выдачи Яндекса с
// карточками товаров) — единственный оставшийся screenshot-кроп именно
// внутренней области экрана телефона, не всей секции целиком.
const A = "/cases/case-01/sections/screen-assets";

const BULLETS = [
  "разные пропорции",
  "разную толщину линий",
  "разные радиусы скруглений",
  "разные принципы построения",
  "неодинаковый визуальный вес",
  "дублирование одинаковых иконок",
  "отсутствие необходимых размеров",
  "отсутствие outline или filled версий",
];

export default function Screen() {
  return (
    <div className="snap-start flex min-h-screen w-full items-center justify-center bg-[#121212]">
    <section className="relative h-[900px] w-[1440px] shrink-0 overflow-clip">
      <p className="absolute left-[46px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
        На одном экране могли одновременно использоваться иконки из разных библиотек, из-за чего
        нарушалась визуальная целостность интерфейса.
      </p>

      <div className="absolute left-[47px] top-[510px] w-[327px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white">
          МЫ ОБНАРУЖИЛИ:
        </p>
        <ul className="mt-[29px] flex flex-col gap-[6px]">
          {BULLETS.map((item) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              <span className="size-[6px] shrink-0 rounded-full bg-[#008cff]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Прогресс-индикатор слайдов: слайд 2 из 2 — активен второй бар. */}
      <div className="absolute left-[46px] top-[852px] flex gap-[12px]">
        <div className="h-[2px] w-[44.833px] bg-white opacity-30" />
        <div className="h-[2px] w-[44.833px] bg-white" />
      </div>

      <div className="absolute left-[344px] top-[623px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/doodle-hooks.svg`} />
      </div>

      {/* Экран 2 — диаграмма-аннотация поверх скрина (пунктирные кружки +
          линии + подписи), 1:1 из Figma (node 1965:42059). */}
      <div className="absolute left-[556px] top-[171px] h-[558px] w-[668px]">
        <div className="absolute left-[338px] top-[488px] size-[24px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/dot-orange.svg`} />
        </div>
        <div className="absolute left-[424px] top-[401px] size-[24px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/dot-orange.svg`} />
        </div>
        <div className="absolute left-[217.28px] top-[155px] size-[24px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/dot-blue.svg`} />
        </div>
        <div className="absolute left-[216px] top-[38px] size-[32px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/dot-yellow.svg`} />
        </div>
        <div className="absolute left-[243px] top-[155px] size-[24px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/dot-orange.svg`} />
        </div>
        <div className="absolute left-[140px] top-[54px] h-[113px] w-[77px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/vec-left.svg`} />
        </div>
        <div className="absolute left-[362px] top-[413px] h-[87px] w-[164px] rotate-180">
          <img alt="" className="block size-full max-w-none" src={`${A}/vec-right.svg`} />
        </div>
        <p className="absolute left-[41px] top-[104px] whitespace-nowrap text-[11px] uppercase tracking-[0.33px] text-white">
          Icons Regular
        </p>
        <p className="absolute left-[538px] top-[450px] whitespace-nowrap text-[11px] uppercase tracking-[0.33px] text-white">
          Icons Symbols
        </p>
      </div>

      {/* Корпус телефона — упрощённый CSS-мокап, позиция/размер как в Figma. */}
      <div
        className="absolute left-[752px] top-[162px] h-[576px] w-[276px] rounded-[52px] bg-gradient-to-b from-[#3a3a3c] via-[#1c1c1e] to-[#3a3a3c] p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        aria-hidden
      >
        <div className="relative size-full overflow-hidden rounded-[42px] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${A}/phone-screen-content.png`}
            alt="Экран приложения с одновременным использованием иконок из Icons Regular и Icons Symbols"
            className="absolute inset-0 size-full object-cover object-top"
          />
          <div className="absolute left-1/2 top-[10px] h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </section>
    </div>
  );
}
