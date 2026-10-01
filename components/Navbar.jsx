'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const NAV_ITEMS = [
  { label: 'Listings', href: '/Property' },
  { label: 'Sample', href: '/samplepreperty' },
  { label: 'Agent', href: '/agents' },
  { label: 'Services', href: '/Service' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  // Track scroll so the bar can switch to its white, on-page look
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu with the Escape key
  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavigation = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname && pathname.startsWith(href);

  // Dark + transparent ONLY at the very top of the home hero (image behind it).
  // Every other page is plain white, so the bar switches to a light theme
  // the moment you scroll, or immediately on any non-home page.
  const isHome = pathname === '/';
  const light = scrolled || isOpen || !isHome;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={[
          'mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 transition-colors duration-300 sm:px-6 lg:px-8',
          light
            ? 'bg-white/95 shadow-md shadow-slate-900/5 backdrop-blur-md border-b border-slate-200'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
        aria-label="Main"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={handleNavigation}
          className="group inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-900 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" />
            </svg>
          </span>
          <span
            className={[
              'text-lg font-extrabold tracking-wide transition-colors duration-300 md:text-xl',
              light ? 'text-slate-900' : 'text-white',
            ].join(' ')}
          >
            BUY-YOUR-<span className="text-2xl text-amber-500 md:text-3xl">D</span>REAM
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:block md:grow md:basis-0">
          <ul id="primary-navigation" className="flex items-center justify-center gap-1 lg:gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onClick={handleNavigation}
                  className={[
                    'relative block rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                    isActive(item.href)
                      ? light
                        ? 'text-amber-600'
                        : 'text-amber-400'
                      : light
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/85 hover:text-white',
                  ].join(' ')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className={[
                        'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full',
                        light ? 'bg-amber-500' : 'bg-amber-400',
                      ].join(' ')}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Auth + Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <SignedOut>
            <div className="hidden items-center gap-2 sm:flex">
              <SignInButton mode="modal">
                <button
                  className={[
                    'rounded-full border px-4 py-2 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95 md:px-5',
                    light
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      : 'border-white/30 text-white hover:bg-white/10',
                  ].join(' ')}
                  aria-label="Sign in"
                >
                  <abbr title="Sign In to your account" className="no-underline">
                    Sign In
                  </abbr>
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 shadow-md outline-none transition hover:bg-amber-400 focus-visible:ring-2 focus-visible:ring-amber-200 active:scale-95 md:px-5"
                  aria-label="Sign up"
                >
                  <abbr title="Create a new account" className="no-underline">
                    Sign Up
                  </abbr>
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9 border-2 border-amber-400 shadow-lg' } }} />
          </SignedIn>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            className={[
              'inline-flex h-10 w-10 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 md:hidden',
              light ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20',
            ].join(' ')}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile slide-over menu — light theme, matches the rest of the site */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              id="mobile-navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl ring-1 ring-slate-200"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <Link
                  href="/"
                  onClick={handleNavigation}
                  className="text-lg font-extrabold tracking-wide text-slate-900"
                >
                  BUY-YOUR-<span className="text-2xl text-amber-500">D</span>REAM
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigation}
                        className={[
                          'block rounded-xl px-4 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                          isActive(item.href)
                            ? 'bg-amber-50 text-amber-600'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                        ].join(' ')}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-2 border-t border-slate-200 pt-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-400">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full rounded-full bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-md outline-none transition hover:bg-amber-400 focus-visible:ring-2 focus-visible:ring-amber-200">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9 border-2 border-amber-400 shadow-lg' } }} />
                  </SignedIn>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;