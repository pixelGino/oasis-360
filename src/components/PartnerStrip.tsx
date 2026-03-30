import Image from 'next/image';

interface PartnerStripProps {
  title: string;
}

const partners = [
  { name: 'Vimenti', logo: '/partners/vimenti.webp', width: 120, height: 48 },
  { name: 'Project Makers', logo: '/partners/project-makers.webp', width: 120, height: 48 },
  { name: 'IDJ', logo: '/partners/idj.webp', width: 100, height: 48 },
  { name: 'Goodwill / Excel Center', logo: null, width: 0, height: 0 },
  { name: 'PSI', logo: '/partners/psi.svg', width: 100, height: 48 },
];

export default function PartnerStrip({ title }: PartnerStripProps) {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-oasis-navy md:text-3xl">
          {title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
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
