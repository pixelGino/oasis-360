import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import StepProcess from '@/components/StepProcess';
import CTABanner from '@/components/CTABanner';
import BetterJobsPage from '@/components/BetterJobsPage';

/* ------------------------------------------------------------------ */
/*  Slug → translation-key mapping                                     */
/* ------------------------------------------------------------------ */

const programMap: Record<string, { key: string; color: string }> = {
  'mejor-empleo':        { key: 'mejorEmpleo',        color: 'teal' },
  'better-jobs':         { key: 'mejorEmpleo',        color: 'teal' },
  'emprendimiento':      { key: 'emprendimiento',     color: 'coral' },
  'entrepreneurship':    { key: 'emprendimiento',     color: 'coral' },
  'comunidad-de-cuidado':{ key: 'comunidadDeCuidado', color: 'gold' },
  'caring-community':    { key: 'comunidadDeCuidado', color: 'gold' },
  'navegador-familiar':  { key: 'navegadorFamiliar',  color: 'purple' },
  'family-navigator':    { key: 'navegadorFamiliar',  color: 'purple' },
  'empoderados':         { key: 'empoderados',        color: 'navy' },
  'empowered':           { key: 'empoderados',        color: 'navy' },
};

/* ------------------------------------------------------------------ */
/*  Color utility maps (Tailwind needs full class names for JIT)       */
/* ------------------------------------------------------------------ */

const checkColorMap: Record<string, string> = {
  teal:   'text-oasis-teal',
  coral:  'text-oasis-coral',
  gold:   'text-oasis-gold',
  purple: 'text-oasis-purple',
  navy:   'text-oasis-navy',
};

const iconBgMap: Record<string, string> = {
  teal:   'bg-oasis-teal/10',
  coral:  'bg-oasis-coral/10',
  gold:   'bg-oasis-gold/10',
  purple: 'bg-oasis-purple/10',
  navy:   'bg-oasis-navy/10',
};

const statBorderMap: Record<string, string> = {
  teal:   'border-oasis-teal',
  coral:  'border-oasis-coral',
  gold:   'border-oasis-gold',
  purple: 'border-oasis-purple',
  navy:   'border-oasis-navy',
};

