import { gsap } from 'gsap';

/**
 * Portada: una línea de horizonte se dibuja y la obra se abre desde ella.
 * Al bajar, la lámina enmarcada se expande hasta el ancho completo.
 */
export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const plate = hero.querySelector<HTMLElement>('[data-hero-plate]');
  const line = hero.querySelector<HTMLElement>('[data-hero-horizon]');
  const img = plate?.querySelector('img');
  if (!plate || !line || !img) return;
  const caps = hero.querySelectorAll('.hero-cap .mask > *');

  // márgenes laterales reales (la línea empieza con scaleX 0, por eso medimos la banda inferior)
  const band = hero.querySelector<HTMLElement>('.hero-cap') ?? hero;
  const gutters = () => {
    const r = band.getBoundingClientRect();
    return { l: Math.round(r.left), r: Math.round(document.documentElement.clientWidth - r.right) };
  };
  const { l, r } = gutters();

  const intro = gsap.timeline({ delay: 0.15, defaults: { overwrite: 'auto' } });
  intro
    .to(line, { scaleX: 1, duration: 1, ease: 'expo.inOut' }, 0)
    .fromTo(plate, { clipPath: `inset(50% ${r}px 50% ${l}px)` }, { clipPath: `inset(0% ${r}px 0% ${l}px)`, duration: 1.5, ease: 'expo.inOut' }, 0.8)
    .fromTo(img, { scale: 1.2 }, { scale: 1, duration: 2.4, ease: 'power3.out' }, 0.8)
    .to(line, { opacity: 0, duration: 0.5 }, 1.5)
    .fromTo(caps, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 1.6)
    .add(() => {
      hero.classList.add('is-in');
      gsap.set(caps, { clearProps: 'transform' });
      expandOnScroll();
    });

  function expandOnScroll() {
    gsap.fromTo(
      plate!,
      { clipPath: () => { const g = gutters(); return `inset(0% ${g.r}px 0% ${g.l}px)`; } },
      {
        clipPath: 'inset(0% 0px 0% 0px)',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 35%', scrub: 0.6, invalidateOnRefresh: true },
      },
    );
    gsap.to(img!, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }
}
