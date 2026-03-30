import { getTranslations, getLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations('contact');
  const tHub = await getTranslations('hub');
  const locale = await getLocale();

  return (
    <>
      {/* ── Header ── */}
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

      {/* ── Content: Form + Info ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Left — Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right — Contact Info Card */}
          <div className="flex flex-col gap-8">
            <div className="rounded-xl bg-oasis-teal-light p-8">
              <h2 className="mb-6 text-2xl font-bold text-oasis-navy">
                {locale === 'es' ? 'Informaci\u00f3n de Contacto' : 'Contact Information'}
              </h2>

              {/* Address */}
              <div className="mb-5 flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 shrink-0 text-oasis-teal"
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
                <div>
                  <p className="font-semibold text-oasis-navy">
                    Villa Prades, San Juan, Puerto Rico
                  </p>
                  <p className="mt-1 text-sm text-oasis-navy/70">
                    ZIP: 00923, 00924
                  </p>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-6 border-oasis-teal/20" />

              {/* Map placeholder */}
              <div className="flex h-48 items-center justify-center rounded-xl bg-oasis-gray shadow-inner">
                <div className="flex flex-col items-center gap-3 text-oasis-navy/50">
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
                    {tHub('mapPlaceholder')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
