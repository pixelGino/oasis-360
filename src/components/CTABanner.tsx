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
    <section className="w-full bg-oasis-gold py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-10 text-center sm:px-12 md:px-6">
        <h2 className="text-xl font-bold text-oasis-navy sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-loose text-oasis-navy/80 sm:mt-4 sm:text-base sm:leading-relaxed md:text-xl">
          {subtitle}
        </p>

        <Link
          href={buttonHref}
          className="mt-6 inline-flex items-center rounded-full bg-oasis-navy px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0a2a52] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-navy focus:ring-offset-2 focus:ring-offset-oasis-gold sm:mt-8 sm:px-8 sm:py-4 sm:text-base"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
