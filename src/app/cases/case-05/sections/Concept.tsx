import Reveal from "@/components/Reveal";

// 03 Концепция — 1:1 из Figma (node 2210:74460, высота 900). Тёмный
// full-bleed. Заголовок «03 КОНЦЕПЦИЯ» (32px), текст слева и справа, два
// изображения (реальное фото DeLorean и постапокалиптический скетч) и
// доодл-стрелка.
const A = "/cases/case-05/sections";

export default function Concept() {
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[900px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">Концепция</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          DeLorean настолько тесно связан с образом машины времени, что большинство интерпретаций
          неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить эту ассоциацию и
          поместить автомобиль в постапокалиптическую вселенную.
        </p>
        <p className="absolute left-[726px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах: с
          внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.
        </p>
        <p className="absolute left-[726px] top-[221px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          При этом главным условием оставалось сохранить узнаваемый силуэт оригинального автомобиля.
        </p>

        {/* Доодл-стрелка (Figma node 2284:39959). Геометрия и viewBox — из
            `export` (191×178, толщина обводки 6). Якорь: фоновый rect в
            экспорте имеет translate(-1249.32, -215), т.е. левый-верх SVG =
            точка секции (1249.32, 215) — НЕ bbox фрейма (1299.5), у SVG
            слева ~50px поля. */}
        <Reveal variant="doodle" className="absolute left-[1249.5px] top-[215px] z-10 h-[178px] w-[195px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/concept-arrow.svg`} />
        </Reveal>

        {/* Фото + скетч (Figma frames 2223:80174 / 2215:79911 → y318, 668×427). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Реальный DeLorean DMC-12 с открытой дверью в студийном свете"
          className="absolute left-[46px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-photo.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Скетч постапокалиптического DeLorean с внедорожными колёсами и солнечными панелями"
          className="absolute left-[726px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-sketch.jpg`}
        />
      </div>
    </div>
  );
}
