import { gsap } from 'gsap';

/** Cabecera que se retira al bajar y vuelve al subir; menú a pantalla completa en mobile. */
export function initNav(motion: boolean): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  let lastY = window.scrollY;
  let menuOpen = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!header || menuOpen) return;
      const y = window.scrollY;
      if (y > 80 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y <= 80) header.classList.remove('is-hidden');
      lastY = y;
    },
    { passive: true },
  );
  // al recibir foco por teclado, la cabecera siempre vuelve a verse
  header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  if (!menu || !openBtn || !closeBtn) return;
  const links = () => Array.from(menu.querySelectorAll<HTMLElement>('a, button'));

  const open = () => {
    menuOpen = true;
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    if (motion) {
      gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' });
      gsap.fromTo(menu.querySelectorAll('.menu-links span'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 0.4 });
    }
    closeBtn.focus();
  };
  const close = (returnFocus = true) => {
    const done = () => {
      menu.hidden = true;
      menuOpen = false;
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (returnFocus) openBtn.focus();
    };
    if (motion) gsap.to(menu, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: done });
    else done();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => close());
  document.addEventListener('keydown', (e) => {
    if (!menuOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = links();
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches && menuOpen) close(false); });
}
