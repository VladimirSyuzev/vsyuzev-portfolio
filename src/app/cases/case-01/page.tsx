"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C1 } from "./i18n";
import SnapScrollController from "./sections/SnapScrollController";
import Stats from "./sections/Stats";
import ProblemScreen from "./sections/ProblemScreen";
import Task from "./sections/Task";
import AuditLibrary from "./sections/AuditLibrary";
import Primitives from "./sections/Primitives";
import Pipeline from "./sections/Pipeline";
import TeamGuide from "./sections/TeamGuide";
import Guide from "./sections/Guide";
import Consistency from "./sections/Consistency";
import Summary from "./sections/Summary";

const ICONS = [
  "icon-alisa-page.svg",
  "icon-gas-page.svg",
  "icon-cosmetics-page.svg",
  "icon-taxi-page.svg",
  "icon-credits-page.svg",
  "icon-moto-page.svg",
  "icon-cinema-page.svg",
  "icon-wallet-page.svg",
  "icon-fastfood-page.svg",
  "icon-thumbsup-page.svg",
  "icon-medical-page.svg",
  "icon-deposit-page.svg",
  "icon-restaurants-page.svg",
  "icon-newbuilding-page.svg",
  "icon-books-page.svg",
  "icon-kids-page.svg",
];

// Кейс 001 — 1:1 из Figma. Обложка/«О проекте»/все разделы 01–08 собраны
// кодом с реальным текстом; несколько плотных декоративных композиций
// (стена иконок-примеров, коллаж гайда, Balance Board, финальная сетка-
// корона, экран-мокап, витрина «Задачи») — screenshot-ассеты; таблица
// аудита, «Примитивы» и диаграмма «Руководства» — уже настоящий SVG.
// См. FIGMA-BRIEF.md.
export default function Case01Page() {
  const lang = useLang();
  const t = C1[lang];
  return (
    <div className="flex w-full flex-col items-center">
      <SnapScrollController />
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка — адаптивная и занимает весь первый экран (min-h-screen),
          чтобы на первом экране показывался только этот блок, а не следующий
          Stats. Hero растёт РАВНОМЕРНО с шириной страницы (FullBleedScale
          mode="grow") — без обрезки: раньше mode="crop" на широких мониторах
          обрезал нижний ряд иконок, что выглядело как "растянуто". Белая
          часть ниже — normal flow, flex-1 дотягивает её (пустым полем) до
          низа экрана, если экран выше контента. Текст — отдельный
          непомасштабированный слой в центрированной 1440-сетке (как и
          остальная страница), а не прижат к краю окна. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] xl:min-h-screen">
        {/* ≥1440 — исходная обложка 1:1 из Figma (FullBleedScale-холст + текст поверх). */}
        <div className="relative hidden w-full xl:block">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
              <div className="absolute left-[571px] top-0 h-[580px] w-[1040px]">
                <img alt="" className="absolute inset-0 size-full object-cover" src="/cases/case-01/cover-page.png" />
              </div>
              <div
                className="absolute left-[492px] top-[-14px] h-[607px] w-[97px] blur-[2px]"
                style={{ background: "linear-gradient(to bottom, #111, #141414 50%, #3e3e3e)" }}
              />
              <div className="absolute left-0 top-[-19.52px] h-[612.525px] w-[1440px] overflow-clip bg-black">
                <div className="absolute left-[-637.85px] top-[-741.53px] size-[1370.111px]">
                  <div className="absolute inset-[-27.93%]">
                    <img alt="" className="block size-full max-w-none" src="/cases/case-01/ellipse-page.svg" />
                  </div>
                </div>
                <div className="absolute left-[866px] top-[36.62px] size-[539.287px]">
                  <div className="absolute left-[144.57px] top-[288.87px] size-[106.283px] rounded-[14.293px] bg-[#fc3f1d]" />
                  <div
                    className="absolute left-[8.27px] top-[8.27px] grid grid-cols-4 grid-rows-4"
                    style={{ gap: "54.24589157104492px" }}
                  >
                    {ICONS.map((icon) => (
                      <div key={icon} className="relative size-[90.126px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`/cases/case-01/${icon}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FullBleedScale>
          <HeroScrim color="#212121" />
          <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
            <p className="absolute bottom-[137px] left-[46px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              {lang === "en" ? <>From audit <br />to a unified style</> : <>От аудита <br />к единому стилю</>}
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              001
            </p>
          </div>
        </div>

        {/* <1440 — обложка по макету адаптива. ЗАХОД 1: точные значения 375
            (2559:10992). 834/1280 — заходы 2/3. */}
        <div className="w-full overflow-clip bg-[#fafafa] xl:hidden">
          {/* Тёмный hero-блок. 375 (2559:11304): h 356, сетка 248.76 в (180,20)
              — 4-я колонка за правым краем, градиент mix-blend-multiply,
              «001» вверху-слева / заголовок внизу-слева.
              ≥640 (макет 834, 2539:8972): h 834, сетка 563 по центру в top 66,
              «001» вверху / заголовок внизу (space-between, блок 573×696),
              градиента нет. */}
          <div className="relative h-[356px] w-full overflow-clip bg-[#121212] sm:h-[834px] lg:h-[828px]">
            {/* Сетка иконок. 375 (2559:11235): 248.76 в (180,20), pitch 66.6 /
                иконка 41.57 → gap 10.06%, иконка 96%.
                834 (2547:13830): 563×563, left calc(50%−6px), top 66. gap 10.06%,
                иконка 98%. 1280 (2532:5453): 714×714 @ (717,44), gap 7.14% (51/714),
                иконка 84.4% (119/141). 4-я колонка уходит за правый край.
                Оранжевая плитка под Thumbs Up (index 9). */}
            <div className="absolute left-[48%] top-[20px] aspect-square w-[66.34%] sm:left-[calc(50%-6px)] sm:top-[66px] sm:w-[563px] lg:left-[717px] lg:top-[44px] lg:w-[714px]">
              <div className="grid h-full grid-cols-4 grid-rows-4 gap-[10.06%] sm:gap-[10.06%] lg:gap-[7.14%]">
                {ICONS.map((icon, i) => (
                  <div
                    key={icon}
                    className={`relative flex items-center justify-center ${i === 9 ? "rounded-[6px] bg-[#fc3f1d] sm:rounded-none sm:bg-transparent" : ""}`}
                  >
                    {i === 9 && (
                      <span className="pointer-events-none absolute inset-[-9%] hidden rounded-[15px] bg-[#fc3f1d] sm:block lg:inset-0 lg:rounded-[19px]" />
                    )}
                    <img alt="" className="relative block w-[96%] max-w-none sm:w-[98%] lg:w-[84.4%]" src={`/cases/case-01/${icon}`} />
                  </div>
                ))}
              </div>
            </div>
            {/* Градиент transparent→#121212 сверху-вниз, mix-blend-multiply.
                375: rect (0,82 · 375×274) → top 23.03%. 834: rect (0,241 ·
                834×593) → top 28.9%. Затемняет низ блока под заголовком. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 top-[23.03%] mix-blend-multiply sm:top-[28.9%] lg:top-[29.5%]"
              style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-between px-[20px] pb-[44px] pt-[20px] sm:inset-auto sm:left-[40px] sm:top-[66px] sm:h-[696px] sm:w-[573px] sm:justify-between sm:gap-0 sm:p-0 lg:h-[683px]">
              <p className="font-heading text-[44px] font-bold uppercase leading-none text-white opacity-60 sm:text-[100px] sm:tracking-[5.25px] sm:opacity-30 lg:text-[152px] lg:opacity-60">
                001
              </p>
              <p className="w-[335px] whitespace-pre-wrap font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.6px] text-white sm:w-max sm:text-[52px] sm:tracking-[1.04px]">
                {lang === "en" ? <>FROM AUDIT <br />TO A UNIFIED STYLE</> : <>ОТ АУДИТА <br />К ЕДИНОМУ СТИЛЮ</>}
              </p>
            </div>
          </div>

          {/* «О проекте» (Figma 2559:10998). Блок «заголовок + абзац» —
              vertical AL gap 12; мета — отдельный сиблинг, gap 12 от блока.
              834: заголовок 32; абзац (w384) + мета в ряд. 1280: абзац w498. */}
          <div className="flex flex-col gap-[12px] px-[20px] py-[64px] sm:px-[28px] lg:px-[40px] lg:py-[56px]">
            <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.8px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px]">
              {t.aboutHeading}
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px]">
              <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[384px] lg:w-[498px]">
              {t.aboutIntro}
            </p>
              <div className="relative flex flex-wrap gap-x-[24px] gap-y-[16px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:flex-nowrap sm:gap-x-[40px]">
                {[
                  [t.metaRole, t.metaRoleValue],
                  [t.metaTeam, t.metaTeamValue],
                  [t.metaClient, t.metaClientValue],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-[4px]">
                    <p className="font-medium uppercase">{k}</p>
                    <p className="opacity-70">{v}</p>
                  </div>
                ))}
                {/* ДУДЛ — подчёркивание под метой (только ≥640). В макете
                    Vector 234257354 стоит ровно от левого края меты (x490 =
                    начало меты при justify-between) до ~4px за правым краем. */}
                <DrawIn
                  src="/cases/case-01/sections/reflow/cover-underline-834.svg"
                  className="pointer-events-none hidden sm:absolute sm:left-0 sm:top-[44px] sm:block sm:h-[11px] sm:w-[326px] lg:w-[320px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Белая часть под hero — только десктоп (абсолют 1440). */}
        <div className="hidden w-full max-w-[1440px] xl:relative xl:mx-auto xl:block xl:flex-1">
          <p className="font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212] xl:absolute xl:left-[46px] xl:top-[102px] xl:whitespace-nowrap">
            {t.aboutHeading}
          </p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 xl:absolute xl:left-[46px] xl:top-[149px] xl:w-[498px]">
              {t.aboutIntro}
            </p>
          <div className="xl:absolute xl:left-[896px] xl:top-[149px] xl:flex xl:gap-[70px]">
            <div className="flex w-[102px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
            </div>
            <div className="flex w-[98px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaTeam}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaTeamValue}</p>
            </div>
            <div className="flex w-[98px] flex-col gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
            </div>
          </div>
          <DrawIn
            src="/cases/case-01/underline.svg"
            delay={0.25}
            className="hidden xl:absolute xl:left-[930.5px] xl:top-[204.84px] xl:block xl:h-[13.646px] xl:w-[426.348px]"
          />
          <div className="xl:h-[318px]" aria-hidden />
        </div>
      </div>

      <Stats />
      <ProblemScreen />

      <Task />
      <AuditLibrary />
      <Primitives />

      {/* Pipeline — снова full-bleed (фон на весь экран, см. Pipeline.tsx),
          поэтому идёт ПРЯМЫМ ребёнком full-width root, не внутри 1440-
          обёртки — иначе его собственный w-full упёрся бы в 1440 и фон
          перестал бы тянуться на весь экран (та же причина, по которой
          Footer ниже тоже вынесен из обёртки). */}
      <Pipeline />

      <TeamGuide />
      <Guide />

      {/* Consistency — тоже full-bleed фон (см. Consistency.tsx), прямым
          ребёнком full-width root, как Pipeline/Footer выше. */}
      <Consistency />

      <Summary />

      <Footer />
    </div>
  );
}
