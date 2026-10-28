import type { Lang } from './ui';

/** Rutas localizadas de las páginas fijas. */
export const routes = {
  home: { es: '/es/', en: '/en/' },
  projects: { es: '/es/proyectos/', en: '/en/projects/' },
  studio: { es: '/es/estudio/', en: '/en/studio/' },
  contact: { es: '/es/contacto/', en: '/en/contact/' },
} as const;

export type PageKey = keyof typeof routes;

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

export function projectUrl(lang: Lang, slug: Record<Lang, string>): string {
  return `${routes.projects[lang]}${slug[lang]}/`;
}

/** Pares de URLs equivalentes en ambos idiomas (para hreflang y el selector ES/EN). */
export type Alternates = Record<Lang, string>;

export function pageAlternates(key: PageKey): Alternates {
  return { es: routes[key].es, en: routes[key].en };
}
