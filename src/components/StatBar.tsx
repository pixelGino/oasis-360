'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: Stat[];
}

export default function StatBar({ stats }: StatBarProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-oasis-teal-light py-10 sm:py-12 md:py-16"
      aria-label="Key statistics"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-10 sm:gap-8 sm:px-12 md:grid-cols-4 md:gap-12 md:px-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
          >
            <span className="text-2xl font-extrabold text-oasis-navy sm:text-3xl md:text-4xl lg:text-5xl">
              {stat.value}
            </span>
            <span className="mt-1 text-xs font-medium text-oasis-navy/70 sm:mt-2 sm:text-sm md:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
