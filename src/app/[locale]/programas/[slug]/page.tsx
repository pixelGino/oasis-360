import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import StepProcess from '@/components/StepProcess';
import CTABanner from '@/components/CTABanner';

/* ------------------------------------------------------------------ */
/*  Slug → translation-key mapping                                     */
/* ------------------------------------------------------------------ */

const programMap: Record<string, { key: string; color: string; icon: string }> = {
  'mejor-empleo':        { key: 'mejorEmpleo',        color: 'teal',   icon: '💼' },
  'better-jobs':         { key: 'mejorEmpleo',        color: 'teal',   icon: '💼' },
  'emprendimiento':      { key: 'emprendimiento',     color: 'coral',  icon: '🚀' },
  'entrepreneurship':    { key: 'emprendimiento',     color: 'coral',  icon: '🚀' },
  'comunidad-de-cuidado':{ key: 'comunidadDeCuidado', color: 'gold',   icon: '👨‍👩‍👧‍👦' },
  'caring-community':    { key: 'comunidadDeCuidado', color: 'gold',   icon: '👨‍👩‍👧‍👦' },
  'navegador-familiar':  { key: 'navegadorFamiliar',  color: 'purple', icon: '🧭' },
  'family-navigator':    { key: 'navegadorFamiliar',  color: 'purple', icon: '🧭' },
  'empoderados':         { key: 'empoderados',        color: 'navy',   icon: '⚖️' },
  'empowered':           { key: 'empoderados',        color: 'navy',   icon: '⚖️' },
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

  const { key: programKey, color, icon } = program;
  const t = await getTranslations('programs');

  /* Build the 4 steps for StepProcess */
  const steps = [1, 2, 3, 4].map((n) => ({
    number: String(n),
    title: t(`${programKey}.step${n}`).split(' — ')[0],
    description: t(`${programKey}.step${n}`).includes(' — ')
      ? t(`${programKey}.step${n}`).split(' — ').slice(1).join(' — ')
      : t(`${programKey}.step${n}`),
  }));

  /* Services array */
  const services = t.raw(`${programKey}.services`) as string[];

  /* Contact href based on locale */
  const contactHref = locale === 'es' ? `/${locale}/contacto` : `/${locale}/contact`;

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <Hero
        title={`${icon} ${t(`${programKey}.name`)}`}
        subtitle={t(`${programKey}.tagline`)}
        ctaText={t(`${programKey}.cta`)}
        ctaHref="#start"
      />

      {/* ── 2. Partner Badge ────────────────────────────────────── */}
      <section className="w-full bg-white py-6">
        <div className="mx-auto flex justify-center px-6">
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

      {/* ── 5. What You Get ─────────────────────────────────────── */}
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

      {/* ── 6. Who It's For ─────────────────────────────────────── */}
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

      {/* ── 7. CTA Banner ───────────────────────────────────────── */}
      <div id="start">
        <CTABanner
          title={t(`${programKey}.cta`)}
          subtitle={
            locale === 'es'
              ? 'Da el primer paso hacia nuevas oportunidades.'
              : 'Take the first step toward new opportunities.'
          }
          buttonText={locale === 'es' ? 'Contáctanos' : 'Contact Us'}
          buttonHref={contactHref}
        />
      </div>
    </>
  );
}
