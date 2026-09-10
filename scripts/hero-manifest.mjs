// Пересобирает манифест картинок Hero: сканирует public/hero-parallax/,
// генерит недостающие webp-превью, пишет src/data/hero-images.json
// (имя, пути, соотношение сторон). Запускать после добавления/удаления
// картинок:  node scripts/hero-manifest.mjs
import sharp from "sharp";
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

const SRC = "public/hero-parallax";
const THUMB = path.join(SRC, "thumb");
if (!existsSync(THUMB)) mkdirSync(THUMB, { recursive: true });

const files = readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort((a, b) => {
    const na = parseInt(a) || 0, nb = parseInt(b) || 0;
    return na - nb || a.localeCompare(b);
  });

const out = [];
for (const f of files) {
  const base = f.replace(/\.[^.]+$/, "");
  const ext = f.split(".").pop().toLowerCase();
  const thumb = path.join(THUMB, base + ".webp");
  if (!existsSync(thumb) || statSync(thumb).mtimeMs < statSync(path.join(SRC, f)).mtimeMs) {
    await sharp(path.join(SRC, f))
      .resize(760, 760, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(thumb);
    console.log("thumb:", base + ".webp");
  }
  const meta = await sharp(path.join(SRC, f)).metadata();
  out.push({
    name: base,
    full: `/hero-parallax/${f}`,
    tile: `/hero-parallax/thumb/${base}.webp`,
    aspect: +(meta.width / meta.height).toFixed(4),
  });
}

writeFileSync("src/data/hero-images.json", JSON.stringify(out, null, 2) + "\n");
console.log(`\nhero-images.json — ${out.length} шт.`);
