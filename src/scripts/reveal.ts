import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Divide un bloque de texto en líneas reales (según el ancho actual) para revelarlas. */
export function splitLines(el: HTMLElement): HTMLElement[] {
  const source = el.dataset.src ?? el.innerHTML;
  el.dataset.src = source;
  const tmp = document.createElement('div');
  tmp.innerHTML = source;
  // conservamos nodos simples (texto, <sup>) como "palabras"
  const tokens: string[] = [];
  tmp.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      (node.textContent ?? '').split(/(\s+)/).forEach((w) => { if (w.trim()) tokens.push(escapeHtml(w)); });
    } else if (node instanceof HTMLElement) {
      tokens.push(node.outerHTML);
    }
  });
  el.innerHTML = tokens.map((t) => `<span class="w">${t}</span>`).join(' ');
  const rows: string[][] = [];
  let top: number | null = null;
  el.querySelectorAll<HTMLElement>('.w').forEach((w) => {
    if (top === null || Math.abs(w.offsetTop - top) > 2) { rows.push([]); top = w.offsetTop; }
    rows[rows.length - 1].push(w.innerHTML);
  });
  el.innerHTML = rows.map((r) => `<span class="ln"><span class="li">${r.join(' ')}</span></span>`).join('');
  el.classList.add('is-split');
  return Array.from(el.querySelectorAll<HTMLElement>('.li'));
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);
}

export function initReveal(): void {
  // textos por líneas
  document.querySelectorAll<HTMLElement>('[data-lines]').forEach((el) => {
    const lines = splitLines(el);
    gsap.set(lines, { yPercent: 105 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(lines, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.075 }),
    });
  });

  // "Exposición": el velo papel se retira y la imagen se asienta
  const exposed = gsap.utils.toArray<HTMLElement>('[data-expose]');
  exposed.forEach((el) => gsap.set(el.querySelector('img'), { scale: 1.06 }));
  ScrollTrigger.batch(exposed, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el, i) => {
        const veil = el.querySelector('.veil');
        const img = el.querySelector('img');
        gsap.to(veil, { opacity: 0, duration: 1.25, ease: 'power2.out', delay: i * 0.09 });
        gsap.to(img, { scale: 1, duration: 2.1, ease: 'power3.out', delay: i * 0.09, clearProps: 'transform' });
      });
    },
  });
}
