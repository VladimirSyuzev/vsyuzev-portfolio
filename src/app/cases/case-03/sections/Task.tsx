import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";
import VariantsCarousel from "@/components/VariantsCarousel";
import FullBleedScale from "@/components/FullBleedScale";
import { C3_TEXT } from "../tokens";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — общий VariantsCarousel: снап-карусель маркетинговых
// форматов во всю ширину, перетаскивание вбок, бар снизу.
// Ниже — «Система должна была:» + 4 требования с галочками, крупная
// итоговая мысль с подчёркиванием и 3D-стек монет слева.
const A = "/cases/case-03/sections";

const CARDS = [
  { src: `${A}/variant1.webp`, w: 1419, h: 798, alt: "Слайд презентации: Transparent pricing 0,5–2%" },
  { src: `${A}/variant2.webp`, w: 639, h: 798, alt: "Пост: Move digital assets with confidence" },
  { src: `${A}/variant3.webp`, w: 798, h: 798, alt: "Пост: Payments without delays" },
  { src: `${A}/variant4.webp`, w: 1197, h: 798, alt: "Пост: Real-time transactions" },
];

const REQS: [string, string][] = [
  ["Сохранять", "визуальную целостность"],
  ["Объяснять", "особенности продукта"],
  ["Масштабироваться", "в маркетинговых материалах"],
  ["Использоваться", "на любом фоне"],
];

function Req({ head, sub, icon = "task-check.svg" }: { head: string; sub: string; icon?: string }) {
  return (
    <div className="flex h-[34px] gap-[8px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="h-[34px] w-[28px] shrink-0" src={`${A}/${icon}`} />
      <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {head}
        <br />
        {sub}
      </p>
    </div>
  );
}

