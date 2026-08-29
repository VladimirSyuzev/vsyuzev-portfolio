import Reveal from "@/components/Reveal";

// 05 сначала 16px — 1:1 из актуальной Figma (node 2009:12761, высота 1172).
// Заголовок 32px. Два абзаца слева (top 180 / 220). Справа — иконка 640px
// с 16px-версией в левом верхнем углу (экспорт узла 2009:12797). Итоговая
// мысль (Wix Madefor Display Regular) слева, top 853, с подчёркиванием.
const A = "/cases/case-02/sections";

export default function First16px() {
  return (
    <div className="relative h-[1172px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[133px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">сначала 16px</p>
      </div>

      <p className="absolute left-[46px] top-[180px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        Каждая иконка создавалась в двух размерах: 16 × 16 px и 640 × 640 px. Работу всегда начинали
        с маленькой версии.
      </p>
      <p className="absolute left-[46px] top-[220px] w-[505px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        После её утверждения создавали большую. Это было не простое масштабирование: менялись
        пропорции, толщина линий и радиусы скруглений, появлялись дополнительные детали. Большая
        версия становилась самостоятельной иллюстрацией, сохраняя характер маленькой.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Иконка Key Management Service: 640px и её 16px-версия в левом верхнем углу"
        className="absolute left-[726px] top-[318px] size-[640px]"
        src={`${A}/icon16-box.svg`}
      />

      {/* Доодл (Figma node 2383:21170 → 458.3 / 323.32). */}
      <Reveal variant="doodle" className="absolute left-[458.301px] top-[323.32px] h-[139px] w-[140px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/icon16-doodle.svg`} />
      </Reveal>

      {/* Подчёркивание под итоговой мыслью (Figma node 2383:21156 → 156 / 964.37). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 156, top: 964.367, width: 524, height: 33 }}
      >
        <img alt="" className="block size-full" src={`${A}/icon16-underline.svg`} />
      </Reveal>

      <p className="absolute left-[46px] top-[853px] w-[589px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Маленький размер
        <br />
        проверял главное: силуэт, композицию и читаемость.
      </p>
    </div>
  );
}
