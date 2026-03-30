import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  showLogo?: boolean;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  showLogo = false,
}: HeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-oasis-navy to-[#0a2a52] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
        {showLogo && (
          <Image
            src="/logoSquare.png"
            alt="OASIS 360"
            width={150}
            height={150}
            className="mb-8 brightness-0 invert"
            priority
          />
        )}

        <h1 className="text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          {subtitle}
        </p>

        <Link
          href={ctaHref}
          className="mt-10 inline-flex items-center rounded-full bg-oasis-gold px-8 py-4 text-base font-semibold text-oasis-navy shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-oasis-gold focus:ring-offset-2 focus:ring-offset-oasis-navy"
        >
          {ctaText}
        </Link>
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
  );
}
