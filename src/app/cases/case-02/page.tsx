import CaseBody from "./sections/CaseBody";

// Публичная (короткая) версия кейса 002 под NDA — Summary (раздел «06 Итог»)
// здесь не нужен, поэтому summarySlot не передаём (async server component
// с чтением SVG с диска не выполняется зря). См. CaseBody.tsx.
export default function Case02Page() {
  return <CaseBody summarySlot={null} />;
}
