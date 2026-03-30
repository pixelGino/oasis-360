'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface ProgramItem {
  slug: string;
  name: string;
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const isEs = locale === 'es';

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---------- Scroll detection ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- Lock body scroll when mobile menu is open ----------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ---------- Close desktop dropdown on outside click ----------
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ---------- Close desktop dropdown on Escape ----------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ---------- Programs data ----------
  const programs: ProgramItem[] = isEs
    ? [
        { slug: 'mejor-empleo', name: 'Mejor Empleo para M\u00ed' },
        { slug: 'emprendimiento', name: 'Emprendimiento E3' },
        { slug: 'comunidad-de-cuidado', name: 'Comunidad de Cuidado' },
        { slug: 'navegador-familiar', name: 'Navegador Familiar' },
        { slug: 'empoderados', name: 'Empoderados para el Empleo' },
      ]
    : [
        { slug: 'better-jobs', name: 'Better Jobs for Me' },
        { slug: 'entrepreneurship', name: 'E3 Entrepreneurship' },
        { slug: 'caring-community', name: 'Caring Community' },
        { slug: 'family-navigator', name: 'Family Navigator' },
        { slug: 'empowered', name: 'Empowered for Employment' },
      ];

  const programsBasePath = isEs ? `/${locale}/programas` : `/${locale}/programs`;

  // ---------- Nav links config ----------
  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/${isEs ? 'el-hub' : 'the-hub'}`, label: t('hub') },
    { href: `/${locale}/${isEs ? 'socios' : 'partners'}`, label: t('partners') },
    { href: `/${locale}/${isEs ? 'contactanos' : 'contact'}`, label: t('contact') },
  ];

  const altLocale = isEs ? 'en' : 'es';
  const altLabel = isEs ? 'EN' : 'ES';

  // ---------- Dropdown hover helpers (desktop) ----------
  const openDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setProgramsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setProgramsOpen(false), 150);
  }, []);

  // ---------- Render helpers ----------
  const chevronDown = (
    <svg
      className={`ml-1 h-4 w-4 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const mobileChevron = (
    <svg
      className={`ml-1 h-4 w-4 transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <>
      {/* ==================== NAVBAR ==================== */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label={isEs ? 'Navegaci\u00f3n principal' : 'Main navigation'}
        >
          {/* ---------- Logo ---------- */}
          <Link
            href={`/${locale}`}
            className="relative flex shrink-0 items-center"
            aria-label="OASIS"
          >
            <Image
              src="/logoHorizontal.png"
              alt="OASIS"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* ---------- Desktop nav links ---------- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {/* Inicio */}
            <li>
              <Link
                href={navLinks[0].href}
                className="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-[#021939] transition-colors hover:text-[#FFC63E]"
              >
                {navLinks[0].label}
              </Link>
            </li>

            {/* Programas dropdown */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                onClick={() => setProgramsOpen((prev) => !prev)}
                aria-expanded={programsOpen}
                aria-haspopup="true"
                className="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-[#021939] transition-colors hover:text-[#FFC63E]"
              >
                {t('programs')}
                {chevronDown}
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute left-1/2 top-full z-50 mt-1 w-64 -translate-x-1/2 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
                  programsOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
                role="menu"
              >
                {programs.map((program) => (
                  <Link
                    key={program.slug}
                    href={`${programsBasePath}/${program.slug}`}
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm text-[#021939] transition-colors hover:bg-[#FFC63E]/10 hover:text-[#FFC63E]"
                    onClick={() => setProgramsOpen(false)}
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
            </li>

            {/* El Hub, Socios, Contactanos */}
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-[#021939] transition-colors hover:text-[#FFC63E]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ---------- Right side: lang toggle + hamburger ---------- */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <Link
              href={`/${altLocale}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#021939]/20 px-3 py-2 text-sm font-semibold text-[#021939] transition-colors hover:border-[#FFC63E] hover:text-[#FFC63E]"
              aria-label={isEs ? 'Switch to English' : 'Cambiar a Espa\u00f1ol'}
            >
              {altLabel}
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={isEs ? 'Abrir men\u00fa' : 'Open menu'}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#021939] transition-colors hover:text-[#FFC63E] lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ==================== MOBILE DRAWER ==================== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-[min(80vw,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={isEs ? 'Men\u00fa de navegaci\u00f3n' : 'Navigation menu'}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label={isEs ? 'Cerrar men\u00fa' : 'Close menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#021939] transition-colors hover:text-[#FFC63E]"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6" aria-label={isEs ? 'Men\u00fa m\u00f3vil' : 'Mobile menu'}>
          <ul className="space-y-1">
            {/* Inicio */}
            <li>
              <Link
                href={navLinks[0].href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-base font-medium text-[#021939] transition-colors hover:bg-[#FFC63E]/10 hover:text-[#FFC63E]"
              >
                {navLinks[0].label}
              </Link>
            </li>

            {/* Programas accordion */}
            <li>
              <button
                type="button"
                onClick={() => setMobileProgramsOpen((prev) => !prev)}
                aria-expanded={mobileProgramsOpen}
                className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-[#021939] transition-colors hover:bg-[#FFC63E]/10 hover:text-[#FFC63E]"
              >
                {t('programs')}
                {mobileChevron}
              </button>

              <ul
                className={`overflow-hidden transition-all duration-300 ${
                  mobileProgramsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {programs.map((program) => (
                  <li key={program.slug}>
                    <Link
                      href={`${programsBasePath}/${program.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] items-center rounded-md py-2 pr-3 pl-8 text-sm text-[#021939]/80 transition-colors hover:bg-[#FFC63E]/10 hover:text-[#FFC63E]"
                    >
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* El Hub, Socios, Contactanos */}
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-base font-medium text-[#021939] transition-colors hover:bg-[#FFC63E]/10 hover:text-[#FFC63E]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider + language link in drawer */}
          <div className="mt-6 border-t border-[#021939]/10 pt-6">
            <Link
              href={`/${altLocale}`}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center justify-center rounded-md border border-[#021939]/20 px-4 py-2 text-sm font-semibold text-[#021939] transition-colors hover:border-[#FFC63E] hover:text-[#FFC63E]"
            >
              {isEs ? 'English' : 'Espa\u00f1ol'}
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
