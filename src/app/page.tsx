import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";

// Header — нативно флюидный, прозрачный поверх тёмного Hero у самого верха
// главной. Hero = FLOATING (имя + плавающие работы, во всю высоту экрана) +
// REGAL. Спейсер под шапку тут НЕ нужен — Hero начинается от y0, шапка
// наезжает поверх. About/CasesList/Footer центрируются на 1440 при ≥1200,
// ниже — колоночная сетка (см. RESPONSIVE.md).
export default function Home() {
  return (
    <div className="flex w-full flex-col items-center" id="top">
      <Header />
      <Hero />
      <About />
      <CasesList />
      <Footer />
    </div>
  );
}
