import Link from 'next/link';
import { type ReactNode } from 'react';

type BrandColor = 'gold' | 'coral' | 'teal' | 'purple' | 'navy';

interface ProgramCardProps {
  name: string;
  tagline: string;
  href: string;
  color: BrandColor;
  icon: ReactNode;
}

const borderColorMap: Record<BrandColor, string> = {
  gold: 'border-t-oasis-gold',
  coral: 'border-t-oasis-coral',
  teal: 'border-t-oasis-teal',
  purple: 'border-t-oasis-purple',
  navy: 'border-t-oasis-navy',
};

const iconBgMap: Record<BrandColor, string> = {
  gold: 'bg-oasis-gold-light text-oasis-gold',
  coral: 'bg-oasis-coral-light text-oasis-coral',
  teal: 'bg-oasis-teal-light text-oasis-teal',
  purple: 'bg-[#EDE5FB] text-oasis-purple',
  navy: 'bg-oasis-gray text-oasis-navy',
};

const linkColorMap: Record<BrandColor, string> = {
  gold: 'text-oasis-gold',
  coral: 'text-oasis-coral',
  teal: 'text-oasis-teal',
  purple: 'text-oasis-purple',
  navy: 'text-oasis-navy',
};

export default function ProgramCard({
  name,
  tagline,
  href,
  color,
  icon,
}: ProgramCardProps) {
  return (
    <article
      className={`group flex min-h-[280px] flex-col rounded-xl border-t-4 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderColorMap[color]}`}
    >
      {/* Icon */}
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg ${iconBgMap[color]}`}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Name */}
      <h3 className="mb-2 text-lg font-bold text-oasis-navy">{name}</h3>

      {/* Tagline */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-oasis-navy/70">
        {tagline}
      </p>

      {/* Link */}
      <Link
        href={href}
        className={`inline-flex items-center text-sm font-semibold transition-colors duration-200 hover:underline ${linkColorMap[color]}`}
      >
        Conoce m&aacute;s
        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          &rarr;
        </span>
      </Link>
    </article>
  );
}
