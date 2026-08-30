// 02 Исследование — 1:1 из актуальной Figma (node 2022:14704, высота 1029).
// В новой версии это мудборд: россыпь 3D-референсов с подписями MATERIAL /
// FORM / COMPOSITION / RESULT + доодл-«глаз». Плотная визуальная
// композиция — единый растровый ассет (FIGMA-BRIEF §5); живьём в DOM
// только заголовок и вводный текст (перекрывают запечённые в левом
// верхнем углу).
const A = "/cases/case-03/sections";

export default function Research() {
  return (
    <div className="relative h-[1029px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Мудборд 3D-референсов: материалы, форма, композиция, итог"
        className="absolute inset-0 block size-full"
        src={`${A}/research.jpg`}
      />

      {/* Живой заголовок + вводный текст поверх запечённых в ассете. */}
      <div className="absolute left-0 top-0 h-[320px] w-[560px] bg-[#fafafa]" />
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">Исследование</p>
      </div>
      <div className="absolute left-[46px] top-[181px] flex w-[499px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          Работа началась с изучения продукта и поиска визуальных метафор. Вместе с маркетологом
          мы определили ключевые функции и преимущества Stablegate, а затем искали для них понятные
          образы.
        </p>
        <p>
          От привычной банковской символики сознательно отказались в пользу более современных и
          технологичных решений. После этого я собрал референсы, сделал серию быстрых скетчей и
          определил принципы будущей системы.
        </p>
      </div>
    </div>
  );
}
