// «Экран» (01 Проблема, слайд 2 из 2) — 1:1 из Figma (node 1965:41904).
// Аннотированный скриншот интерфейса с одновременным использованием
// Icons Regular/Icons Symbols — реалистичный UI-мокап, оставлен единым
// screenshot-ассетом (десятки мелких favicon/картинок внутри мокапа не
// несут самостоятельного текстового смысла вне самого скриншота).
export default function Screen() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#121212]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/screen.png"
        alt="Экран с одновременным использованием иконок из разных библиотек — Icons Regular и Icons Symbols"
        width={1440}
        height={900}
        className="block w-full"
      />
    </div>
  );
}
