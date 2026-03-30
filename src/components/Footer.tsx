'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const programSlugs = [
  'mejor-empleo',
  'emprendimiento-e3',
  'comunidad-de-cuidado',
  'navegador-familiar',
  'empoderados',
] as const;

const programKeys = [
  'mejorEmpleo',
  'emprendimiento',
  'comunidadDeCuidado',
  'navegadorFamiliar',
  'empoderados',
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const programsBasePath = locale === 'es' ? 'programas' : 'programs';

  const quickLinks = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.programs'), href: `/${locale}/${programsBasePath}/${programSlugs[0]}` },
    { label: t('nav.hub'), href: `/${locale}/hub` },
    { label: t('nav.partners'), href: `/${locale}/${locale === 'es' ? 'socios' : 'partners'}` },
    { label: t('nav.contact'), href: `/${locale}/${locale === 'es' ? 'contacto' : 'contact'}` },
  ];

  const programs = programKeys.map((key, i) => ({
    label: t(`programs.${key}.name`),
    href: `/${locale}/${programsBasePath}/${programSlugs[i]}`,
  }));

  return (
    <footer className="bg-oasis-navy text-white">
      {/* Teal divider line */}
      <div className="h-1 bg-oasis-teal" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Column 1: Logo + Description */}
          <div>
            <Link href={`/${locale}`} aria-label="OASIS 360 Home">
              <Image
                src="/logoSquare.png"
                alt="OASIS 360"
                width={60}
                height={60}
                className="mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/80">
              OASIS 360 is a community initiative connecting residents of San
              Juan (00923/00924) with quality employment, training,
              entrepreneurship, childcare, and family support to build real
              pathways to economic mobility.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-oasis-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.programs')}
            </h3>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.href}>
                  <Link
                    href={program.href}
                    className="text-sm text-white/80 transition-colors hover:text-oasis-gold"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* EDA Attribution */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-xs leading-relaxed text-white/60">
            {t('footer.attribution')}
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-xs text-white/50">
          &copy; 2026 OASIS 360 &mdash; PSI. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
