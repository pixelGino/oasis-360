import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';

const partners = [
  { name: 'Vimenti', descKey: 'vimentiDesc', accent: 'oasis-teal', logo: '/partners/vimenti.png' },
  { name: 'Project Makers', descKey: 'projectMakersDesc', accent: 'oasis-coral', logo: '/partners/project-makers.png' },
  { name: 'IDJ', descKey: 'idjDesc', accent: 'oasis-purple', logo: '/partners/idj.png' },
  { name: 'Goodwill / Excel Center', descKey: 'goodwillDesc', accent: 'oasis-gold', logo: null },
  { name: 'PSI', descKey: 'psiDesc', accent: 'oasis-navy', logo: '/partners/psi.svg' },
] as const;

const accentBorderMap: Record<string, string> = {
  'oasis-teal': 'border-l-oasis-teal',
  'oasis-coral': 'border-l-oasis-coral',
  'oasis-purple': 'border-l-oasis-purple',
  'oasis-gold': 'border-l-oasis-gold',
  'oasis-navy': 'border-l-oasis-navy',
};

export default async function SociosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations('partners');
  const locale = await getLocale();
  const contactPath = locale === 'es' ? `/${locale}/contacto` : `/${locale}/contact`;

  const govPartnersList = t('govPartners').split(', ');

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-oasis-navy to-[#0a2a52]">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {t('subtitle')}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 left-0 z-0 leading-[0]">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60L48 54C96 48 192 36 288 36C384 36 480 48 576 58C672 68 768 76 864 72C960 68 1056 52 1152 44C1248 36 1344 36 1392 36L1440 36V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Partner Profiles */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {partners.map(({ name, descKey, accent, logo }) => (
            <article
              key={name}
              className={`rounded-xl border-l-4 ${accentBorderMap[accent]} bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg`}
            >
              <div className="mb-4 flex items-center gap-4">
                {logo ? (
                  <Image
                    src={logo}
                    alt={name}
                    width={80}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-oasis-navy">{name}</span>
                )}
              </div>
              <h3 className="mb-3 text-xl font-bold text-oasis-navy">
                {name}
              </h3>
              <p className="text-base leading-relaxed text-oasis-navy/70">
                {t(descKey)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Government & Community Partners */}
      <section className="bg-oasis-gray px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-10 text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('govPartnersTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {govPartnersList.map((partner) => (
              <span
                key={partner}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-oasis-navy shadow-sm"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-oasis-gold px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-oasis-navy md:text-4xl">
            {t('ctaTitle')}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-oasis-navy/80">
            {t('ctaText')}
          </p>
          <Link
            href={contactPath}
            className="inline-flex items-center rounded-full bg-oasis-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-navy focus:ring-offset-2 focus:ring-offset-oasis-gold"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </>
  );
}
