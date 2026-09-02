import Reveal from "@/components/Reveal";

// 02 Исследование — 1:1 из актуальной Figma (node 2009:12143, высота 1065).
// Пользователь выровнял заголовок и вводный текст ПО ЛЕВОМУ КРАЮ (было по
// центру). Ниже — рабочий документ из трёх карточек (Список / Поиск формы
// / Итог) единым экспортом 1008×645 (перевыгружен: новый список из 10
// сервисов с описаниями). Доодл-«лупа» уехал вверх между текстом и
// документом (node 2279:32678 → 575 / 302.45).
const A = "/cases/case-02/sections";

export default function Research() {
  return (
    <div className="relative h-[1065px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      <div className="absolute left-[46px] top-[181px] flex w-[498px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
        <p className="opacity-70">
          Метафоры сервисов уже существовали, поэтому мы не искали новые образы, а переосмысляли
          знакомые символы внутри нового визуального языка. Для этого анализировали предыдущую
          библиотеку, первые примеры новых иконок и визуальные референсы.
        </p>
        <p className="opacity-70">
          Главной целью было сохранить узнаваемость сервисов и привести их к единому стилю.
        </p>
      </div>

      {/* Доодл-«лупа» — в пустой зоне справа от вводного текста, над
          документом (Figma node 2279:32678: bbox инстанса 575/302 смещён
          вниз и раздут; реальный контур по скриншоту Figma — x599 / y177,
          ~94×95). В SVG (138×168) чернила смещены на ~17/39 от угла бокса,
          поэтому бокс ставим в 582/138. */}
      <Reveal variant="doodle" delay={0.1} className="absolute left-[582px] top-[138px] z-10 h-[168px] w-[138px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/research-doodle.svg`} />
      </Reveal>

      {/* Карточки-документ (Figma node 2382:21150 → x216 / top 318, 1008×645).
          Появление по скроллу (fade + сдвиг снизу). */}
      <Reveal variant="fade" className="absolute left-[216px] top-[318px] h-[644.735px] w-[1008px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Список из 10 сервисов Yandex Cloud с метафорами, поиск формы иконок и итоговые иконки"
          className="block size-full"
          src={`${A}/research-cards.png`}
        />
      </Reveal>
    </div>
  );
}
