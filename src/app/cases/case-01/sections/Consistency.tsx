import BalanceBoard1 from "./BalanceBoard1";
import BalanceBoard2 from "./BalanceBoard2";

// 06 Контроль консистентности — 1:1 из Figma (node 1961:32477), полностью
// пересверено повторным запросом после переподключения Figma MCP —
// расхождений оказалось много:
// - обе Balance Board стояли не на своих местах и не того размера (386/896
//   вместо 46/386, 498px вместо 328px — см. поправку масштаба в самих
//   компонентах BalanceBoard1/2.tsx) и были перепутаны местами (bAAALANCE_1
//   с медицинскими иконками — слева, bAAALANCE_2 с категориями сервиса —
//   справа от неё, было наоборот);
// - вторая фраза "Именно этот инструмент..." была маленьким серым текстом
//   рядом с первым абзацем — на деле это отдельная крупная жирная цитата
//   (Body/Bold, 32px, справа у BalanceBoard2), а первый абзац сам по себе
//   стоит наверху (top-181), а не внизу (top-638);
// - двух декоративных элементов не было вообще (доодл-«глаз» справа сверху
//   и рукописное подчёркивание под цитатой); старый consistency-doodle.svg
//   слева снизу не соответствовал ничему в текущем дереве Figma — убран.
//
// Фон растянут на весь экран (w-full, как Pipeline/Footer/Итог) — стоящее
// правило для всех тёмных/картиночных блоков сайта.
export default function Consistency() {
  return (
    <div className="relative h-[900px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff] uppercase">06</p>
          <p className="text-white">КОНТРОЛЬ КОНСИСТЕНТНОСТИ</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Чтобы новые иконки не выбивались из существующей библиотеки, использовалось сразу
          несколько инструментов. Главным из них стал Balance Board: сетка из существующих и
          новых иконок на одном экране, где можно было быстро проверить визуальный вес,
          насыщенность деталей, толщину линий, пропорции, характер скруглений и общий баланс
          библиотеки.
        </p>

        <div className="absolute left-[46px] top-[389px] size-[328px] overflow-hidden">
          <BalanceBoard1 />
        </div>
        <div className="absolute left-[386px] top-[389px] size-[328px] overflow-hidden">
          <BalanceBoard2 />
        </div>

        <p className="absolute left-[791.66px] top-[547px] w-[516px] uppercase font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Именно этот инструмент позволял принимать большинство решений ещё до передачи работы
          клиенту
        </p>

        {/* Доодл-«глаз» — статичный, x/y 1:1 из Figma (instance node 2284:39976). */}
        <div className="absolute left-[1043.27px] top-[178.81px] h-[155.4px] w-[180.73px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/consistency-eye-doodle.svg" />
        </div>

        {/* Рукописное подчёркивание под цитатой — node 2354:3911. Высота
            пересчитана по пропорциям настоящего экспорта (525×29) под
            ширину 518: инструмент репортил 71.48 — та же аномалия
            измерения bounding box у волнистого path, что была у эллипса
            в "Руководстве для команды"; top сдвинут так, чтобы центр
            остался на месте. */}
        <div className="absolute left-[814.23px] top-[728.44px] h-[28.61px] w-[518px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-01/sections/consistency-underline.svg" />
        </div>
      </div>
    </div>
  );
}
