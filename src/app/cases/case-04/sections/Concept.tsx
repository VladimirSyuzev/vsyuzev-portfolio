import Reveal from "@/components/Reveal";

// 02 Концепция — 1:1 из актуальной Figma (node 2034:15738, высота 1539).
// Крупный дисплейный заголовок «02 / КОНЦЕПЦИЯ» (175px). Левая колонка —
// текст идеи и слогана. Справа — билборд «Your crypto, ready for real
// life.» (растр) и раскладка слогана CRYPTO · PAYMENTS · SETTLED с
// подписями + три кроп-фото (растр). Подчёркивание-доодл слева снизу.
const A = "/cases/case-04/sections";

// Слоган CRYPTO · PAYMENTS · SETTLED — теперь векторные подписи
// (Figma nodes 2440:62462 / 62463 / 62464), а не текст.
const SLOGAN: { svg: string; w: number; left: number; caption: string; capLeft: number; capW: number }[] = [
  { svg: "slogan-crypto.svg", w: 224, left: 556, caption: "Ресурс, которым вы уже располагаете.", capLeft: 556, capW: 222 },
  { svg: "slogan-payments.svg", w: 291, left: 819, caption: "Как это используется в реальной жизни.", capLeft: 847, capW: 234 },
  { svg: "slogan-settled.svg", w: 245, left: 1149, caption: "Сделка завершена.", capLeft: 1216, capW: 111 },
];

export default function Concept() {
  return (
    <div className="relative h-[1539px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Дисплейный заголовок (Figma frame 2034:15742, 175px, leading-[1.1]). */}
      <div className="absolute left-[46px] top-[181px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <span className="text-[#008cff]">02</span>
        <span className="text-[#121212]">Концепция</span>
      </div>

      {/* Левая колонка. «В основе кампании лежит идея:» — обычный наборный
          текст: Aeonik Pro Regular, opacity 70 (Figma node 2034:15747). */}
      <p className="absolute left-[46px] top-[730px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        В основе кампании лежит идея:
      </p>
      <p className="absolute left-[46px] top-[759px] w-[327px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Your crypto, ready for real life.
      </p>
      <p className="absolute left-[46px] top-[793px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Мы не показываем процесс транзакции. Вместо этого фокусируемся на результате: crypto
        становится частью реальной жизни и помогает совершать конкретные покупки.
      </p>
      <p className="absolute left-[46px] top-[1060px] w-[327px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Слоган <span className="font-medium">CRYPTO. PAYMENTS. SETTLED.</span> собирает эту идею в три
        коротких состояния. Визуальная формула ещё проще: человек, телефон и объект покупки.
      </p>

      {/* Билборд (Figma frame 2082:18144 → x556 / y730, 838×262). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Билборд Stablegate: «Your crypto, ready for real life.» с парой у дома"
        className="absolute left-[556px] top-[730px] h-[262px] w-[838px] object-cover"
        src={`${A}/concept-billboard.jpg`}
      />

      {/* Слоган CRYPTO · PAYMENTS · SETTLED — векторные подписи + мелкие
          пояснения под каждой (Figma nodes 2440:62462…62464 / 2083:18175…). */}
      {SLOGAN.map((s) => (
        <span key={s.svg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={s.svg.replace("slogan-", "").replace(".svg", "")}
            className="absolute top-[1055px] block h-[45px] max-w-none"
            style={{ left: s.left, width: s.w }}
            src={`${A}/${s.svg}`}
          />
          <p
            className="absolute top-[1115px] text-[11px] leading-[1.2] tracking-[0.22px] text-[#121212] opacity-70"
            style={{ left: s.capLeft, width: s.capW }}
          >
            {s.caption}
          </p>
        </span>
      ))}

      {/* Три кроп-фото (Figma frame 2093:18192 → x556 / y1140, 836×262). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Телефон Stablegate, женщина с ключами и связка ключей от дома"
        className="absolute left-[556px] top-[1140px] h-[262px] w-[836px] object-cover"
        src={`${A}/concept-crops.jpg`}
      />

      {/* Хайлайт — крупная итоговая мысль (Wix Madefor Display Regular,
          uppercase) слева снизу, с рукописным подчёркиванием (Figma node
          2399:35413 → x132 / y1415). */}
      <p className="absolute left-[46px] top-[1256px] w-[470px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Вместо технологии
        <br />
        мы показываем
        <br />
        результат, который
        <br />
        она даёт человеку
      </p>
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-[132px] top-[1415px] h-[17px] w-[351px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/concept-underline.svg`} />
      </Reveal>
    </div>
  );
}
