import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll narrativo de los proyectos (aprobado en el laboratorio):
 * expansión de escala, umbral, interior/exterior, galería horizontal y parallax sutil.
 * Las fijaciones (pin) solo acompañan el scroll; nunca lo bloquean ni lo fuerzan a encajar.
 */
export function initNarrative(): void {
  const mm = gsap.matchMedia();

  mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (ctx) => {
    const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean };

    // Los bloques se recorren en el orden del documento: así cada sección fijada
    // calcula su posición teniendo en cuenta el espacio que agregan las anteriores.
    document.querySelectorAll<HTMLElement>('[data-block]').forEach((el) => {
      const type = el.dataset.block;
      const ph = el.querySelector<HTMLElement>('.ph');
      const img = el.querySelector('img');

      // 1 · expansión: de lámina enmarcada a pantalla completa
      if (type === 'expand' && ph && img) {
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', pin: true, scrub: 0.8 } })
          .fromTo(ph, { clipPath: desktop ? 'inset(14% 22% 14% 22%)' : 'inset(10% 8% 10% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
          .fromTo(img, { scale: 1.28 }, { scale: 1, ease: 'none' }, 0);
      }

      // 2 · umbral: la imagen se abre desde una rendija
      if (type === 'slit' && ph && img) {
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', pin: true, scrub: 0.8 } })
          .fromTo(ph, { clipPath: 'inset(0% 46% 0% 46%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out' }, 0)
          .fromTo(img, { scale: 1.22 }, { scale: 1, ease: 'none' }, 0);
      }

      // 3 · exterior / interior separados por un horizonte que sube
      if (type === 'split') {
        const lblOut = el.querySelector('.lbl-out');
        const lblIn = el.querySelector('.lbl-in');
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=120%', pin: true, scrub: 0.8 } })
          .fromTo(el, { '--p': 100 }, { '--p': 0, ease: 'none', duration: 1 }, 0)
          .fromTo(lblIn, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.05)
          .to(lblOut, { opacity: 0, duration: 0.12 }, 0.8);
      }

      // 4 · galería horizontal: fijada en desktop, deslizable con el dedo en mobile
      if (type === 'horizontal') {
        const track = el.querySelector<HTMLElement>('[data-track]');
        const counter = el.querySelector<HTMLElement>('[data-counter]');
        if (!track) return;
        const figs = Array.from(track.querySelectorAll<HTMLElement>('figure'));
        const setCount = (i: number) => { if (counter) counter.textContent = `${i} / ${figs.length}`; };
        if (desktop) {
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: el, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
              onUpdate: (s) => setCount(Math.min(figs.length, Math.round(s.progress * (figs.length - 1)) + 1)),
            },
          });
        } else {
          track.addEventListener('scroll', () => {
            const step = figs[0]?.offsetWidth || 1;
            setCount(Math.min(figs.length, Math.round(track.scrollLeft / step) + 1));
          }, { passive: true });
        }
      }
    });

    // parallax muy sutil en la portada del proyecto
    const heroImg = document.querySelector<HTMLElement>('[data-hero-project] img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: desktop ? 7 : 4,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero-project]', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  });

  // barra de progreso de lectura en la cabecera
  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  if (bar && document.body.hasAttribute('data-progress')) {
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }) });
  }
}
