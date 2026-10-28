/**
 * Visor de imágenes a pantalla completa (ver src/components/Lightbox.astro).
 * - Clic en un ítem de un grupo [data-lightbox] abre el visor en esa imagen.
 * - Flechas laterales, teclado (←/→, Esc), deslizamiento horizontal en pantallas táctiles.
 * - Clic fuera de la imagen o en la X cierra; se devuelve el foco y se conserva el scroll.
 * - <dialog> modal: el resto de la página queda inerte, el foco permanece dentro del visor.
 * - Respeta prefers-reduced-motion (sin fundidos).
 */
export function initLightbox(): void {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lb]');
  const groups = document.querySelectorAll<HTMLElement>('[data-lightbox]');
  if (!dlg || !groups.length || typeof dlg.showModal !== 'function') return;

  const fig = dlg.querySelector<HTMLElement>('[data-lb-fig]')!;
  const stage = dlg.querySelector<HTMLElement>('[data-lb-stage]')!;
  const count = dlg.querySelector<HTMLElement>('[data-lb-count]')!;
  const btnPrev = dlg.querySelector<HTMLButtonElement>('[data-lb-prev]')!;
  const btnNext = dlg.querySelector<HTMLButtonElement>('[data-lb-next]')!;
  const btnClose = dlg.querySelector<HTMLButtonElement>('[data-lb-close]')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let items: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;
  let scrollY = 0;
  const pad = (n: number) => String(n).padStart(2, '0');

  /** Construye la imagen ampliada a partir del <picture> del ítem (mismas fuentes, sizes=100vw). */
  function build(item: HTMLElement): HTMLElement {
    const pic = item.querySelector('picture');
    const img = item.querySelector('img');
    const out = document.createElement('picture');
    pic?.querySelectorAll('source').forEach((s) => {
      const c = document.createElement('source');
      c.type = s.type;
      c.srcset = s.srcset;
      c.sizes = '100vw';
      out.appendChild(c);
    });
    const big = document.createElement('img');
    big.alt = img?.alt ?? '';
    big.decoding = 'async';
    if (img) {
      big.src = img.currentSrc || img.src;
      // tamaño intrínseco = la mayor versión disponible, con la proporción original
      const widths = Array.from(pic?.querySelectorAll('source') ?? []).flatMap((s) =>
        s.srcset.split(',').map((c) => parseInt(c.trim().split(/\s+/)[1] ?? '0', 10) || 0),
      );
      const ratio = (img.naturalHeight || Number(img.getAttribute('height')) || 1) / (img.naturalWidth || Number(img.getAttribute('width')) || 1);
      const w = Math.max(img.naturalWidth || 0, ...widths);
      big.width = w;
      big.height = Math.round(w * ratio);
    }
    out.appendChild(big);
    return out;
  }

  function show(i: number, dir = 0): void {
    index = (i + items.length) % items.length;
    const next = build(items[index]);
    const prev = fig.firstElementChild as HTMLElement | null;
    const swap = () => {
      fig.replaceChildren(next);
      fig.dataset.dir = String(dir);
      requestAnimationFrame(() => fig.classList.add('is-in'));
    };
    count.textContent = `${pad(index + 1)} / ${pad(items.length)}`;
    const single = items.length < 2;
    btnPrev.hidden = single;
    btnNext.hidden = single;
    if (prev && !reduce.matches) {
      fig.classList.remove('is-in');
      window.setTimeout(swap, 180);
    } else {
      fig.classList.remove('is-in');
      swap();
    }
    // precarga de las vecinas
    [index + 1, index - 1].forEach((k) => {
      const it = items[(k + items.length) % items.length];
      const src = it?.querySelector('img');
      if (src && !src.complete) src.loading = 'eager';
    });
  }

  function open(group: HTMLElement, item: HTMLElement): void {
    items = Array.from(group.querySelectorAll<HTMLElement>('[data-lightbox-item]'));
    opener = item;
    scrollY = window.scrollY;
    document.documentElement.classList.add('lb-open');
    dlg!.showModal();
    show(items.indexOf(item));
    btnClose.focus({ preventScroll: true });
  }

  function close(): void {
    if (!dlg!.open) return;
    const finish = () => {
      dlg!.close();
      dlg!.classList.remove('is-closing');
      fig.replaceChildren();
      document.documentElement.classList.remove('lb-open');
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
      opener?.focus({ preventScroll: true });
    };
    if (reduce.matches) finish();
    else {
      dlg!.classList.add('is-closing');
      window.setTimeout(finish, 220);
    }
  }

  groups.forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-lightbox-item]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        open(group, item);
      });
    });
  });

  btnPrev.addEventListener('click', () => show(index - 1, -1));
  btnNext.addEventListener('click', () => show(index + 1, 1));
  btnClose.addEventListener('click', close);

  // Esc: el <dialog> dispara "cancel"; lo interceptamos para cerrar con la misma transición
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1, -1); }
  });

  // clic fuera de la imagen (fondo) cierra
  dlg.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.lb-btn') || target.tagName === 'IMG') return;
    if (moved) return;
    close();
  });

  // deslizamiento horizontal (táctil y lápiz)
  let x0 = 0;
  let y0 = 0;
  let tracking = false;
  let moved = false;
  stage.addEventListener('pointerdown', (e) => {
    moved = false;
    if (e.pointerType === 'mouse') return;
    tracking = true;
    x0 = e.clientX;
    y0 = e.clientY;
  });
  stage.addEventListener('pointermove', (e) => {
    if (!tracking) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 8) moved = true;
    if (!reduce.matches) fig.style.transform = `translateX(${dx * 0.35}px)`;
  });
  const end = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    fig.style.transform = '';
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
}