/* ------------------------------------------------------------------ */
/*  Static params for all valid slug combinations                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  const esSlugs = [
    'mejor-empleo',
    'emprendimiento',
    'comunidad-de-cuidado',
    'navegador-familiar',
    'empoderados',
  ];
  const enSlugs = [
    'better-jobs',
    'entrepreneurship',
    'caring-community',
    'family-navigator',
    'empowered',
  ];

  return [
    ...esSlugs.map((slug) => ({ locale: 'es', slug })),
    ...enSlugs.map((slug) => ({ locale: 'en', slug })),
  ];
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const program = programMap[slug];

  if (!program) {
    notFound();
  }

  const { key: programKey, color } = program;
  const t = await getTranslations('programs');

  /* Contact href based on locale */
  const contactHref = locale === 'es' ? `/${locale}/contacto` : `/${locale}/contact`;

  /* ── Custom layout for Better Jobs / Mejor Empleo ────────────── */
  if (programKey === 'mejorEmpleo') {
    const raw = t.raw(programKey) as Record<string, unknown>;
    return (
      <BetterJobsPage
        t={{
          heroTagline: raw.heroTagline as string,
          heroBody: raw.heroBody as string,
          heroCta: raw.heroCta as string,
          isForYouTitle: raw.isForYouTitle as string,
          isForYouBody: raw.isForYouBody as string,
          isForYouFree: raw.isForYouFree as string,
          careerAreasTitle: raw.careerAreasTitle as string,
          careerAreasSubtitle: raw.careerAreasSubtitle as string,
          careerHealthcare: raw.careerHealthcare as string,
          careerHealthcareDesc: raw.careerHealthcareDesc as string,
          careerConstruction: raw.careerConstruction as string,
          careerConstructionDesc: raw.careerConstructionDesc as string,
          careerTechnology: raw.careerTechnology as string,
          careerTechnologyDesc: raw.careerTechnologyDesc as string,
          careerManufacturing: raw.careerManufacturing as string,
          careerManufacturingDesc: raw.careerManufacturingDesc as string,
          howTitle: raw.howTitle as string,
          step1Title: raw.step1Title as string,
          step1Desc: raw.step1Desc as string,
          step2Title: raw.step2Title as string,
          step2Desc: raw.step2Desc as string,
          step3Title: raw.step3Title as string,
          step3Desc: raw.step3Desc as string,
          step4Title: raw.step4Title as string,
          step4Desc: raw.step4Desc as string,
          servicesTitle: raw.servicesTitle as string,
          services: raw.services as string[],
          statsTitle: raw.statsTitle as string,
          stats: raw.stats as { value: string; label: string }[],
          ctaTitle: raw.ctaTitle as string,
          ctaBody: raw.ctaBody as string,
          cta: raw.cta as string,
          ctaAttribution: raw.ctaAttribution as string,
          crossLinkCare: raw.crossLinkCare as string,
          crossLinkCareTarget: raw.crossLinkCareTarget as string,
          crossLinkFamily: raw.crossLinkFamily as string,
          crossLinkFamilyTarget: raw.crossLinkFamilyTarget as string,
        }}
        locale={locale}
        contactHref={contactHref}
      />
    );
  }

  /* Build the 4 steps for StepProcess from separate title/desc keys */
  const steps = [1, 2, 3, 4].map((n) => ({
    number: String(n),
    title: t(`${programKey}.step${n}Title`),
    description: t(`${programKey}.step${n}Desc`),
  }));

  /* Services array */
  const services = t.raw(`${programKey}.services`) as string[];

  /* Challenge stats (optional — not every program has them) */
  let challengeStats: { value: string; label: string }[] | null = null;
  try {
    const raw = t.raw(`${programKey}.challengeStats`);
    if (Array.isArray(raw)) {
      challengeStats = raw as { value: string; label: string }[];
    }
  } catch {
    /* key does not exist for this program — ignore */
  }

  /* navegadorFamiliar-specific data */
  const isNavegadorFamiliar = programKey === 'navegadorFamiliar';
  let familyStats: { value: string; label: string }[] | null = null;
  if (isNavegadorFamiliar) {
    try {
      const raw = t.raw(`${programKey}.familyStats`);
      if (Array.isArray(raw)) {
        familyStats = raw as { value: string; label: string }[];
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <Hero
        title={t(`${programKey}.name`)}
        subtitle={t(`${programKey}.heroTagline`)}
        ctaText={t(`${programKey}.cta`)}
        ctaHref="#start"
      />

      {/* ── 2. Hero Body + Partner Badge ───────────────────────── */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-lg leading-relaxed text-oasis-navy/90">
            {t(`${programKey}.heroBody`)}
          </p>

          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-oasis-teal-light px-5 py-2 text-sm font-medium text-oasis-teal">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-1.053M15 19.128ZM18 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9-3.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {locale === 'es' ? 'Liderado por' : 'Led by'}:{' '}
              <strong>{t(`${programKey}.partner`)}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. The Challenge ────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t(`${programKey}.challengeTitle`)}
          </h2>

          <div className="mt-10 rounded-xl border-l-4 border-l-oasis-coral bg-oasis-coral-light p-6 md:p-8">
            <p className="text-base leading-relaxed text-oasis-navy/90 md:text-lg">
              {t(`${programKey}.challenge`)}
            </p>
          </div>

          {/* Challenge stats (if available) */}
          {challengeStats && challengeStats.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {challengeStats.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-t-4 ${statBorderMap[color]} bg-white p-5 text-center shadow-sm`}
                >
                  <p className={`text-2xl font-bold ${checkColorMap[color]}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-oasis-navy/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. How It Works ─────────────────────────────────────── */}
      <section className="w-full bg-oasis-gray py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t(`${programKey}.howTitle`)}
          </h2>

          <StepProcess
            steps={steps}
            color={color as 'gold' | 'coral' | 'teal' | 'purple' | 'navy'}
          />
        </div>
      </section>

      {/* ── 5. Two Service Levels (navegadorFamiliar only) ──────── */}
      {isNavegadorFamiliar && (
        <section className="w-full bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
              {t(`${programKey}.serviceLevelsTitle`)}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Service Level 1 */}
              <div className="rounded-2xl border border-oasis-purple/20 bg-oasis-purple/5 p-8">
                <h3 className="text-xl font-bold text-oasis-purple">
                  {t(`${programKey}.serviceLevel1Title`)}
                </h3>
                <p className="mt-4 leading-relaxed text-oasis-navy/80">
                  {t(`${programKey}.serviceLevel1Desc`)}
                </p>
              </div>

              {/* Service Level 2 */}
              <div className="rounded-2xl border border-oasis-purple/20 bg-oasis-purple/5 p-8">
                <h3 className="text-xl font-bold text-oasis-purple">
                  {t(`${programKey}.serviceLevel2Title`)}
                </h3>
                <p className="mt-4 leading-relaxed text-oasis-navy/80">
                  {t(`${programKey}.serviceLevel2Desc`)}
                </p>
              </div>
            </div>

            {/* Family stats */}
            {familyStats && familyStats.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {familyStats.map((stat, index) => (
                  <div
                    key={index}
                    className="inline-flex flex-col items-center rounded-full bg-oasis-purple/10 px-6 py-3"
                  >
                    <span className="text-lg font-bold text-oasis-purple">
                      {stat.value}
                    </span>
                    <span className="text-xs text-oasis-navy/70">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6. What You Get ─────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t(`${programKey}.servicesTitle`)}
          </h2>

          <ul className="space-y-4">
            {services.map((service, index) => (
              <li
                key={index}
                className={`flex items-start gap-4 rounded-xl border border-oasis-gray ${iconBgMap[color]} p-5 transition-shadow hover:shadow-md`}
              >
                {/* Checkmark icon */}
                <span className={`mt-0.5 shrink-0 ${checkColorMap[color]}`}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>

                <span className="text-base leading-relaxed text-oasis-navy/90">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. Who It's For ─────────────────────────────────────── */}
      <section className="w-full bg-oasis-teal-light py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
            {t(`${programKey}.audienceTitle`)}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-oasis-navy/80">
            {t(`${programKey}.audience`)}
          </p>
        </div>
      </section>

      {/* ── 8. CTA Banner ───────────────────────────────────────── */}
      <div id="start">
        <CTABanner
          title={t(`${programKey}.ctaTitle`)}
          subtitle={t(`${programKey}.ctaBody`)}
          buttonText={t(`${programKey}.cta`)}
          buttonHref={contactHref}
        />
      </div>
    </>
  );
}
