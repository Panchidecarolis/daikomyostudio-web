import type { Lang } from './ui';

/**
 * Textos de las páginas Estudio y Contacto.
 * `review: true` marca traducciones que todavía deben ser aprobadas editorialmente
 * (ver PENDIENTES.md). No se muestra en la web.
 */
interface StudioText {
  title: string;
  description: string;
  /** admite <strong> para las negritas selectivas (peso 600) */
  manifesto: string[];
  processTitle: string;
  processCaption: string;
  toProjects: string;
  toContact: string;
  alt: Record<'croquis1' | 'croquis2' | 'croquis3' | 'dibujo' | 'proceso' | 'mesa', string>;
  review?: boolean;
}

export const studio: Record<Lang, StudioText> = {
  es: {
    title: 'Estudio',
    description:
      'DAIKOMYOESTUDIO nace de una forma de mirar con profundidad: hacer lugar para que lo esencial aparezca.',
    manifesto: [
      'Dai Ko Myo es el <strong>símbolo maestro del Reiki</strong>. Alude a la <strong>Gran Luz</strong>: un estado de conciencia que permite <strong>percibir más allá de lo evidente</strong>.',
      'Nuestro estudio nace de esa idea. De una forma de <strong>mirar con profundidad</strong>, de <strong>permanecer abiertos</strong> y de dejar que cada proyecto revele <strong>posibilidades que no estaban previstas</strong> de antemano.',
      'Trasladamos esa disposición a la arquitectura: <strong>hacer lugar para que lo esencial aparezca</strong>.',
    ],
    processTitle: 'Dibujos y procesos',
    processCaption: 'Proceso de diseño',
    toProjects: 'Ver los proyectos',
    toContact: 'Escribinos',
    alt: {
      croquis1: 'Croquis a tinta de un recorrido entre muros y vegetación',
      croquis2: 'Croquis a tinta de un pasillo entre planos verticales y vegetación',
      croquis3: 'Croquis a tinta de un pabellón abierto entre árboles',
      dibujo: 'Dibujo a tinta de un paisaje de formas onduladas',
      proceso: 'Mano dibujando en lápiz estudios de formas circulares sobre papel',
      mesa: 'Planos impresos y una cámara sobre la mesa de trabajo',
    },
  },
  en: {
    title: 'Studio',
    description:
      'DAIKOMYOESTUDIO was born from a way of looking deeply: making room for the essential to appear.',
    manifesto: [
      'Dai Ko Myo is the <strong>master symbol of Reiki</strong>. It refers to the <strong>Great Light</strong>: a state of awareness that lets us <strong>perceive beyond the obvious</strong>.',
      'Our studio was born from that idea. From a way of <strong>looking deeply</strong>, of <strong>remaining open</strong>, and of letting each project reveal <strong>possibilities that were not foreseen</strong>.',
      'We bring that disposition to architecture: <strong>making room for the essential to appear</strong>.',
    ],
    processTitle: 'Drawings and process',
    processCaption: 'Design process',
    toProjects: 'See the projects',
    toContact: 'Write to us',
    alt: {
      croquis1: 'Ink sketch of a path between walls and vegetation',
      croquis2: 'Ink sketch of a corridor between vertical planes and vegetation',
      croquis3: 'Ink sketch of an open pavilion among trees',
      dibujo: 'Ink drawing of a landscape of undulating forms',
      proceso: 'Hand drawing pencil studies of circular forms on paper',
      mesa: 'Printed drawings and a camera on the work table',
    },
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

export interface ContactText {
  title: string;
  description: string;
  lead: string;
  email: string;
  instagram: string;
  form: {
    name: string;
    email: string;
    subject: string;
    subjectHint: string;
    message: string;
    optional: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
  };
}

export const contact: Record<Lang, ContactText> = {
  es: {
    title: 'Contacto',
    description: 'Escribile a DAIKOMYOESTUDIO: consultas, proyectos y colaboraciones.',
    lead: 'Para consultas, proyectos y colaboraciones, escribinos.',
    email: 'Correo',
    instagram: 'Instagram',
    form: {
      name: 'Nombre',
      email: 'Correo electrónico',
      subject: 'Asunto',
      subjectHint: 'Proyecto, colaboración, prensa…',
      message: 'Mensaje',
      optional: 'opcional',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Mensaje enviado correctamente',
      error: 'No pudimos enviar tu mensaje. Intentá nuevamente.',
      required: 'Completá este campo.',
      invalidEmail: 'Ingresá un correo electrónico válido.',
    },
  },
  en: {
    title: 'Contact',
    description: 'Write to DAIKOMYOESTUDIO: enquiries, projects and collaborations.',
    lead: 'For enquiries, projects and collaborations, write to us.',
    email: 'Email',
    instagram: 'Instagram',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      subjectHint: 'Project, collaboration, press…',
      message: 'Message',
      optional: 'optional',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Message sent successfully',
      error: 'Your message could not be sent. Please try again.',
      required: 'Please fill in this field.',
      invalidEmail: 'Please enter a valid email address.',
    },
  },
};

export const STUDIO_EMAIL = 'daikomyostudio@gmail.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/daikomyostudio/';
export const INSTAGRAM_HANDLE = '@daikomyostudio';
