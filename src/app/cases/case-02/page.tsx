import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Кейс 002 — обложка + «О проекте» собраны кодом 1:1 из Figma
// (get_design_context, node 2009:12053). Разделы ниже — единый скриншот
// тела страницы (body.png) до перевода в код, см. FIGMA-BRIEF.md.
export default function Case02Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
      <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
        <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
          <div className="absolute left-0 top-[-221px] h-[1095.464px] w-[1642.995px]">
            <img alt="" className="absolute inset-0 size-full object-cover" src="/cases/case-02/mockup.png" />
          </div>
          <p className="absolute left-[46px] top-[318px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold leading-[1.2] tracking-[1.04px] text-white">
            ИКОНКИ <br />
            YANDEX CLOUD
          </p>
          <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
            002
          </p>
        </div>

        <p className="absolute left-[46px] top-[682px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
          О ПРОЕКТЕ
        </p>
        <p className="absolute left-[46px] top-[729px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели нашей
          команде предстояло разработать 34 иконки в двух размерах, параллельно с формированием
          нового стиля.
        </p>

        <div className="absolute left-[1066px] top-[729px] flex w-[102px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Арт-директор</p>
        </div>
        <div className="absolute left-[1179px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Команда</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">1 дизайнер</p>
        </div>
        <div className="absolute left-[1307px] top-[729px] flex w-[98px] flex-col items-start gap-[4px]">
          <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
          <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
        </div>

        <div className="absolute left-[1058.4px] top-[783.02px] h-[16.356px] w-[339.198px]">
          <img alt="" className="block size-full max-w-none" src="/cases/case-02/underline.svg" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-02/body.png"
        alt="Разделы кейса «Иконки Yandex Cloud»"
        width={1440}
        height={7175}
        className="block w-[1440px]"
      />

      </div>

      <Footer />
    </div>
  );
}
