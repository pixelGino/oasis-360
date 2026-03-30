import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProgramCard from '@/components/ProgramCard';
import StatBar from '@/components/StatBar';
import CTABanner from '@/components/CTABanner';
import PartnerStrip from '@/components/PartnerStrip';

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isEn = locale === 'en';

  /* ── Program data ─────────────────────────────────────────────── */
  const programs = [
    {
      key: 'mejorEmpleo' as const,
      color: 'teal' as const,
      icon: '\u{1F4BC}',
      slug: isEn ? 'mejor-empleo' : 'mejor-empleo',
    },
    {
      key: 'emprendimiento' as const,
      color: 'coral' as const,
      icon: '\u{1F680}',
      slug: isEn ? 'emprendimiento' : 'emprendimiento',
    },
    {
      key: 'comunidadDeCuidado' as const,
      color: 'gold' as const,
      icon: '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}',
      slug: isEn ? 'comunidad-de-cuidado' : 'comunidad-de-cuidado',
    },
    {
      key: 'navegadorFamiliar' as const,
      color: 'purple' as const,
      icon: '\u{1F9ED}',
      slug: isEn ? 'navegador-familiar' : 'navegador-familiar',
    },
    {
      key: 'empoderados' as const,
      color: 'navy' as const,
      icon: '\u2696\uFE0F',
      slug: isEn ? 'empoderados' : 'empoderados',
    },
  ];

  const programsBase = isEn ? 'programs' : 'programas';

  /* ── Hub features ─────────────────────────────────────────────── */
  const hubFeatures = [
    { icon: '\u{1F393}', label: t('home.hubEducation') },
    { icon: '\u{1F4AA}', label: t('home.hubWorkforce') },
    { icon: '\u{1F3E5}', label: t('home.hubHealthcare') },
    { icon: '\u{1F4A1}', label: t('home.hubEntrepreneurship') },
    { icon: '\u{1F466}', label: t('home.hubYouth') },
  ];

  /* ── Stats ────────────────────────────────────────────────────── */
  const stats = [
    { value: '1,250', label: t('stats.jobs') },
    { value: '850', label: t('stats.families') },
    { value: '70+', label: t('stats.communities') },
    { value: '76,000', label: t('stats.residents') },
  ];

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <Hero
        title={t('hero.tagline')}
        subtitle={t('hero.subtitle')}
        ctaText={t('hero.cta')}
        ctaHref="#programas"
        showLogo
      />

      {/* ── 2. What is OASIS 360 ─────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('home.whatIsTitle')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {t('home.whatIsText')}
          </p>
        </div>
      </section>

      {/* ── 3. Programs Grid ─────────────────────────────────────── */}
      <section id="programas" className="w-full bg-oasis-gray py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('home.programsTitle')}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <ProgramCard
                key={p.key}
                name={t(`programs.${p.key}.name`)}
                tagline={t(`programs.${p.key}.tagline`)}
                href={`/${locale}/${programsBase}/${p.slug}`}
                color={p.color}
                icon={p.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Impact Stats ──────────────────────────────────────── */}
      <StatBar stats={stats} />

      {/* ── 5. The Hub ───────────────────────────────────────────── */}
      <section className="w-full bg-oasis-teal-light py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
              {t('home.hubTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-oasis-navy/80">
              {t('home.hubText')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
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

      {/* ── 6. Partners ──────────────────────────────────────────── */}
      <PartnerStrip title={t('home.partnersTitle')} />

      {/* ── 7. CTA Banner ────────────────────────────────────────── */}
      <CTABanner
        title={t('home.ctaTitle')}
        subtitle={t('home.ctaSubtitle')}
        buttonText={t('home.ctaButton')}
        buttonHref={`/${locale}/${isEn ? 'contact' : 'contacto'}`}
      />
    </>
  );
}
