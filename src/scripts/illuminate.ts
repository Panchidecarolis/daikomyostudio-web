import { gsap } from 'gsap';

/** El manifiesto se "ilumina" palabra por palabra al ritmo de la lectura. */
export function initIlluminate(): void {
  document.querySelectorAll<HTMLElement>('[data-illuminate]').forEach((el) => {
    el.querySelectorAll('p').forEach((p) => {
      const words = (p.textContent ?? '').trim().split(/\s+/);
      p.innerHTML = words.map((w) => `<span class="w">${w.replace(/</g, '&lt;')}</span>`).join(' ');
    });
    gsap.fromTo(
      el.querySelectorAll('.w'),
      { opacity: 0.16 },
      { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: 0.5 } },
    );
  });
}
