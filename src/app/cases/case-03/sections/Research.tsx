import Reveal from "@/components/Reveal";

// 02 Исследование — 1:1 из Figma (node 2022:14704). Текст + доодл-«глаз» +
// фото планшета со скетчами (растр).
const A = "/cases/case-03/sections";

export default function Research() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      {/* Доодл-«глаз» (Figma node 2285:45870). */}
      <Reveal variant="doodle" className="absolute left-[423.34px] top-[592px] h-[110.475px] w-[156.942px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/research-doodle.svg`} />
      </Reveal>

      <p className="absolute left-[46px] top-[752px] w-[499px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Работа началась с исследования продукта и поиска визуальных метафор. Вместе с маркетологом
        мы определили ключевые функции и преимущества Stablegate, после чего искали понятные
        образы. От привычных банковских символов сознательно отказались в пользу современных и
        технологичных решений. Затем я собрал референсы, сделал серию быстрых скетчей и определил
        правила будущей системы.
      </p>

      <div className="absolute left-[726px] top-[181px] h-[673px] w-[668px] overflow-clip">
        <img
          alt="Скетчи будущих 3D-иллюстраций на планшете"
          className="absolute left-1/2 top-1/2 h-[782px] w-[782px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
          src={`${A}/research-photo.jpg`}
        />
      </div>
    </div>
  );
}
