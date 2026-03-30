interface PartnerStripProps {
  title: string;
}

const partners = [
  'Vimenti',
  'Project Makers',
  'IDJ',
  'Goodwill / Excel Center',
  'PSI',
];

export default function PartnerStrip({ title }: PartnerStripProps) {
  return (
    <section className="w-full bg-oasis-gray py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-oasis-navy md:text-3xl">
          {title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <span
              key={partner}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-oasis-navy shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
