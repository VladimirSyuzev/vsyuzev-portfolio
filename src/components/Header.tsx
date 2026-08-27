import Image from "next/image";

// Header — 1:1 из Figma (get_design_context, node 2259:58486), фрейм
// 1440×62. Ссылки на #cases/#about/#contacts — добавлены поверх (в
// макете это просто текст, скролл-переход — наше дополнение).
export default function Header() {
  return (
    <div className="relative h-[62px] w-[1440px] overflow-clip bg-[#fafafa]">
      <a href="#top" className="absolute left-[44px] top-[21px] block h-[18.162px] w-[140px]">
        <Image src="/brand/wordmark.svg" alt="Вова Сюзёв" width={140} height={18.162} priority />
      </a>
      <a
        href="#cases"
        className="absolute left-[1066px] top-[22px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] hover:opacity-70"
      >
        КЕЙСЫ
      </a>
      <a
        href="#about"
        className="absolute left-[1211px] top-[22px] -translate-x-1/2 whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] hover:opacity-70"
      >
        О СЕБЕ
      </a>
      <a
        href="#contacts"
        className="absolute left-[1295px] top-[12px] flex items-center justify-center rounded-[10px] border border-[rgba(50,50,60,0.8)] px-[12px] py-[10px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] hover:bg-[#121212] hover:text-[#fafafa]"
      >
        КОНТАКТЫ
      </a>
      <div className="absolute left-0 top-[61px] h-px w-[1440px] bg-[#121212]" />
    </div>
  );
}