export default function Task() {
  return (
    <section className="relative w-full overflow-clip bg-[#fafafa]">
      {/* ≥1440 — 1:1 из Figma-канваса 1440. */}
      <div className="relative mx-auto hidden h-[1672px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">Задача</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[668px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет
          функциональность продукта без текста и работает в разных форматах и контекстах.
        </p>

        {/* Доодл-«молния» (Figma node 2384:21368 → 1216 / 394). */}
        <DrawIn
          src={`${A}/task-doodle-flash.svg`}
          fit="contain"
          className="absolute left-[1216px] top-[394px] z-10 h-[121px] w-[93px]"
        />

        <p className="absolute left-[726px] top-[1140px] w-[564px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          Система должна была:
        </p>

        <div className="absolute left-[726px] top-[1169px] flex gap-[12px]">
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[0][0]} sub={REQS[0][1]} />
            <Req head={REQS[1][0]} sub={REQS[1][1]} />
          </div>
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[2][0]} sub={REQS[2][1]} />
            <Req head={REQS[3][0]} sub={REQS[3][1]} />
          </div>
        </div>

        {/* 3D-стек монет (Figma node 2399:35306, x216 / y1293, 328×328). */}
        <Reveal variant="fade" className="absolute left-[216px] top-[1293px] size-[328px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1369px] w-[624px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
          Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь
          прочитает текст
        </p>

        {/* Подчёркивание-доодл под итоговой мыслью (Figma node 2384:21369). */}
        <DrawIn
          src={`${A}/task-doodle-arrow.svg`}
          className="absolute left-[884px] top-[1556px] h-[35px] w-[394px]"
        />
      </div>

      {/* ≥1440 — лента «варианты» (Figma node 2079:17726 → y595). Прямой
          ребёнок <section> (обёртка hidden xl:block без своего position),
          поэтому absolute inset-x-0 внутри VariantsCarousel тянется на всю
          ширину экрана, а не обрезается 1440-боксом. */}
      <div className="hidden xl:block">
        <VariantsCarousel cards={CARDS} top={595} tone="light" />
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма 2695:17969 (1280×1436).
          FullBleedScale масштабирует фикс-канвас 1280×1436 под реальную
          ширину — все координаты 1:1 из Figma, ничего не «плывёт» на
          промежуточных ширинах. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1490} mode="grow" className="w-full">
          <div className="relative h-[1490px] w-[1280px] bg-[#fafafa]">
            {/* Заголовок 175px — «01» + «Задача», gap 24, items-center. */}
            <div className={`absolute left-[40px] top-[72px] flex items-center gap-[24px] whitespace-nowrap ${C3_TEXT.displayXl}`}>
              <span className="text-[#008cff]">01</span>
              <span className="text-[#121212]">Задача</span>
            </div>

            {/* Молния (Vector 234257381) — (1077.04, 250.8), 92.57×120.91. */}
            <DrawIn
              src={`${A}/task-doodle-flash.svg`}
              fit="contain"
              className="absolute left-[1077px] top-[251px] z-10 h-[121px] w-[93px]"
            />

            {/* Вводный абзац (40, 297), 594×51, Aeonik Pro Medium uppercase
                (перенос после «без текста »). */}
            <p className={`absolute left-[40px] top-[297px] w-[594px] text-[#121212] ${C3_TEXT.bodyMediumCaps}`}>
              Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая
              объясняет функциональность продукта без текста
              <br />и работает в разных форматах и контекстах.
            </p>

            {/* Витрина «варианты» (2707:41600, 40/412) — VariantsCarousel на
                всю ширину канваса 1280: контент 1642 в окне, лишние карточки
                уходят за край экрана (как в Figma), а не обрезаются на 1240 с
                мёртвой полосой справа. Ниже добавляется бар (стрелки+точки) —
                поэтому блок «Система должна была:» сдвинут вниз на 54px
                (высота бара) относительно Figma-координаты 875. */}
            <VariantsCarousel cards={CARDS} top={412} tone="light" />

            {/* «Система должна была:» (646, 875+54=929) — medium uppercase,
                но С opacity-70 (Figma 2695:17976). */}
            <p className={`absolute left-[646px] top-[929px] w-[594px] text-[#121212] opacity-70 ${C3_TEXT.bodyMediumCaps}`}>
              Система должна была:
            </p>
            {/* Сетка 4 требований (646, 904+54=958), 2 колонки 291, gap 12. */}
            <div className="absolute left-[646px] top-[958px] flex gap-[12px]">
              <div className="flex w-[291px] flex-col gap-[12px]">
                <Req head={REQS[0][0]} sub={REQS[0][1]} />
                <Req head={REQS[1][0]} sub={REQS[1][1]} />
              </div>
              <div className="flex w-[291px] flex-col gap-[12px]">
                <Req head={REQS[2][0]} sub={REQS[2][1]} />
                <Req head={REQS[3][0]} sub={REQS[3][1]} />
              </div>
            </div>

            {/* 3D-стек монет (178, 1036+54=1090), 328×328. */}
            <Reveal variant="fade" className="absolute left-[178px] top-[1090px] size-[328px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
            </Reveal>

            {/* Цитата (646, 1112+54=1166), 594×175. */}
            <p className={`absolute left-[646px] top-[1166px] w-[594px] text-[#121212] ${C3_TEXT.quote}`}>
              Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как
              пользователь прочитает текст
            </p>

            {/* Волнистое подчёркивание (Vector 234257367) — (798, 1266+54=1320), 387.57×90.44. */}
            <DrawIn
              src={`${A}/task-doodle-arrow.svg`}
              className="absolute left-[798px] top-[1320px] h-[90px] w-[388px]"
            />
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma «case-03 · 375» (node 2695:19561, 375×1262).
          Блоки после карусели сдвинуты на +54 под её нижний бар. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={1316} mode="grow" className="w-full">
          <div className="relative h-[1316px] w-[375px] bg-[#fafafa]">
            {/* «01 Задача» — Wix Bold 26, gap 12, (20, 64). */}
            <div className="absolute left-[20px] top-[64px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none">
              <span className="text-[#008cff]">01</span>
              <span className="text-[#121212]">Задача</span>
            </div>
            {/* Вводный абзац (20, 102), 335, Aeonik Medium 14 UPPERCASE. */}
            <p className="absolute left-[20px] top-[102px] w-[335px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
              Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая
              объясняет функциональность продукта без текста и работает в разных форматах и
              контекстах.
            </p>

            {/* Витрина «варианты» (2823:40971, y219) — VariantsCarousel, свои
                размеры карточек (hSmall 117 / hBig 178). */}
            <VariantsCarousel cards={CARDS} top={219} hSmall={117} hBig={178} tone="light" />

            {/* «Система должна была:» (20, 429 + 54 = 483) — Aeonik Medium 14
                UPPERCASE opacity-70. */}
            <p className="absolute left-[20px] top-[483px] w-[335px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Система должна была:
            </p>
            {/* Чек-лист — 1 колонка, 4 строки (20, 429 + 29 + 54 = 512), gap 12. */}
            <div className="absolute left-[20px] top-[512px] flex w-[328px] flex-col gap-[12px]">
              <Req head={REQS[0][0]} sub={REQS[0][1]} icon="task-check-375.svg" />
              <Req head={REQS[1][0]} sub={REQS[1][1]} icon="task-check-375.svg" />
              <Req head={REQS[2][0]} sub={REQS[2][1]} icon="task-check-375.svg" />
              <Req head={REQS[3][0]} sub={REQS[3][1]} icon="task-check-375.svg" />
            </div>

            {/* 3D-стек монет (Coin, 2695:19793) — (20, 662 + 54 = 716), 328×328.
                На 375 виден (на 834 был hidden). */}
            <Reveal variant="fade" className="absolute left-[20px] top-[716px] size-[328px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
            </Reveal>

            {/* Цитата (Frame 2147232030, 20, 1022 + 54 = 1076), w-329, Wix
                Regular 22 UPPERCASE opacity-70. БЕЗ ручного переноса —
                естественная вёрстка в 6 строк (макет обновлён). */}
            <p className="absolute left-[20px] top-[1076px] w-[329px] font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70">
              Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как
              пользователь прочитает текст
            </p>
            {/* Подчёркивание-хайлайт (Vector 234257367, 2835:53360) — Figma abs
                (20.4, 2250.3) → секц. y ≈ 1173 + 54 = 1227, 339.01×23.08,
                viewBox SVG 345.01×29.08, картинка inset -13%/-0.88%. Выходит
                на ~10px за правый край текста. */}
            <div className="absolute left-[20px] top-[1227px] h-[23.08px] w-[339px]">
              <DrawIn src={`${A}/task-underline-375.svg`} className="absolute inset-[-13%_-0.88%]" />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node 2695:18765,
          834×1387). Координаты блоков ПОСЛЕ карусели сдвинуты на +54 под её
          нижний бар (стрелки+точки) — как в 1280-раскладке. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1441} mode="grow" className="w-full">
          <div className="relative h-[1441px] w-[834px] bg-[#fafafa]">
            {/* «01 Задача» — Wix Bold 100, gap 24, items-center, (28, 72). */}
            <div className="absolute left-[28px] top-[72px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-[1.1]">
              <span className="text-[#008cff]">01</span>
              <span className="text-[#121212]">Задача</span>
            </div>

            {/* Вводный абзац (28, 214), w-384, Aeonik Medium 14 UPPERCASE.
                Ручные <br> точь-в-точь как в макете: после «функциональность
                продукта » и после «в разных форматах ». */}
            <p className="absolute left-[28px] top-[214px] w-[384px] whitespace-pre-wrap text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
              Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая
              объясняет функциональность продукта{" "}
              <br />
              без текста и работает в разных форматах{" "}
              <br />и контекстах.
            </p>

            {/* Флэш-доодл (Vector 234257381) — теперь В ХЕДЕРЕ: Figma abs
                (28+572, 72+135) = (600, 207), bbox 78.82×102.96, контент
                58.4×91.5 повёрнут на 14.02°. */}
            <div className="absolute left-[600px] top-[207px] z-10 flex h-[102.956px] w-[78.822px] items-center justify-center">
              <DrawIn
                src={`${A}/task-flash-834.svg`}
                fit="contain"
                className="h-[91.539px] w-[58.385px] rotate-[14.02deg]"
              />
            </div>

            {/* Витрина «варианты» (2695:18793, y363) — VariantsCarousel на
                всю ширину канваса 834; те же 4 ассета, что и в 1280/1440. */}
            <VariantsCarousel cards={CARDS} top={363} tone="light" />

            {/* «Система должна была:» (28, 826 + 54 = 880) — Aeonik Medium 14
                UPPERCASE opacity-70. */}
            <p className="absolute left-[28px] top-[880px] w-[594px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Система должна была:
            </p>
            {/* Сетка 4 требований (28, 826 + 28.8 + 54 ≈ 909), 2 колонки 228 / 291, gap 12. */}
            <div className="absolute left-[28px] top-[909px] flex w-[594px] gap-[12px]">
              <div className="flex w-[228px] flex-col gap-[12px]">
                <Req head={REQS[0][0]} sub={REQS[0][1]} icon="task-check-834.svg" />
                <Req head={REQS[1][0]} sub={REQS[1][1]} icon="task-check-834.svg" />
              </div>
              <div className="flex w-[291px] flex-col gap-[12px]">
                <Req head={REQS[2][0]} sub={REQS[2][1]} icon="task-check-834.svg" />
                <Req head={REQS[3][0]} sub={REQS[3][1]} icon="task-check-834.svg" />
              </div>
            </div>

            {/* Цитата + подчёркивание (Frame 2147231997, y 826 + 161 + 54 =
                1041; текст top 65.89 → ≈ 1107). Wix Regular 28 UPPERCASE
                opacity-70, по центру. В макете 5 строк (w-471) — веб-шрифт
                шире, поэтому строки жёсткие, как в макете. */}
            <div className="absolute left-[422px] top-[1107px] w-[471px] -translate-x-1/2">
              <p className="text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70">
                Каждая иллюстрация
                <br />
                должна была объяснять
                <br />
                функцию продукта ещё
                <br />
                до того, как пользователь
                <br />
                прочитает текст
              </p>
              {/* Подчёркивание (Vector 234257367, node 2836:53648 — перерисовано
                  в макете: теперь плавная линия). Figma bbox 453.51×19.17,
                  viewBox SVG 459.5×25.17 (ratio ~18.25), наклон ~2.4° в самом
                  SVG. Сидит вплотную под последней строкой (Figma +3px). */}
              <DrawIn
                src={`${A}/task-underline-834.svg`}
                className="pointer-events-none absolute left-[calc(50%+11px)] top-[calc(100%+1px)] h-[25.17px] w-[459.5px] -translate-x-1/2"
              />
            </div>
          </div>
        </FullBleedScale>
      </div>
    </section>
  );
}
