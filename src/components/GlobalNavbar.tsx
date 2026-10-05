'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRight, FaBars, FaHouse, FaXmark } from 'react-icons/fa6';
import { ThemeToggleButton } from '@/components/PortfolioMotionLayer';

const items = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Toolkit', href: '/#skills' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === '/';

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
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === '/' && index === 0 ? 'active' : ''}
              data-cursor
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="global-actions">
          <ThemeToggleButton />
          <Link className="global-cta" href={isHome ? '#contact' : '/#contact'} data-cursor>
            Let&apos;s talk <FaArrowRight />
          </Link>
          <button
            className="global-menu"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="global-mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {open ? <FaXmark /> : <FaBars />}
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
          >
            <div className="container global-mobile-nav-inner">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  data-cursor
                >
                  <FaHouse /> {item.label}
                </Link>
              ))}
              <Link
                href="/Contact"
                onClick={() => setOpen(false)}
                className="mobile-profile-link"
                data-cursor
              >
                Open full profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
