import type { Lang } from './ui';

/**
 * Textos de las páginas Estudio y Contacto.
 * `review: true` marca traducciones que todavía deben ser aprobadas editorialmente
 * (ver PENDIENTES.md). No se muestra en la web.
 */
export const studio: Record<Lang, { title: string; description: string; manifesto: string[]; review?: boolean }> = {
  es: {
    title: 'Estudio',
    description:
      'DAIKOMYOESTUDIO nace de una forma de mirar con profundidad: hacer lugar para que lo esencial aparezca.',
    manifesto: [
      'Dai Ko Myo es el símbolo maestro del Reiki. Alude a la Gran Luz: un estado de conciencia que permite percibir más allá de lo evidente.',
      'Nuestro estudio nace de esa idea. De una forma de mirar con profundidad, de permanecer abiertos y de dejar que cada proyecto revele posibilidades que no estaban previstas de antemano.',
      'Trasladamos esa disposición a la arquitectura: hacer lugar para que lo esencial aparezca.',
    ],
  },
  en: {
    title: 'Studio',
    description:
      'DAIKOMYOESTUDIO was born from a way of looking deeply: making room for the essential to appear.',
    manifesto: [
      'Dai Ko Myo is the master symbol of Reiki. It refers to the Great Light: a state of awareness that lets us perceive beyond the obvious.',
      'Our studio was born from that idea. From a way of looking deeply, of remaining open, and of letting each project reveal possibilities that were not foreseen.',
      'We bring that disposition to architecture: making room for the essential to appear.',
    ],
    review: true,
  },
};

export const practice: Record<Lang, { title: string; groups: { key: 'architecture' | 'competitions' | 'visualization'; label: string }[] }> = {
  es: {
    title: 'Práctica',
    groups: [
      { key: 'architecture', label: 'Arquitectura' },
      { key: 'competitions', label: 'Concursos e investigación' },
      { key: 'visualization', label: 'Visualización arquitectónica' },
    ],
  },
  en: {
    title: 'Practice',
    groups: [
      { key: 'architecture', label: 'Architecture' },
      { key: 'competitions', label: 'Competitions and research' },
      { key: 'visualization', label: 'Architectural visualisation' },
    ],
  },
};

export const contact: Record<Lang, { title: string; description: string; lead: string; instagram: string }> = {
  es: {
    title: 'Contacto',
    description: 'Contacto de DAIKOMYOESTUDIO.',
    lead: 'Para consultas, proyectos y colaboraciones, escribinos.',
    instagram: 'Instagram',
  },
  en: {
    title: 'Contact',
    description: 'Get in touch with DAIKOMYOESTUDIO.',
    lead: 'For enquiries, projects and collaborations, write to us.',
    instagram: 'Instagram',
  },
};

export const INSTAGRAM_URL = 'https://www.instagram.com/daikomyostudio/';
export const INSTAGRAM_HANDLE = '@daikomyostudio';
