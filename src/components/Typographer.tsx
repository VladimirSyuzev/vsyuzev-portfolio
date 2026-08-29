"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { typo } from "@/lib/typo";

// Глобальная типографика: после гидрации проходит по всем текстовым узлам
// страницы и приклаивает висячие предлоги/союзы/частицы/короткие местоимения
// к следующему слову неразрывным пробелом (см. lib/typo.ts). Правит текст
// напрямую в DOM (nodeValue), не трогая разметку и анимации.
//
// - Работает в useEffect (после гидрации) → без hydration-mismatch.
// - MutationObserver повторяет обработку для узлов, которые React
//   перерисовал (например, карточки трека в Pipeline после ResizeObserver).
// - Идемпотентно: typo() второй раз ничего не меняет, поэтому повторная
//   обработка не создаёт мутаций и не зацикливает observer.
// - Чтобы отключить обработку в поддереве — data-no-typo на элементе.

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

function processNode(node: Text) {
  const value = node.nodeValue;
  if (!value || value.length < 3 || value.indexOf(" ") === -1) return;
  const parent = node.parentElement;
  if (!parent) return;
  if (SKIP_TAGS.has(parent.tagName)) return;
  if (parent.closest("[data-no-typo]")) return;
  const next = typo(value);
  if (next !== value) node.nodeValue = next;
}

function processTree(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const batch: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) batch.push(n as Text);
  batch.forEach(processNode);
}

export default function Typographer() {
  const pathname = usePathname();

  useEffect(() => {
    processTree(document.body);

    let queued = false;
    const pending = new Set<Node>();
    const flush = () => {
      queued = false;
      const roots = [...pending];
      pending.clear();
      for (const r of roots) {
        if (r.nodeType === Node.TEXT_NODE) processNode(r as Text);
        else if (r.isConnected) processTree(r);
      }
    };

    const observer = new MutationObserver((records) => {
      for (const rec of records) {
        if (rec.type === "characterData") pending.add(rec.target);
        else rec.addedNodes.forEach((n) => pending.add(n));
      }
      if (pending.size && !queued) {
        queued = true;
        requestAnimationFrame(flush);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
