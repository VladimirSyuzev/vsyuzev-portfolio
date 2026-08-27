// Footer — по макету: тёмный, соцсети/почта/телефон слева, локация и
// копирайт справа. Контакты — плейсхолдеры (не расшифрованы со скриншота
// мелким текстом, см. FIGMA-BRIEF.md TODO).
export default function Footer() {
  return (
    <footer id="contacts" className="scroll-mt-16 bg-foreground px-[var(--grid-margin)] py-10 text-background">
      <div className="grid-12 mx-auto">
        <div className="sm:col-span-4 sm:col-start-1">
          <a href="mailto:hello@vsyuzev.ru" className="text-label text-background/80 hover:text-background">
            hello@vsyuzev.ru
          </a>
        </div>
        <div className="text-label mt-4 text-background/60 sm:col-span-4 sm:col-start-9 sm:mt-0 sm:text-right">
          Ростов, Россия · © {new Date().getFullYear()} Владимир Сюзёв
        </div>
      </div>
    </footer>
  );
}
