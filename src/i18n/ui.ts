/**
 * Textos de interfaz en español e inglés.
 * Los textos de los proyectos viven en src/content/projects/*.yaml
 * y los de las páginas Estudio/Contacto en src/i18n/pages.ts.
 */
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    'site.name': 'DAIKOMYOESTUDIO',
    'site.description':
      'DAIKOMYOESTUDIO es un estudio de arquitectura contemporánea. Hacer lugar para que lo esencial aparezca.',
    'nav.projects': 'Proyectos',
    'nav.studio': 'Estudio',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.home': 'Inicio',
    'nav.skip': 'Saltar al contenido',
    'nav.lang': 'Idioma',
    'nav.main': 'Navegación principal',
    'home.manifesto': 'Hacer lugar para que lo esencial aparezca.',
    'home.manifestoSub':
      'Dai Ko Myo alude a la Gran Luz: un estado de conciencia que permite percibir más allá de lo evidente. Trasladamos esa disposición a la arquitectura.',
    'home.toStudio': 'El estudio',
    'home.selected': 'Proyectos seleccionados',
    'home.all': 'Todos los proyectos',
    'home.index': 'Índice',
    'projects.title': 'Proyectos',
    'projects.filter': 'Filtrar por estado',
    'projects.all': 'Todos',
    'projects.description':
      'Obra construida, proyectos en desarrollo, concursos, trabajos académicos y visualización arquitectónica de DAIKOMYOESTUDIO.',
    'project.back': 'Proyectos',
    'project.next': 'Siguiente proyecto',
    'project.year': 'Año',
    'project.location': 'Ubicación',
    'project.program': 'Programa',
    'project.status': 'Estado',
    'project.client': 'Cliente',
    'project.architecture': 'Arquitectura',
    'project.role': 'Alcance',
    'project.outside': 'Exterior',
    'project.inside': 'Interior',
    'project.of': 'de',
    'kind.photo': 'Fotografía',
    'kind.render': 'Imagen del proyecto',
    'kind.drawing': 'Dibujo',
    'status.built': 'Obra construida',
    'status.project': 'Proyecto en desarrollo',
    'status.competition': 'Concurso',
    'status.academic': 'Proyecto académico',
    'status.visualization': 'Visualización arquitectónica',
    'footer.instagram': 'Instagram',
    '404.title': 'Página no encontrada',
    '404.text': 'La página que buscás no existe o cambió de lugar.',
    '404.back': 'Volver al inicio',
  },
  en: {
    'site.name': 'DAIKOMYOESTUDIO',
    'site.description':
      'DAIKOMYOESTUDIO is a contemporary architecture studio. Making room for the essential to appear.',
    'nav.projects': 'Projects',
    'nav.studio': 'Studio',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.home': 'Home',
    'nav.skip': 'Skip to content',
    'nav.lang': 'Language',
    'nav.main': 'Main navigation',
    'home.manifesto': 'Making room for the essential to appear.',
    'home.manifestoSub':
      'Dai Ko Myo refers to the Great Light: a state of awareness that lets us perceive beyond the obvious. We bring that disposition to architecture.',
    'home.toStudio': 'The studio',
    'home.selected': 'Selected projects',
    'home.all': 'All projects',
    'home.index': 'Index',
    'projects.title': 'Projects',
    'projects.filter': 'Filter by status',
    'projects.all': 'All',
    'projects.description':
      'Built work, projects in development, competitions, academic work and architectural visualisation by DAIKOMYOESTUDIO.',
    'project.back': 'Projects',
    'project.next': 'Next project',
    'project.year': 'Year',
    'project.location': 'Location',
    'project.program': 'Programme',
    'project.status': 'Status',
    'project.client': 'Client',
    'project.architecture': 'Architecture',
    'project.role': 'Scope',
    'project.outside': 'Outside',
    'project.inside': 'Inside',
    'project.of': 'of',
    'kind.photo': 'Photograph',
    'kind.render': 'Project image',
    'kind.drawing': 'Drawing',
    'status.built': 'Built',
    'status.project': 'In development',
    'status.competition': 'Competition',
    'status.academic': 'Academic project',
    'status.visualization': 'Architectural visualisation',
    'footer.instagram': 'Instagram',
    '404.title': 'Page not found',
    '404.text': 'The page you are looking for does not exist or has moved.',
    '404.back': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

export const statuses = ['built', 'project', 'competition', 'academic', 'visualization'] as const;
export type Status = (typeof statuses)[number];
