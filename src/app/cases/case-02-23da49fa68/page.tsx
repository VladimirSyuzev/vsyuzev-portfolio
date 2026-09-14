import CaseBody from "../case-02/sections/CaseBody";
import Summary from "../case-02/sections/Summary";

// Полная версия кейса-02 под NDA — секретный незалинкованный URL (по
// образцу case-01-87104f1d32). Нигде на сайте на него нет ссылок, отправляется
// лично. Показывает весь кейс как раньше: заголовок и обложка без изменений,
// «О проекте» — полный текст, ниже все разделы и Footer.
export default function Page() {
  return <CaseBody full summarySlot={<Summary />} />;
}
