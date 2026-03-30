import Link from 'next/link';

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTABanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: CTABannerProps) {
  return (
    <section className="w-full bg-oasis-gold py-16 md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-bold text-oasis-navy md:text-4xl">
          {title}
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-oasis-navy/80 md:text-xl">
          {subtitle}
        </p>

        <Link
          href={buttonHref}
          className="mt-8 inline-flex items-center rounded-full bg-oasis-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0a2a52] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-navy focus:ring-offset-2 focus:ring-offset-oasis-gold"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
