import media from '../data/media.json';

export interface MediaItem {
  w: number;
  h: number;
  kind: 'photo' | 'render' | 'drawing';
  widths: number[];
  bg: string;
}

const items = media as Record<string, MediaItem>;
const WEBP_MAX = 1600;

export function getMedia(id: string): MediaItem {
  const item = items[id];
  if (!item) throw new Error(`[media] Imagen inexistente: "${id}". Revisá scripts/media-sources.json y src/data/media.json.`);
  return item;
}

export function srcset(id: string, format: 'avif' | 'webp'): string {
  const { widths } = getMedia(id);
  return widths
    .filter((w) => format === 'avif' || w <= WEBP_MAX)
    .map((w) => `/media/${id}-${w}.${format} ${w}w`)
    .join(', ');
}

/** Imagen de respaldo (<img src>): WebP de ~1024 px. */
export function fallbackSrc(id: string): string {
  const { widths } = getMedia(id);
  const webp = widths.filter((w) => w <= WEBP_MAX);
  const w = webp.find((x) => x >= 1024) ?? webp[webp.length - 1];
  return `/media/${id}-${w}.webp`;
}

export function ratio(id: string): string {
  const { w, h } = getMedia(id);
  return `${w} / ${h}`;
}
