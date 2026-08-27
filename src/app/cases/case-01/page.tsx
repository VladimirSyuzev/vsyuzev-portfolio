import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import Stats from "./sections/Stats";
import Problem from "./sections/Problem";
import Screen from "./sections/Screen";
import Task from "./sections/Task";
import AuditLibrary from "./sections/AuditLibrary";
import Primitives from "./sections/Primitives";
import Pipeline from "./sections/Pipeline";
import TeamGuide from "./sections/TeamGuide";
import Guide from "./sections/Guide";
import Consistency from "./sections/Consistency";
import Role from "./sections/Role";
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
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка — адаптивная: фон/фото/иконки-сетка растягиваются на всю
          ширину страницы РАВНОМЕРНО (FullBleedScale, без искажения формы,
          излишек высоты при масштабе >1 обрезается снизу). Текст — отдельный
          непомасштабированный слой в центрированной 1440-сетке (как и
          остальная страница), а не прижат к краю окна — иначе при ширине
          экрана > 1440 он "уползает" левее сетки остального контента. */}
      <div className="relative h-[898px] w-full overflow-clip bg-[#fafafa]">
        <FullBleedScale width={1440} height={580} className="absolute left-0 top-0">
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

        {/* Текст обложки — центрированная 1440-сетка, фиксированный размер/
            позиция внутри неё (не в FullBleedScale, не растягивается). */}
        <div className="relative mx-auto h-full w-[1440px]">
          <p className="absolute left-[46px] top-[318px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
            От аудита <br />к единому стилю
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            001
          </p>

          <p className="absolute left-[46px] top-[682px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[729px] w-[498px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Аудит библиотеки из 226 иконок и выстраивание процесса, который <br />
            позволил масштабировать систему без потери консистентности.
          </p>

          <div className="absolute left-[1066px] top-[729px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Арт-директор</p>
          </div>
          <div className="absolute left-[1181px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Команда</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">2 дизайнера</p>
          </div>
          <div className="absolute left-[1294px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
          </div>

          <div className="absolute left-[1063.96px] top-[785.62px] h-[13.646px] w-[332.08px]">
            <img alt="" className="block size-full max-w-none" src="/cases/case-01/underline.svg" />
          </div>
        </div>
      </div>

      <Stats />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Problem />
        <Screen />
        <Task />
        <AuditLibrary />
        <Primitives />
        <Pipeline />
        <TeamGuide />
        <Guide />
        <Consistency />
        <Role />
        <Summary />

        <Footer />
      </div>
    </div>
  );
}
