'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const programKeys = [
    'mejorEmpleo',
    'emprendimiento',
    'comunidadDeCuidado',
    'navegadorFamiliar',
    'empoderados',
    'other',
  ] as const;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="mx-auto max-w-2xl rounded-xl bg-oasis-teal-light p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4 text-5xl" aria-hidden="true">
          &#10003;
        </div>
        <h3 className="text-2xl font-bold text-oasis-navy">
          {t('successTitle')}
        </h3>
        <p className="mt-2 text-lg text-oasis-navy/70">
          {t('successText')}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6"
      noValidate={false}
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-semibold text-oasis-navy"
        >
          {t('nameLabel')} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder={t('namePlaceholder')}
          aria-required="true"
          className="w-full rounded-lg border border-oasis-navy/20 bg-white px-4 py-3 text-oasis-navy placeholder:text-oasis-navy/40 transition-shadow duration-200 focus:border-oasis-purple focus:outline-none focus:ring-2 focus:ring-oasis-purple/30"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-semibold text-oasis-navy"
        >
          {t('emailLabel')} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          aria-required="true"
          className="w-full rounded-lg border border-oasis-navy/20 bg-white px-4 py-3 text-oasis-navy placeholder:text-oasis-navy/40 transition-shadow duration-200 focus:border-oasis-purple focus:outline-none focus:ring-2 focus:ring-oasis-purple/30"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-semibold text-oasis-navy"
        >
          {t('phoneLabel')}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder={t('phonePlaceholder')}
          className="w-full rounded-lg border border-oasis-navy/20 bg-white px-4 py-3 text-oasis-navy placeholder:text-oasis-navy/40 transition-shadow duration-200 focus:border-oasis-purple focus:outline-none focus:ring-2 focus:ring-oasis-purple/30"
        />
      </div>

      {/* Program of Interest */}
      <div>
        <label
          htmlFor="contact-program"
          className="mb-1.5 block text-sm font-semibold text-oasis-navy"
        >
          {t('programLabel')}
        </label>
        <select
          id="contact-program"
          name="program"
          defaultValue=""
          className="w-full rounded-lg border border-oasis-navy/20 bg-white px-4 py-3 text-oasis-navy transition-shadow duration-200 focus:border-oasis-purple focus:outline-none focus:ring-2 focus:ring-oasis-purple/30"
        >
          <option value="" disabled>
            {t('programPlaceholder')}
          </option>
          {programKeys.map((key) => (
            <option key={key} value={key}>
              {t(`programOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-oasis-navy"
        >
          {t('messageLabel')} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          aria-required="true"
          className="w-full resize-y rounded-lg border border-oasis-navy/20 bg-white px-4 py-3 text-oasis-navy placeholder:text-oasis-navy/40 transition-shadow duration-200 focus:border-oasis-purple focus:outline-none focus:ring-2 focus:ring-oasis-purple/30"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full rounded-full bg-oasis-gold px-8 py-4 text-base font-semibold text-oasis-navy shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-oasis-gold focus:ring-offset-2 sm:w-auto"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
}
