import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { hubIcons } from '@/components/Icons';

const serviceKeys = ['education', 'workforce', 'healthcare', 'entrepreneurship', 'youth'] as const;

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
            {serviceKeys.map((key) => {
              const Icon = hubIcons[key];
              return (
              <article
                key={key}
                className="rounded-xl bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  className="mb-4 text-oasis-teal"
                  aria-hidden="true"
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-oasis-navy">
                  {t(key)}
                </h3>
                <p className="text-base leading-relaxed text-oasis-navy/70">
                  {t(`${key}Desc`)}
                </p>
              </article>
              );
            })}
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

          {/* CTA link */}
          <Link
            href={locale === 'es' ? `/${locale}/contacto` : `/${locale}/contact`}
            className="mt-6 inline-flex items-center text-lg font-semibold text-oasis-teal transition-colors duration-200 hover:text-oasis-navy"
          >
            {t('visitCta')} &rarr;
          </Link>

          {/* Google Map embed — Villa Prades area */}
          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3785.5!2d-66.023774!3d18.411379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spr!4v1711800000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={locale === 'es' ? 'Mapa de Villa Prades, San Juan' : 'Villa Prades, San Juan Map'}
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
