import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";

// Header — нативно флюидный (см. Header.tsx, шрифт фиксирован). Hero =
// ART (скролл-зум коллажа на всю ширину, framer-motion) + REGAL (строка
// «art-director & …»). About/Кейсы на фиксированном canvas 1440px. Footer
// — фон на всю ширину страницы, контент по центру на 1440px.
export default function Home() {
  return (
    <div className="flex flex-col items-center" id="top">
      <Header />
      {/* Header теперь fixed (auto-hide) — не занимает место в потоке,
          спейсер ниже возвращает те же 62px, что и раньше. */}
      <div className="h-[62px] w-full shrink-0" />
      <Hero />
      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <About />
        <CasesList />
      </div>
      <Footer />
    </div>
  );
}
