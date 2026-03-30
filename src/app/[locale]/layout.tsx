import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';

export const metadata: Metadata = {
  title: 'OASIS 360 — Un Lugar de Oportunidad',
  description:
    'OASIS 360 conecta a residentes de San Juan (00923/00924) con empleo de calidad, formación, emprendimiento, cuido y apoyo familiar.',
  openGraph: {
    title: 'OASIS 360 — Un Lugar de Oportunidad',
    description:
      'Empleo, emprendimiento y apoyo familiar en San Juan, Puerto Rico.',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="geo.region" content="PR" />
        <meta name="geo.placename" content="San Juan, Villa Prades" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-nav">
            {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
