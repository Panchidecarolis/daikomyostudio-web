/**
 * Patrón editorial de la grilla de proyectos (se repite cada 8 obras).
 * s/e: columnas desktop (de 12) · r: proporción · al: alineación vertical
 * ms/me: columnas mobile (de 6) · mr: proporción mobile
 * Se usa en el servidor (ProjectGrid.astro) y en el navegador (filtros).
 */
export const GRID_PATTERN = [
  { s: 1, e: 8, r: '4 / 3', al: 'start', ms: 1, me: 7, mr: '4 / 5' },
  { s: 9, e: 13, r: '4 / 5', al: 'end', ms: 2, me: 7, mr: '1 / 1' },
  { s: 2, e: 6, r: '1 / 1', al: 'start', ms: 1, me: 6, mr: '4 / 3' },
  { s: 7, e: 13, r: '16 / 10', al: 'start', ms: 1, me: 7, mr: '4 / 5' },
  { s: 1, e: 5, r: '4 / 5', al: 'start', ms: 2, me: 7, mr: '1 / 1' },
  { s: 6, e: 13, r: '16 / 9', al: 'end', ms: 1, me: 7, mr: '4 / 3' },
  { s: 3, e: 8, r: '5 / 4', al: 'start', ms: 1, me: 6, mr: '4 / 5' },
  { s: 9, e: 13, r: '1 / 1', al: 'end', ms: 2, me: 7, mr: '1 / 1' },
] as const;

export type GridSlot = (typeof GRID_PATTERN)[number];

export function slotStyle(i: number): string {
  const p = GRID_PATTERN[i % GRID_PATTERN.length];
  return `--s:${p.s};--e:${p.e};--r:${p.r};--al:${p.al};--ms:${p.ms};--me:${p.me};--mr:${p.mr}`;
}
