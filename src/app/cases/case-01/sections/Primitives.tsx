// «Примитивы» — 1:1 из Figma (node 1961:31925). Секция без заголовка и
// текста в самом макете (см. hideHeading-подобная логика оригинала) —
// целиком декоративная геометрическая композиция, оставлена как
// screenshot-ассет (примеры фигур → 9 иконок, взаимно однозначная связь
// видна только визуально, реального текста здесь нет).
export default function Primitives() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/primitives.png"
        alt="Базовые геометрические примитивы и итоговые иконки, построенные на их основе"
        width={1440}
        height={900}
        className="block w-full"
      />
    </div>
  );
}
