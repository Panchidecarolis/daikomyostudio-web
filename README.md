# DAIKOMYOESTUDIO — sitio web

Sitio oficial de DAIKOMYOESTUDIO, estudio de arquitectura contemporánea.
Dirección de arte **“Exposición”**: papel y tinta, Instrument Sans, la arquitectura como protagonista.

- Producción: https://daikomo.netlify.app
- Stack: [Astro 5](https://astro.build) (estático) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + Flip · Content Collections · Netlify

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist
npm run preview   # sirve /dist localmente
```

Requiere Node 20.3 o superior (Netlify usa Node 22, ver `netlify.toml`).

## Estructura

```
src/
  content/projects/*.yaml   ← un archivo por proyecto (textos ES/EN, ficha, imágenes, recorrido)
  content.config.ts         ← esquema validado de los proyectos
  data/media.json           ← tamaños y variantes de cada imagen (generado por `npm run media`)
  i18n/ui.ts                ← textos de interfaz ES/EN
  i18n/pages.ts             ← textos de Estudio y Contacto
  i18n/routes.ts            ← rutas localizadas (/es/proyectos/ ↔ /en/projects/)
  layouts/BaseLayout.astro  ← <head>, SEO, hreflang, Open Graph, cabecera y pie
  components/               ← Header, Footer, Picture, ProjectGrid, project/Blocks, páginas
  pages/es/… y pages/en/…   ← rutas de cada idioma
  scripts/                  ← interacción (GSAP): portada, revelado, grilla, scroll narrativo, navegación
  styles/global.css         ← sistema visual (tokens, grilla, componentes)
public/
  media/                    ← imágenes optimizadas (AVIF + WebP, varios anchos)
  og/                       ← imágenes para compartir (1200×630)
scripts/
  optimize-images.mjs       ← genera public/media desde los originales
  media-sources.json        ← de qué archivo original sale cada imagen
```

## Rutas

| Página    | Español                 | Inglés                 |
|-----------|-------------------------|------------------------|
| Inicio    | `/es/`                  | `/en/`                 |
| Proyectos | `/es/proyectos/`        | `/en/projects/`        |
| Proyecto  | `/es/proyectos/<slug>/` | `/en/projects/<slug>/` |
| Estudio   | `/es/estudio/`          | `/en/studio/`          |
| Contacto  | `/es/contacto/`         | `/en/contact/`         |

`/` redirige a `/es/` (Netlify). El selector ES/EN lleva a la página equivalente y conserva la posición de lectura.

## Mantenimiento

### Agregar un proyecto
1. Copiá los originales a una carpeta fuera del repo (por ejemplo `../media-src/`). **Los originales no se suben.**
2. Sumá cada imagen a `scripts/media-sources.json` con un id (`proyecto-algo`), el archivo y el tipo (`photo`, `render`, `drawing`).
3. Generá las versiones web: `npm i -D sharp && MEDIA_SRC=../media-src npm run media -- id1 id2` (sin ids procesa todo).
4. Creá `src/content/projects/<nombre>.yaml` copiando uno existente. Campos principales:
   - `order` (posición en la grilla), `featured` (opcional: aparece en el inicio, en ese orden)
   - `slug`, `title` en `es`/`en` · `year` · `status`: `built | project | competition | academic | visualization`
   - `program`, `location`, `client`, `architecture`, `role`: **opcionales** — si un dato no está confirmado, no lo incluyas
   - `hero`, `cover`, `sequence` (imágenes del hover en la grilla)
   - `text.es` / `text.en`: párrafos
   - `alt`: texto alternativo de cada imagen en ambos idiomas
   - `blocks`: recorrido narrativo (`expand`, `pair`, `single`, `horizontal`, `split`, `slit`, `paragraph`)
5. `npm run build` valida el esquema: si falta un campo o una imagen, el build falla con un mensaje claro.

### Cambiar textos
- Proyectos: `src/content/projects/*.yaml`.
- Interfaz (menú, etiquetas, estados): `src/i18n/ui.ts`.
- Estudio y Contacto: `src/i18n/pages.ts`.

### Cambiar una imagen
Reemplazá el original, actualizá `scripts/media-sources.json` si cambió el archivo y corré `npm run media -- <id>`.

### Publicar
Cada `git push` a `main` dispara un deploy automático en Netlify (build `npm run build`, carpeta `dist`).
Los pull requests generan una vista previa. GitHub Actions corre el mismo build como verificación.

## Accesibilidad y movimiento
- Todo el contenido es legible sin JavaScript y con `prefers-reduced-motion`: en ese caso no hay animaciones ni secciones fijadas.
- Navegación completa por teclado (enlace “Saltar al contenido”, foco visible, menú con trampa de foco y Esc).
- Ninguna sección fuerza el encaje del scroll; las secciones fijadas solo acompañan el desplazamiento.

## Licencias
Instrument Sans: SIL Open Font License 1.1 (autoalojada vía Fontsource).
GSAP: licencia estándar de GreenSock (uso gratuito).
Imágenes y textos: © DAIKOMYOESTUDIO. Todos los derechos reservados.
