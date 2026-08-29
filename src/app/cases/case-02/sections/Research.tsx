import Reveal from "@/components/Reveal";

// 02 Исследование — 1:1 из актуальной Figma (node 2009:12143, высота 994).
// Заголовок «02 ИССЛЕДОВАНИЕ» по ЦЕНТРУ (32px). Вводный текст — тоже по
// центру, два абзаца. Ниже — рабочий документ из трёх карточек (Список /
// Поиск формы / Итог) единым экспортом 838×536 (перевыгружен: новый
// список из 10 сервисов). Доодл «//» справа снизу (node 2279:32678).
const A = "/cases/case-02/sections";

export default function Research() {
  return (
    <div className="relative h-[994px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-1/2 top-[134px] flex -translate-x-1/2 items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      <div className="absolute left-1/2 top-[181px] flex w-[668px] -translate-x-1/2 flex-col gap-[6px] text-center text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
        <p className="opacity-70">
          Метафоры сервисов уже существовали, поэтому мы не искали новые образы, а переосмысляли
          знакомые символы внутри нового визуального языка. Для этого анализировали предыдущую
          библиотеку, первые примеры новых иконок и визуальные референсы.
        </p>
        <p className="opacity-70">
          Главной целью было сохранить узнаваемость сервисов и привести их к единому стилю.
        </p>
      </div>

      {/* Карточки-документ (Figma node 2382:21150 → центр, top 318, 838×536).
          Появление по скроллу (fade + сдвиг снизу). */}
      <Reveal variant="fade" className="absolute left-[301px] top-[318px] h-[536px] w-[838px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Список из 10 сервисов Yandex Cloud с метафорами, поиск формы иконок и итоговые иконки"
          className="block size-full"
          src={`${A}/research-cards.png`}
        />
      </Reveal>

      {/* Доодл «//» — поверх карточек (Figma node 2279:32678 → 1090.93 / 759.89). */}
      <Reveal variant="doodle" delay={0.15} className="absolute left-[1090.93px] top-[759.887px] z-10 h-[168px] w-[138px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/research-doodle.svg`} />
      </Reveal>
    </div>
  );
}
