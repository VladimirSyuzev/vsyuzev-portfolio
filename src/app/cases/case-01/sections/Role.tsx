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
import Reveal from "@/components/Reveal";

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
    <div className="relative h-[1033px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* Крупный дисплейный заголовок (Figma node 1961:32606, 175px,
          leading-none, top 152, gap 24). */}
      <div className="absolute left-[46px] top-[152px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-none tracking-[5.25px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">РОЛЬ</p>
      </div>

      {/* Текст справа, два абзаца (Figma node 2381:20975). */}
      <div className="absolute left-[896px] top-[181px] flex w-[498px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        <p>
          Как арт-директор, я выстроил и контролировал процесс работы над проектом. Проверял каждую
          иконку на промежуточных этапах, следил за консистентностью библиотеки и разработал
          производственный гайд.
        </p>
        <p>
          Гайд описывал весь процесс: от поиска метафоры до сборки компонентов. Он стал основой
          дальнейшей работы команды и помог поддерживать единое качество на протяжении всего
          проекта.
        </p>
      </div>

      <div className="absolute bottom-[146px] left-[46px] flex items-end justify-center gap-[12px]">
        {STEPS.map((step, i) => (
          <div key={step.number} className="group flex w-[328px] flex-col gap-[24px]">
            {/* Диаграмма — место под неё зарезервировано всегда (h-328),
                подписи не дёргаются. В покое картинка скрыта маской
                clip-path: inset(100% 0 0 0) (виден только низ), по наведению
                маска раскрывается СНИЗУ ВВЕРХ до inset(0) + лёгкий
                scale .96→1 от нижнего края, 450мс expo-out. Та же анимация,
                что у фрейма «варианты» в кейсе 2 (Task.tsx). */}
            <div className="h-[328px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-[328px] origin-bottom scale-[0.96] [clip-path:inset(100%_0_0_0)] transition-[clip-path,transform] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none group-hover:scale-100 group-hover:[clip-path:inset(0px)]"
                src={step.image}
              />
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
                    Figma-компоненте. Голубой «+» появляется при входе блока
                    (doodle-ревил, стаггер по шагам). */}
                <Reveal variant="doodle" delay={i * 0.09} className="shrink-0">
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
                </Reveal>
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
