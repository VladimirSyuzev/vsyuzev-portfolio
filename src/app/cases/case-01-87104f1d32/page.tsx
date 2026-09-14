import CaseOnePage from "../case-01/CaseOnePage";

// Полная версия кейса-01 под NDA — секретный незалинкованный URL. Нигде на
// сайте на него нет ссылок (не в cases-data.ts, не в навигации), отправляется
// лично. Показывает весь кейс как раньше: обложка без затемнения, «О
// проекте» — полный текст, ниже все разделы 01–07 и Footer.
export default function Page() {
  return <CaseOnePage full />;
}
