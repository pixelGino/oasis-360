import { getTranslations, getLocale } from 'next-intl/server';

const services = [
  { key: 'education', icon: '\uD83C\uDF93' },
  { key: 'workforce', icon: '\uD83D\uDCAA' },
  { key: 'healthcare', icon: '\uD83C\uDFE5' },
  { key: 'entrepreneurship', icon: '\uD83D\uDCA1' },
  { key: 'youth', icon: '\uD83D\uDC66' },
] as const;

export default async function HubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations('hub');
  const locale = await getLocale();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full bg-gradient-to-b from-oasis-navy to-[#0a2a52] overflow-hidden">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Wave decoration */}
        <div className="absolute right-0 bottom-0 left-0 z-0 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 60L48 54C96 48 192 36 288 36C384 36 480 48 576 58C672 68 768 76 864 72C960 68 1056 52 1152 44C1248 36 1344 36 1392 36L1440 36V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-oasis-navy/80 md:text-xl">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-oasis-gray px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('servicesTitle')}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ key, icon }) => (
              <article
                key={key}
                className="rounded-xl bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  className="mb-4 text-4xl"
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-oasis-navy">
                  {t(key)}
                </h3>
                <p className="text-base leading-relaxed text-oasis-navy/70">
                  {t(`${key}Desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit Us ── */}
      <section className="bg-oasis-teal-light px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('visitTitle')}
          </h2>

          <p className="text-lg font-medium text-oasis-navy">
            {t('address')}
          </p>
          <p className="mt-2 text-base text-oasis-navy/70">
            {t('zipCodes')}
          </p>

          {/* Map placeholder */}
          <div className="mx-auto mt-10 flex h-64 max-w-lg items-center justify-center rounded-xl bg-oasis-gray shadow-inner">
            <div className="flex flex-col items-center gap-3 text-oasis-navy/50">
              {/* Pin icon */}
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                {locale === 'es' ? 'Mapa pr\u00f3ximamente' : 'Map coming soon'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
