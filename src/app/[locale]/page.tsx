import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import ProgramCard from '@/components/ProgramCard';
import StatBar from '@/components/StatBar';
import CTABanner from '@/components/CTABanner';
import PartnerStrip from '@/components/PartnerStrip';

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isEn = locale === 'en';

  /* -- Program data -------------------------------------------------- */
  const programs = [
    {
      key: 'mejorEmpleo' as const,
      color: 'teal' as const,
      icon: '\u{1F4BC}',
      slug: isEn ? 'better-jobs' : 'mejor-empleo',
    },
    {
      key: 'emprendimiento' as const,
      color: 'coral' as const,
      icon: '\u{1F680}',
      slug: isEn ? 'entrepreneurship' : 'emprendimiento',
    },
    {
      key: 'comunidadDeCuidado' as const,
      color: 'gold' as const,
      icon: '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}',
      slug: isEn ? 'caring-community' : 'comunidad-de-cuidado',
    },
    {
      key: 'navegadorFamiliar' as const,
      color: 'purple' as const,
      icon: '\u{1F9ED}',
      slug: isEn ? 'family-navigator' : 'navegador-familiar',
    },
    {
      key: 'empoderados' as const,
      color: 'navy' as const,
      icon: '\u2696\uFE0F',
      slug: isEn ? 'empowered' : 'empoderados',
    },
  ];

  const programsBase = isEn ? 'programs' : 'programas';

  /* -- Hub features -------------------------------------------------- */
  const hubFeatures = [
    { icon: t('home.hubEducationIcon'), label: t('home.hubEducation') },
    { icon: t('home.hubWorkforceIcon'), label: t('home.hubWorkforce') },
    { icon: t('home.hubHealthcareIcon'), label: t('home.hubHealthcare') },
    { icon: t('home.hubEntrepreneurshipIcon'), label: t('home.hubEntrepreneurship') },
    { icon: t('home.hubYouthIcon'), label: t('home.hubYouth') },
  ];

  /* -- Stats --------------------------------------------------------- */
  const stats = [
    { value: '1,250', label: t('stats.jobs') },
    { value: '850', label: t('stats.families') },
    { value: '70+', label: t('stats.communities') },
    { value: '76,000', label: t('stats.residents') },
  ];

  return (
    <>
      {/* -- 1. Video Hero -------------------------------------------- */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          src="/OASISrendering.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <Image
            src="/logoSquare.png"
            alt="OASIS 360"
            width={160}
            height={160}
            className="mb-8 brightness-0 invert"
            priority
          />

          <h1 className="text-5xl font-bold uppercase tracking-wide text-white md:text-7xl">
            {t('hero.tagline')}
          </h1>

          <p className="mt-6 text-lg text-white/90 md:text-xl">
            {t('hero.subtitle')}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            {t('hero.body')}
          </p>

          <Link
            href="#programas"
            className="mt-10 inline-flex items-center rounded-full bg-oasis-gold px-8 py-4 text-base font-semibold text-oasis-navy shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-gold focus:ring-offset-2 focus:ring-offset-black"
          >
            {t('hero.cta')}
          </Link>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="h-8 w-8 opacity-70"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* -- 2. What is OASIS 360 ------------------------------------- */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('home.whatIsTitle')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {t('home.whatIsText')}
          </p>
        </div>
      </section>

      {/* -- 3. Programs Grid ----------------------------------------- */}
      <section id="programas" className="w-full bg-oasis-gray py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('home.programsTitle')}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.key} className="flex flex-col">
                <ProgramCard
                  name={t(`programs.${p.key}.name`)}
                  tagline={t(`programs.${p.key}.tagline`)}
                  href={`/${locale}/${programsBase}/${p.slug}`}
                  color={p.color}
                  icon={p.icon}
                />
                <p className="mt-2 text-center text-xs font-medium text-oasis-navy/50">
                  Partner: {t(`programs.${p.key}.partner`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- 4. Impact Stats ------------------------------------------ */}
      <StatBar stats={stats} />

      {/* -- 5. The Hub ----------------------------------------------- */}
      <section className="w-full bg-oasis-teal-light py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
              {t('home.hubTitle')}
            </h2>
            <p className="mt-3 text-lg font-medium text-oasis-navy/90">
              {t('home.hubSubtitle')}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-oasis-navy/80">
              {t('home.hubText')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {hubFeatures.map((feature) => (
              <div
                key={feature.label}
                className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <span className="mb-3 text-3xl" aria-hidden="true">
                  {feature.icon}
                </span>
                <span className="text-sm font-semibold leading-snug text-oasis-navy md:text-base">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/hub`}
              className="inline-flex items-center text-base font-semibold text-oasis-teal transition-colors duration-200 hover:underline"
            >
              {t('home.learnMore')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* -- 6. Partners ---------------------------------------------- */}
      <PartnerStrip title={t('home.partnersTitle')} />

      {/* -- 7. CTA Banner -------------------------------------------- */}
      <CTABanner
        title={t('home.ctaTitle')}
        subtitle={t('home.ctaSubtitle')}
        buttonText={t('home.ctaButton')}
        buttonHref={`/${locale}/${isEn ? 'contact' : 'contacto'}`}
      />
    </>
  );
}
