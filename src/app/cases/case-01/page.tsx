import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
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
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
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

          {/* Заголовок обложки — центрированная 1440-сетка поверх hero.
              Основной заголовок закреплён от НИЗА hero (bottom-[137px]),
              а не от верха: в Figma при родной высоте 580px это то же самое
              (580-124.78-137≈318px сверху), но при выросшем (mode="grow")
              hero на широких экранах top-привязка держала бы текст у самого
              верха с растущим пустым полем снизу — bottom держит его ровно
              в 137px от низа hero независимо от ширины/высоты экрана. */}
          <div className="pointer-events-none absolute inset-0 mx-auto w-[1440px]">
            <p className="absolute bottom-[137px] left-[46px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              От аудита <br />к единому стилю
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              001
            </p>
          </div>
        </div>

        {/* Белая часть под hero — normal flow, свой отсчёт координат (top в
            Figma был от верха всего блока 898px = 580 hero + top ниже;
            здесь минус 580). flex-1 + min-h добивает до низа экрана пустым
            полем, если окно выше контента, чтобы Stats не показывался
            на первом экране. */}
        <div className="relative mx-auto w-[1440px] flex-1" style={{ minHeight: 318 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[149px] w-[498px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Аудит библиотеки из 226 иконок и выстраивание процесса, который <br />
            позволил масштабировать систему без потери консистентности.
          </p>

          <div className="absolute left-[896px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Арт-директор</p>
          </div>
          <div className="absolute left-[1066px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Команда</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">2 дизайнера</p>
          </div>
          <div className="absolute left-[1238.23px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
          </div>

          <div className="absolute left-[930.5px] top-[204.84px] h-[13.646px] w-[426.348px]">
            <img alt="" className="block size-full max-w-none" src="/cases/case-01/underline.svg" />
          </div>
        </div>
      </div>

      <Stats />
      <ProblemScreen />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Task />
        <AuditLibrary />
        <Primitives />
      </div>

      {/* Pipeline — снова full-bleed (фон на весь экран, см. Pipeline.tsx),
          поэтому идёт ПРЯМЫМ ребёнком full-width root, не внутри 1440-
          обёртки — иначе его собственный w-full упёрся бы в 1440 и фон
          перестал бы тянуться на весь экран (та же причина, по которой
          Footer ниже тоже вынесен из обёртки). */}
      <Pipeline />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <TeamGuide />
        <Guide />
        <Consistency />
        <Role />
        <Summary />
      </div>

      <Footer />
    </div>
  );
}
