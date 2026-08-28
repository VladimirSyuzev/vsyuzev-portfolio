// 07 Роль — 1:1 из Figma (node 1961:32604). Все 4 шага — интерактивный
// компонент из отдельного файла Figma (node 1752:8440, "Up_1".."Up_4"),
// присланного пользователем отдельной ссылкой: каждый шаг имеет 2
// состояния — "Property 1=+" (по умолчанию: только номер+подпись, без
// картинки) и "Property 1=-" (по наведению: раскрывается диаграмма 328×328
// над подписью). Раньше шаг 004 был единственным с картинкой и показывал
// её ВСЕГДА статично (плюс диаграмма собиралась вручную из ~8 слоёв) — по
// уточнению пользователя это неверно: у всех 4 шагов ОДИНАКОВАЯ логика
// hover-раскрытия, картинка в покое скрыта. Диаграммы 1-4 — плоский
// SVG-экспорт целиком нужного фрейма из Figma (надёжнее и проще, чем
// пересобирать каждую из 5-8 слоёв вручную; проверено — blend-режимы и
// градиенты в экспорте сохраняются).
const RA = "/cases/case-01/sections/role-assets";

const STEPS = [
  { number: "001", text: "Выбрали образ,\nизменяем его в сетке", image: `${RA}/role-diagram-1.svg` },
  { number: "002", text: "Выбираем контур\nиз сетки для формата иконки", image: `${RA}/role-diagram-2.svg` },
  {
    number: "003",
    text: "Помещаем в него образ, пока\nчто он не попадает в визуальный вес сетки",
    image: `${RA}/role-diagram-3.svg`,
  },
  { number: "004", text: "Размещаем объект в контуре,\nс компенсационными вылетами", image: `${RA}/role-diagram-4.svg` },
];

export default function Role() {
  return (
    <div className="relative h-[916px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[45px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">РОЛЬ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[494px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Как арт-директор, я выстроил и контролировал процесс работы над проектом: проверял каждую
        иконку на промежуточных этапах, следил за консистентностью библиотеки и разработал
        производственный гайд, описывающий весь процесс: от поиска метафоры до сборки
        компонентов. Этот документ стал основой дальнейшей работы команды и позволил
        поддерживать единое качество на протяжении всего проекта.
      </p>

      <div className="absolute bottom-[146px] left-[46px] flex items-end justify-center gap-[12px]">
        {STEPS.map((step) => (
          <div key={step.number} className="group flex w-[328px] flex-col gap-[24px]">
            {/* Диаграмма — свёрнута в покое (grid-rows 0fr + opacity 0),
                раскрывается по наведению на карточку. grid-rows-based
                анимация высоты — не max-height/scale, чтобы не пришлось
                подбирать "достаточно большое" значение на глаз. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:grid-rows-[1fr] group-hover:opacity-100">
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-[328px]" src={step.image} />
              </div>
            </div>

            {/* Фикс. высота 78px (как в Figma-компоненте): все ряды с
                номером выравниваются по верху, а более длинная подпись
                004/003 свободно выходит вниз, не сдвигая номер. Раньше
                блок рос вверх (items-end у контейнера) и номер 003
                «всплывал» над остальными. */}
            <div className="flex h-[78px] flex-col gap-[12px]">
              <div className="flex items-center gap-[16px]">
                {/* Иконка тоже переключается: "+" в покое (можно раскрыть),
                    "-" по наведению (можно свернуть) — как в самом
                    Figma-компоненте. */}
                <div className="relative size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 size-full transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-0"
                    src="/cases/case-01/sections/role-plus.svg"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100"
                    src="/cases/case-01/sections/role-minus.svg"
                  />
                </div>
                <p className="text-[14px] font-medium tracking-[0.28px] text-[#121212]">{step.number}</p>
              </div>
              <p className="w-[215px] whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-80">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
