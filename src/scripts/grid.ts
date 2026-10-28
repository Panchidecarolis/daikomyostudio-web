import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { slotStyle } from '../lib/grid-pattern';

gsap.registerPlugin(Flip);

/**
 * Grilla de proyectos:
 * - con mouse o teclado, la obra señalada queda "expuesta" y recorre su secuencia de imágenes;
 * - los filtros por estado reordenan la grilla con continuidad (Flip).
 */
export function initGrid(motion: boolean): void {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.querySelectorAll<HTMLElement>('[data-grid]').forEach((grid) => {
    grid.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
      const seq = Array.from(card.querySelectorAll<HTMLElement>('[data-seq]'));
      const dots = Array.from(card.querySelectorAll<HTMLElement>('.seq-dots i'));
      let timer: number | undefined;
      let k = 0;

      const show = (i: number) => {
        k = i;
        dots.forEach((d, j) => d.classList.toggle('on', j === i));
        seq.forEach((s, j) => gsap.to(s, { opacity: j === i - 1 ? 1 : 0, duration: 0.8, ease: 'power1.inOut', overwrite: true }));
      };
      const on = () => {
        grid.classList.add('is-hovering');
        card.classList.add('is-on');
        if (!motion || seq.length === 0) return;
        window.clearInterval(timer);
        timer = window.setInterval(() => show((k + 1) % (seq.length + 1)), 1150);
      };
      const off = () => {
        card.classList.remove('is-on');
        if (!grid.querySelector('.card.is-on')) grid.classList.remove('is-hovering');
        window.clearInterval(timer);
        if (k !== 0) show(0);
      };

      if (finePointer) {
        card.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') on(); });
        card.addEventListener('pointerleave', off);
      }
      card.addEventListener('focusin', () => { if (card.matches(':focus-within')) on(); });
      card.addEventListener('focusout', off);
    });
  });

  // filtros
  const filters = document.querySelector<HTMLElement>('[data-filters]');
  const grid = document.querySelector<HTMLElement>('#all-projects');
  if (!filters || !grid) return;
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card]'));

  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    const value = btn.dataset.filter;
    filters.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const state = motion ? Flip.getState(cards) : null;
    let n = 0;
    cards.forEach((c) => {
      const visible = value === 'all' || c.dataset.status === value;
      c.hidden = !visible;
      if (visible) c.setAttribute('style', slotStyle(n++));
    });
    if (state) {
      Flip.from(state, {
        duration: 0.9,
        ease: 'expo.inOut',
        absolute: true,
        nested: true,
        stagger: 0.02,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.25, ease: 'expo.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.97, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      ScrollTrigger.refresh();
    }
  });
}
