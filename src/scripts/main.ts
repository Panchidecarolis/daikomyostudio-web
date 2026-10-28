/**
 * Punto de entrada de la interacción del sitio.
 * Todo el contenido es visible sin JavaScript; los módulos solo agregan movimiento.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initNav } from './nav';
import { initLangMemory } from './lang';
import { initReveal } from './reveal';
import { initHero } from './hero';
import { initGrid } from './grid';
import { initNarrative } from './narrative';
import { initIlluminate } from './illuminate';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const root = document.documentElement;
const w = window as unknown as { __motionGuard?: number };
if (w.__motionGuard) clearTimeout(w.__motionGuard);
const motion = root.classList.contains('motion');

initNav(motion);
initGrid(motion);

if (motion) {
  try {
    initReveal();
    initHero();
    initNarrative();
    initIlluminate();
  } catch (err) {
    // Si algo falla, el sitio vuelve a su versión estática y legible.
    console.error(err);
    root.classList.remove('motion');
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.set('[data-expose] .veil, [data-lines] .li', { clearProps: 'all' });
  }
}

initLangMemory();
window.addEventListener('load', () => ScrollTrigger.refresh());
