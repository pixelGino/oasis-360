import Link from 'next/link';
import Image from 'next/image';
import { HeartPulseIcon, HardHatIcon, LaptopIcon, GearIcon } from '@/components/Icons';

interface BetterJobsPageProps {
  t: {
    heroTagline: string;
    heroBody: string;
    heroCta: string;
    isForYouTitle: string;
    isForYouBody: string;
    isForYouFree: string;
    careerAreasTitle: string;
    careerAreasSubtitle: string;
    careerHealthcare: string;
    careerHealthcareDesc: string;
    careerConstruction: string;
    careerConstructionDesc: string;
    careerTechnology: string;
    careerTechnologyDesc: string;
    careerManufacturing: string;
    careerManufacturingDesc: string;
    howTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    servicesTitle: string;
    services: string[];
    statsTitle: string;
    stats: { value: string; label: string }[];
    ctaTitle: string;
    ctaBody: string;
    cta: string;
    ctaAttribution: string;
    crossLinkCare: string;
    crossLinkCareTarget: string;
    crossLinkFamily: string;
    crossLinkFamilyTarget: string;
  };
  locale: string;
  contactHref: string;
}

const careerAreas = [
  { key: 'Healthcare' as const, Icon: HeartPulseIcon },
  { key: 'Construction' as const, Icon: HardHatIcon },
  { key: 'Technology' as const, Icon: LaptopIcon },
  { key: 'Manufacturing' as const, Icon: GearIcon },
];

export default function BetterJobsPage({ t, locale, contactHref }: BetterJobsPageProps) {
  const careHref =
    locale === 'es'
      ? `/${locale}/programas/comunidad-de-cuidado`
      : `/${locale}/programs/caring-community`;
  const familyHref =
    locale === 'es'
      ? `/${locale}/programas/navegador-familiar`
      : `/${locale}/programs/family-navigator`;

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-oasis-navy to-[#0a2a52]">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-6xl">
            {t.heroTagline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {t.heroBody}
          </p>

          <a
            href="#is-for-you"
            className="mt-10 inline-flex items-center rounded-full bg-oasis-gold px-8 py-4 text-base font-semibold text-oasis-navy shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-gold focus:ring-offset-2 focus:ring-offset-oasis-navy"
          >
            {t.heroCta}
          </a>
        </div>

        {/* Wave SVG decoration */}
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

      {/* ── 2. Is This for You? ──────────────────────────────────── */}
      <section id="is-for-you" className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t.isForYouTitle}
          </h2>

          <p className="mt-8 text-center text-lg leading-relaxed text-oasis-navy/90">
            {t.isForYouBody}
          </p>

          {/* Free program callout */}
          <div className="mt-10 flex justify-center">
            <div className="rounded-xl border-2 border-oasis-teal bg-oasis-teal-light px-8 py-4 text-center">
              <p className="text-lg font-bold text-oasis-teal md:text-xl">
                {t.isForYouFree}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What We Train You For ─────────────────────────────── */}
      <section className="w-full bg-oasis-gray py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t.careerAreasTitle}
          </h2>
          <p className="mt-4 text-center text-lg text-oasis-navy/70">
            {t.careerAreasSubtitle}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {careerAreas.map(({ key, Icon }) => {
              const name = t[`career${key}` as keyof typeof t] as string;
              const desc = t[`career${key}Desc` as keyof typeof t] as string;
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-oasis-gray bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oasis-teal/10 text-oasis-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-oasis-navy">{name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-oasis-navy/80">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ──────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t.howTitle}
          </h2>

          {/* Vertical timeline on mobile, horizontal on desktop */}
          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-4" role="list">
            {[1, 2, 3, 4].map((n, index) => {
              const title = t[`step${n}Title` as keyof typeof t] as string;
              const desc = t[`step${n}Desc` as keyof typeof t] as string;
              return (
                <li key={n} className="relative flex flex-col items-center text-center">
                  {/* Connecting line (desktop) */}
                  {index < 3 && (
                    <div
                      className="absolute top-6 left-[calc(50%+28px)] hidden h-0.5 w-[calc(100%-56px)] bg-oasis-teal/30 md:block"
                      aria-hidden="true"
                    />
                  )}

                  {/* Number circle */}
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oasis-teal text-lg font-bold text-white"
                    aria-hidden="true"
                  >
                    {n}
                  </div>

                  <h4 className="mt-4 text-base font-bold text-oasis-navy">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-oasis-navy/70">
                    {desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 5. What You Get ──────────────────────────────────────── */}
      <section className="w-full bg-oasis-gray py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t.servicesTitle}
          </h2>

          <ul className="space-y-3">
            {t.services.map((service, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-xl bg-white px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 shrink-0 text-oasis-teal">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
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

      {/* ── 6. Numbers That Matter ───────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-oasis-navy md:text-4xl">
            {t.statsTitle}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-4xl font-extrabold text-oasis-teal md:text-5xl lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-3 text-sm font-medium text-oasis-navy/70 md:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ───────────────────────────────────────────────── */}
      <section className="w-full bg-oasis-gold py-16 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <h2 className="text-2xl font-bold text-oasis-navy md:text-4xl">
            {t.ctaTitle}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-oasis-navy/80 md:text-xl">
            {t.ctaBody}
          </p>

          <Link
            href={contactHref}
            className="mt-8 inline-flex items-center rounded-full bg-oasis-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0a2a52] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-navy focus:ring-offset-2 focus:ring-offset-oasis-gold"
          >
            {t.cta}
          </Link>

          <p className="mt-6 text-sm text-oasis-navy/60">
            {t.ctaAttribution}
          </p>
        </div>
      </section>

      {/* ── Partner Logos ─────────────────────────────────────────── */}
      <section className="w-full bg-white py-10">
        <div className="mx-auto flex max-w-md items-center justify-center gap-10 px-6">
          <Image
            src="/partners/vimenti.png"
            alt="Vimenti"
            width={120}
            height={120}
            className="h-12 w-auto object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
          {/* JFF logo placeholder — use text until asset is available */}
          <span className="text-sm font-bold tracking-tight text-oasis-navy/40">
            JFF
          </span>
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────── */}
      <section className="w-full bg-oasis-gray py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-6 text-sm">
          <Link
            href={careHref}
            className="font-medium text-oasis-teal underline-offset-2 hover:underline"
          >
            {t.crossLinkCare} → {t.crossLinkCareTarget}
          </Link>
          <Link
            href={familyHref}
            className="font-medium text-oasis-purple underline-offset-2 hover:underline"
          >
            {t.crossLinkFamily} → {t.crossLinkFamilyTarget}
          </Link>
        </div>
      </section>
    </>
  );
}
