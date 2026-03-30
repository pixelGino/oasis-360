import Image from 'next/image';

interface PartnerStripProps {
  title: string;
}

const partners = [
  { name: 'Vimenti', logo: '/partners/vimenti.png', width: 120, height: 120 },
  { name: 'Project Makers', logo: '/partners/project-makers.png', width: 160, height: 70 },
  { name: 'IDJ', logo: '/partners/idj.png', width: 160, height: 72 },
  { name: 'Goodwill / Excel Center', logo: '/partners/goodwill.png', width: 216, height: 92 },
  { name: 'PSI', logo: '/partners/psi.png', width: 140, height: 100 },
];

export default function PartnerStrip({ title }: PartnerStripProps) {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-10 sm:px-12 md:px-6">
        <h2 className="mb-8 text-center text-lg font-bold text-oasis-navy sm:mb-10 sm:text-2xl md:text-3xl">
          {title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-16 items-center justify-center grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-bold tracking-tight text-oasis-navy/60">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
