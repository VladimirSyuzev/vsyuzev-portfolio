"use client";

import { useEffect, useState } from "react";
import SummaryView from "./SummaryView";

// 06 Итог — стена из 34/36 плиток иконок (инлайн-SVG, чтобы GSAP мог
// анимировать каждую по отдельности). SVG подтягиваются с /public на клиенте
// (статик-экспорт отдаёт их как обычные файлы), пока не загрузились — стена
// пустая, а секция ниже первого экрана.
const BASE = "/cases/case-02/sections";

export default function Summary() {
  const [wall, setWall] = useState<{ full: string; small: string }>({ full: "", small: "" });

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`${BASE}/summary-icons.svg`).then((r) => r.text()),
      fetch(`${BASE}/summary-icons-375.svg`).then((r) => r.text()),
    ])
      .then(([full, small]) => {
        if (alive) setWall({ full, small });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return <SummaryView iconWall={wall.full} iconWall375={wall.small} />;
}
