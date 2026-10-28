import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({ es: z.string(), en: z.string() });
const mediaId = z.string();

/**
 * Bloques narrativos de una página de proyecto. Se componen en el YAML de cada proyecto
 * y se dibujan con src/components/project/Blocks.astro.
 */
const block = z.discriminatedUnion('type', [
  // imagen que pasa de lámina enmarcada a pantalla completa con el scroll
  z.object({ type: z.literal('expand'), image: mediaId }),
  // dos imágenes en composición asimétrica
  z.object({ type: z.literal('pair'), images: z.tuple([mediaId, mediaId]) }),
  // una imagen con tamaño y alineación editoriales
  z.object({
    type: z.literal('single'),
    image: mediaId,
    size: z.enum(['s', 'm', 'l', 'full']).default('m'),
    align: z.enum(['left', 'center', 'right']).default('center'),
  }),
  // galería horizontal (fijada en desktop, deslizable en mobile)
  z.object({ type: z.literal('horizontal'), images: z.array(mediaId).min(2) }),
  // exterior / interior separados por un horizonte que sube
  z.object({ type: z.literal('split'), outside: mediaId, inside: mediaId }),
  // umbral: la imagen se abre desde una rendija
  z.object({ type: z.literal('slit'), image: mediaId }),
  // un párrafo del texto del proyecto ubicado dentro del recorrido
  z.object({ type: z.literal('paragraph'), index: z.number().int().min(0) }),
]);

const projects = defineCollection({
  // id = nombre del archivo (el campo `slug` es un objeto ES/EN y no debe usarse como id)
  loader: glob({ pattern: '*.yaml', base: './src/content/projects', generateId: ({ entry }) => entry.replace(/\.ya?ml$/, '') }),
  schema: z.object({
    order: z.number(),
    featured: z.number().optional(),
    slug: localized,
    title: localized,
    year: z.string(),
    status: z.enum(['built', 'project', 'competition', 'academic', 'visualization']),
    program: localized.optional(),
    location: localized.optional(),
    client: z.string().optional(),
    architecture: z.string().optional(),
    role: localized.optional(),
    // datos adicionales tomados de la documentación del estudio (superficie, autorías, dirección de obra…)
    details: z.array(z.object({ label: localized, value: z.union([z.string(), localized]) })).default([]),
    hero: mediaId,
    heroLayout: z.enum(['full', 'contained']).default('full'),
    cover: mediaId,
    sequence: z.array(mediaId).default([]),
    text: z.object({ es: z.array(z.string()), en: z.array(z.string()) }),
    alt: z.record(z.string(), localized),
    blocks: z.array(block).default([]),
  }),
});

export const collections = { projects };
