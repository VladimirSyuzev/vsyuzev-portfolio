import Reveal from "@/components/Reveal";

// 03 Визуальный язык — 1:1 из актуальной Figma (node 2236:94095, высота
// 1377). Тёмный блок → full-bleed (#121212 на всю ширину, контент в
// 1440-сетке). Фото (резка металла) — на всю ширину контента (1348×536,
// top 318). Итоговая мысль (Wix Madefor Display Regular, по центру) в
// плоской обводке-эллипсе (экспорт узла 2382:21152, 787×136, начало SVG =
// координата секции 326.67 / 1066.8).
const A = "/cases/case-02/sections";

export default function VisualLanguage() {
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[1377px] w-[1440px]">
        <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">Визуальный язык</p>
        </div>

        <p className="absolute left-[44px] top-[181px] w-[500px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Самой сложной задачей было найти простой принцип, который помогал бы всей команде понимать
          границы нового визуального языка. Такой метафорой стала деталь, вырезанная из цельного
          листа металла: если форму нельзя было представить вырезанной таким способом, значит, она
          не соответствовала стилю.
        </p>

        {/* Правый абзац — отдельный блок под фото справа (Figma node 2236:94101 → x726 / y866). */}
        <p className="absolute left-[726px] top-[866px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Этот принцип изменил подход к проектированию иконок. Вместо того чтобы строить их из линий
          и контуров, мы начинали с цельной формы и постепенно убирали всё лишнее.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Лазерная резка детали из листа металла"
          className="absolute left-[46px] top-[318px] h-[536px] w-[1348px] object-cover"
          src={`${A}/visual-photo.jpg`}
        />

        {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2382:21152).
            Якорь по translate фонового rect экспорта: левый-верх SVG =
            точка секции (326.67, 1066.8). viewBox расширен на поля −6/−8
            (чтобы «хвост» и круглые концы штриха не срезались при загрузке
            через <img>), поэтому бокс смещён на эти же поля. */}
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute"
          style={{ left: 321, top: 1059, width: 799, height: 152 }}
        >
          <img alt="" className="block size-full" src={`${A}/visual-ellipse.svg`} />
        </Reveal>

        <p className="absolute left-1/2 top-[1098.1px] w-[667px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Новый стиль строился
          <br />
          не из линий, а из цельной формы
        </p>
      </div>
    </div>
  );
}
