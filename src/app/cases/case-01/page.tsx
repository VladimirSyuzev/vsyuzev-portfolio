import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

// Кейс 001 — обложка + «О проекте» собраны кодом 1:1 из Figma
// (get_design_context, node 1961:28419). Разделы 01/02/03… ниже —
// временно как единый скриншот тела страницы (body.png) до перевода в
// код, см. FIGMA-BRIEF.md "Недостающее".
export default function Case01Page() {
  return (
    <div className="mx-auto flex w-[1440px] flex-col items-start">
      <Header />

      <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
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
          <p className="absolute left-[46px] top-[318px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
            От аудита <br />к единому стилю
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            001
          </p>
        </div>

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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/body.png"
        alt="Разделы 01–06 кейса «От аудита к единому стилю»"
        width={1440}
        height={11060}
        className="block w-[1440px]"
      />

      <Footer />
    </div>
  );
}
