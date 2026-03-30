import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/programas/[slug]': {
      es: '/programas/[slug]',
      en: '/programs/[slug]',
    },
    '/hub': {
      es: '/hub',
      en: '/hub',
    },
    '/socios': {
      es: '/socios',
      en: '/partners',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
  },
});
