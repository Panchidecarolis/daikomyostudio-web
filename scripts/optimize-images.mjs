/**
 * Genera las versiones web de las imágenes (AVIF + WebP, varios anchos)
 * a partir de los originales del estudio, y actualiza src/data/media.json.
 *
 * Los originales NO se versionan: se leen desde MEDIA_SRC (por defecto ../media-src).
 * Uso:  npm i -D sharp  &&  MEDIA_SRC=/ruta/a/originales npm run media
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(root, process.env.MEDIA_SRC ?? '../media-src');
const OUT = path.join(root, 'public', 'media');
const WIDTHS = [640, 1024, 1600, 2400];
const sources = JSON.parse(await fs.readFile(path.join(root, 'scripts', 'media-sources.json'), 'utf8'));
const only = process.argv.slice(2);

/** Recorta márgenes uniformes (blanco o negro) mirando filas/columnas completas. */
async function trimEdges(img, mode) {
  const { data, info } = await img.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const isEdge = mode === 'white' ? (v) => v >= 246 : (v) => v <= 10;
  const rowBlank = (y) => { for (let x = 0; x < w; x++) if (!isEdge(data[y * w + x])) return false; return true; };
  const colBlank = (x, t, b) => { for (let y = t; y <= b; y++) if (!isEdge(data[y * w + x])) return false; return true; };
  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  while (top < bottom && rowBlank(top)) top++;
  while (bottom > top && rowBlank(bottom)) bottom--;
  while (left < right && colBlank(left, top, bottom)) left++;
  while (right > left && colBlank(right, top, bottom)) right--;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

const manifest = {};
const prev = JSON.parse(await fs.readFile(path.join(root, 'src', 'data', 'media.json'), 'utf8').catch(() => '{}'));
await fs.mkdir(OUT, { recursive: true });

for (const [id, cfg] of Object.entries(sources)) {
  if (id.startsWith('_')) continue;
  if (only.length && !only.includes(id)) { if (prev[id]) manifest[id] = prev[id]; continue; }
  let img = sharp(path.join(SRC, cfg.file)).rotate();
  if (cfg.trim) {
    const box = await trimEdges(img, cfg.trim);
    img = sharp(await img.extract(box).toBuffer());
  }
  if (cfg.pad) {
    const m = await img.metadata();
    const p = Math.round(Math.max(m.width, m.height) * cfg.pad);
    img = sharp(await img.extend({ top: p, bottom: p, left: p, right: p, background: '#ffffff' }).toBuffer());
  }
  const meta = await img.metadata();
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, 2400));
  const uniq = [...new Set(widths)].sort((a, b) => a - b);
  for (const w of uniq) {
    const base = path.join(OUT, `${id}-${w}`);
    const r = img.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: cfg.kind === 'drawing' ? 60 : 52, effort: 2 }).toFile(`${base}.avif`);
    // WebP solo hasta 1600 px: es el formato de respaldo; AVIF cubre las pantallas grandes
    if (w <= 1600) await r.clone().webp({ quality: cfg.kind === 'drawing' ? 82 : 74 }).toFile(`${base}.webp`);
  }
  // color medio para el fondo de carga (evita el "salto" visual mientras llega la imagen)
  const { dominant } = await img.clone().resize(32).stats();
  manifest[id] = {
    w: meta.width, h: meta.height, kind: cfg.kind, widths: uniq,
    bg: `rgb(${dominant.r},${dominant.g},${dominant.b})`,
  };
  console.log(id, meta.width, 'x', meta.height, uniq.join(','));
}
await fs.writeFile(path.join(root, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2) + '\n');
