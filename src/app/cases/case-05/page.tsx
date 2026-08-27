import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Кейс 005 — обложка + «О проекте» собраны кодом 1:1 из Figma
// (get_design_context, node 2210:74401). Разделы ниже — единый скриншот
// тела страницы (body.png) до перевода в код, см. FIGMA-BRIEF.md.
export default function Case05Page() {
  return (
    <div className="mx-auto flex w-[1440px] flex-col items-start">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
        <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
          <div className="absolute left-[72px] top-0 h-[580px] w-[1368px]">
            <img alt="" className="absolute inset-0 size-full object-cover" src="/cases/case-05/cover.png" />
          </div>
          <div
            className="absolute left-[-104px] top-[-48px] h-[677px] w-[357px] blur-[50px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(64,1,2) 7%, rgb(107,2,0) 34%, rgb(116,2,2) 62%, rgb(160,1,0) 81%, rgb(142,2,1) 92%)",
            }}
          />
          <div className="absolute left-[-1104px] top-[-535px] flex h-[2003.777px] w-[2207.226px] items-center justify-center mix-blend-multiply">
            <div className="rotate-[-51.23deg]">
              <div className="relative h-[2160.327px] w-[835px]">
                <div className="absolute inset-[-9.26%_-23.95%]">
                  <img alt="" className="block size-full max-w-none" src="/cases/case-05/ellipse.svg" />
                </div>
              </div>
            </div>
          </div>
          <p className="absolute left-[46px] top-[318px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-semibold uppercase leading-[1.2] tracking-[1.04px] text-white">
            Карты <br />
            для пэтролхэдов
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            005
          </p>
        </div>

        <p className="absolute left-[46px] top-[682px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
          О ПРОЕКТЕ
        </p>
        <div className="absolute left-[46px] top-[729px] flex w-[668px] flex-col text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p>
            В рамках коллаборации Авто.ру и Т-Банка была создана серия лимитированных банковских
            карт, посвященных культовым автомобилям, оставившим заметный след в автомобильной
            культуре.
          </p>
          <p>
            Для проекта были приглашены четыре иллюстратора, каждому из которых предстояло
            переосмыслить один из легендарных автомобилей через собственный визуальный язык.
          </p>
        </div>

        <div className="absolute left-[1066px] top-[729px] flex w-[102px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Иллюстратор</p>
        </div>
        <div className="absolute left-[1179px] top-[729px] flex w-[123px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Авто.ру и Т-Банк</p>
        </div>

        <div className="absolute left-[1044.7px] top-[785.57px] h-[16.856px] w-[268.594px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-05/underline.svg" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-05/body.png"
        alt="Разделы кейса «Карты для пэтролхэдов»"
        width={1440}
        height={6339}
        className="block w-[1440px]"
      />

      <Footer />
    </div>
  );
}
