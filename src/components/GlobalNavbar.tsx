'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBars,
  FaBriefcase,
  FaEnvelope,
  FaHouse,
  FaRoute,
  FaToolbox,
  FaUser,
  FaXmark,
} from 'react-icons/fa6';
import { ThemeToggleButton } from '@/components/PortfolioMotionLayer';
import { selectActiveSection } from '@/lib/active-section.mjs';

const items = [
  { label: 'Home', href: '/#home', icon: FaHouse },
  { label: 'About', href: '/#about', icon: FaUser },
  { label: 'Toolkit', href: '/#skills', icon: FaToolbox },
  { label: 'Journey', href: '/#journey', icon: FaRoute },
  { label: 'Work', href: '/#work', icon: FaBriefcase },
  { label: 'Contact', href: '/#contact', icon: FaEnvelope },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isHome = pathname === '/';

  useEffect(() => {
    setOpen(false);

    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sections = items
      .map((item) => document.getElementById(item.href.split('#')[1]))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nextSection = selectActiveSection(entries);

        if (nextSection) setActiveSection(nextSection);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const renderNavLink = (item: (typeof items)[number], mobile = false) => {
    const Icon = item.icon;
    const sectionId = item.href.split('#')[1];
    const isActive = isHome && activeSection === sectionId;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={isActive ? 'active' : undefined}
        aria-current={isActive ? 'location' : undefined}
        onClick={mobile ? () => setOpen(false) : undefined}
        data-cursor
      >
        {mobile && <Icon aria-hidden="true" />}
        {item.label}
      </Link>
    );
  };

  return (
    <header className="global-navbar">
      <div className="container global-navbar-inner">
        <Link
          href="/#home"
          className="global-brand"
          aria-label="M Rizki Ramadhani — Home"
          onClick={() => setOpen(false)}
          data-cursor
        >
          <span className="global-brand-mark">RR</span>
          <span className="global-brand-name">Rizki Ramadhani</span>
        </Link>

        <nav className="global-desktop-nav" aria-label="Primary navigation">
          {items.map((item) => renderNavLink(item))}
        </nav>

        <div className="global-actions">
          <ThemeToggleButton />
          <Link className="global-cta" href={isHome ? '#contact' : '/#contact'} data-cursor>
            Let&apos;s talk <FaArrowRight aria-hidden="true" />
          </Link>
          <button
            className="global-menu"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="global-mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="global-mobile-menu"
            className="global-mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeInOut' }}
          >
            <nav className="container global-mobile-nav-inner" aria-label="Mobile navigation">
              {items.map((item) => renderNavLink(item, true))}
              <Link
                href="/Contact"
                onClick={() => setOpen(false)}
                className="mobile-profile-link"
                data-cursor
              >
                Open full profile <FaArrowRight aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
