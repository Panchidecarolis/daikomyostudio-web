import { ScrollTrigger } from 'gsap/ScrollTrigger';

const KEY = 'dk-lang-jump';

/**
 * Al cambiar de idioma se conserva la posición de lectura: guardamos la proporción
 * recorrida de la página y la restauramos en la página equivalente.
 */
export function initLangMemory(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
    a.addEventListener('click', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      try {
        sessionStorage.setItem(KEY, JSON.stringify({ to: new URL(a.href).pathname, ratio }));
      } catch { /* almacenamiento no disponible: se abre arriba */ }
    });
  });

  let saved: { to: string; ratio: number } | null = null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) { saved = JSON.parse(raw); sessionStorage.removeItem(KEY); }
  } catch { saved = null; }
  if (!saved || saved.to !== window.location.pathname || saved.ratio <= 0) return;

  const ratio = saved.ratio;
  const restore = () => {
    ScrollTrigger.refresh();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.round(ratio * max), behavior: 'instant' as ScrollBehavior });
  };
  if (document.readyState === 'complete') requestAnimationFrame(restore);
  else window.addEventListener('load', () => requestAnimationFrame(restore), { once: true });
}
