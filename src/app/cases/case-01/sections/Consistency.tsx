import BalanceBoard1 from "./BalanceBoard1";
import BalanceBoard2 from "./BalanceBoard2";

// 06 Контроль консистентности — 1:1 из Figma (node 1961:32477). Два
// Balance Board (сетки иконок для сверки визуального веса) — теперь
// настоящий DOM/SVG (снято через get_design_context узлов 1961:32486 и
// 1961:32544), раньше были screenshot-ассетами.
//
// Фон растянут на весь экран (w-full, как Pipeline/Footer) — раньше был
// зажат в 1440px, и на широких экранах по бокам оставались белые поля.
// Контент — в центрированной 1440-сетке внутри, координаты не менялись.
export default function Consistency() {
  return (
    <div className="relative h-[900px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff] uppercase">06</p>
          <p className="text-white">КОНТРОЛЬ КОНСИСТЕНТНОСТИ</p>
        </div>

        <div className="absolute left-[44px] top-[638px] flex w-[330px] flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>
            Чтобы новые иконки не выбивались из существующей библиотеки, использовалось сразу
            несколько инструментов. Главным из них стал Balance Board — сетка из существующих и
            новых иконок на одном экране, где можно было быстро проверить визуальный вес,
            насыщенность деталей, толщину линий, пропорции, характер скруглений и общий баланс
            библиотеки.
          </p>
          <p>Именно этот инструмент позволял принимать большинство решений ещё до передачи работы клиенту.</p>
        </div>

        <div className="absolute left-[386px] top-[356px] size-[498px]">
          <BalanceBoard1 />
        </div>
        <div className="absolute left-[896px] top-[356px] size-[498px]">
          <BalanceBoard2 />
        </div>

        <div className="absolute left-[-4px] top-[513px] h-[125px] w-[158px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/consistency-doodle.svg" />
        </div>
      </div>
    </div>
  );
}
