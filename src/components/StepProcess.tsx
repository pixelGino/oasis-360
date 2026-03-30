type BrandColor = 'gold' | 'coral' | 'teal' | 'purple' | 'navy';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepProcessProps {
  steps: Step[];
  color: BrandColor;
}

const circleBgMap: Record<BrandColor, string> = {
  gold: 'bg-oasis-gold text-oasis-navy',
  coral: 'bg-oasis-coral text-white',
  teal: 'bg-oasis-teal text-white',
  purple: 'bg-oasis-purple text-white',
  navy: 'bg-oasis-navy text-white',
};

const lineBgMap: Record<BrandColor, string> = {
  gold: 'bg-oasis-gold/30',
  coral: 'bg-oasis-coral/30',
  teal: 'bg-oasis-teal/30',
  purple: 'bg-oasis-purple/30',
  navy: 'bg-oasis-navy/30',
};

export default function StepProcess({ steps, color }: StepProcessProps) {
  return (
    <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4" role="list">
      {steps.map((step, index) => (
        <li key={step.number} className="relative flex flex-col items-center text-center">
          {/* Connecting line (desktop only, between steps) */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-6 left-[calc(50%+28px)] hidden h-0.5 w-[calc(100%-56px)] md:block ${lineBgMap[color]}`}
              aria-hidden="true"
            />
          )}

          {/* Number circle */}
          <div
            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${circleBgMap[color]}`}
            aria-hidden="true"
          >
            {step.number}
          </div>

          {/* Title */}
          <h4 className="mt-4 text-base font-bold text-oasis-navy">
            {step.title}
          </h4>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-oasis-navy/70">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
