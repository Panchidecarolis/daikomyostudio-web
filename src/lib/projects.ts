import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeatured(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.data.featured !== undefined).sort((a, b) => (a.data.featured ?? 0) - (b.data.featured ?? 0));
}

export function altFor(p: Project, id: string, lang: Lang): string {
  return p.data.alt[id]?.[lang] ?? p.data.title[lang];
}

/** Primer año del rango ("2024–2025" → "2024") para listados compactos. */
export function shortYear(year: string): string {
  return year.slice(0, 4);
}

/** Texto para meta description: primer párrafo recortado a ~155 caracteres. */
export function excerpt(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)) + '…';
}

export { GRID_PATTERN } from './grid-pattern';
