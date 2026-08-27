// «Экран» (01 Проблема, слайд 2 из 2) — 1:1 из Figma (node 1965:41904).
// Текст/буллиты/прогресс-индикатор — настоящий DOM. Композиция телефона +
// диаграмма-аннотация — два настоящих SVG-слоя, экспортированных
// пользователем напрямую из Figma в одном холсте (совпадающий размер,
// накладываются друг на друга без ручного пересчёта офсетов): слой 1 —
// телефон с реалистичным экраном выдачи, слой 2 — пунктирные
// кружки/линии + подписи ICONS REGULAR/ICONS SYMBOLS поверх.
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
    <div data-snap-stop className="flex min-h-screen w-full items-center justify-center bg-[#121212]">
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

        {/* Телефон + аннотация — два слоя, тот же холст, друг на друге. */}
        <div className="absolute left-[556px] top-[166px] h-[576px] w-[669px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/screen-layer-1.svg`} />
          <img
            alt="Экран приложения с одновременным использованием иконок из Icons Regular и Icons Symbols"
            className="absolute inset-0 block size-full max-w-none"
            src={`${A}/screen-layer-2.svg`}
          />
        </div>
      </section>
    </div>
  );
}
