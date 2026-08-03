'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Dock from '@/blocks/Components/Dock/Dock';
import Link from 'next/link';

import { VscHome, VscArchive, VscAccount } from 'react-icons/vsc';

const items = [
  { icon: <VscHome size={18} aria-hidden="true" />, label: 'Home', href: '/', onClick: () => {} },
  {
    icon: <VscArchive size={18} aria-hidden="true" />,
    label: 'Archive',
    href: '/Archive',
    onClick: () => {},
  },
  {
    icon: <VscAccount size={18} aria-hidden="true" />,
    label: 'Profile',
    href: '/Contact',
    onClick: () => {},
  },
];

const socialLinks = [
  {
    platform: 'GitHub',
    href: 'https://github.com/RizkiRamadhani561',
    iconPath: '/icons/github_icon.svg',
  },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/m-rizki-ramadhani',
    iconPath: '/icons/linkedin_icon.svg',
  },
  {
    platform: 'Gmail',
    href: 'mailto:261004ramadhani@gmail.com',
    iconPath: '/icons/gmail_icon.svg',
  },
];

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined') return;
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.current?.destroy();
    };
  }, [reduceMotion]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const dotSpring = { damping: 25, stiffness: 200 };
  const outlineSpring = { damping: 35, stiffness: 400 };

  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);
  const outlineX = useSpring(dotX, outlineSpring);
  const outlineY = useSpring(dotY, outlineSpring);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:bg-nb-cream focus:text-nb-black focus:px-4 focus:py-2 focus:border-2 focus:border-nb-black focus:font-bold"
      >
        Skip to content
      </a>

      {!reduceMotion && (
        <>
          {/* Custom cursor — nb-black */}
          <motion.div
            aria-hidden="true"
            style={{
              x: dotX,
              y: dotY,
              pointerEvents: 'none',
              left: 0,
              top: 0,
              position: 'fixed',
              zIndex: 9999,
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1a1a1a',
            }}
            className="hidden md:block"
          />
          <motion.div
            aria-hidden="true"
            style={{
              x: outlineX,
              y: outlineY,
              pointerEvents: 'none',
              left: 0,
              top: 0,
              position: 'fixed',
              zIndex: 9998,
              transform: 'translate(-50%, -50%)',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '2px solid #1a1a1a',
              opacity: 0.5,
            }}
            className="hidden md:block"
          />
        </>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2 md:px-8 md:py-3 bg-nb-cream/90 backdrop-blur-[3px] nb-border-b border-b-2 border-nb-black">
        <Link href="/" passHref aria-label="M Rizki Ramadhani — Home">
          <Image
            src="/logo/favicon-32x32.png"
            alt="M Rizki Ramadhani logo"
            width={35}
            height={35}
            className="m-4 md:m-10 transition-transform duration-300 hover:scale-150 hover:-rotate-12"
          />
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-nb-black p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="block h-0.5 w-6 bg-nb-black mb-1.5 transition-transform duration-300" aria-hidden="true" />
          <span className="block h-0.5 w-6 bg-nb-black mb-1.5 transition-transform duration-300" aria-hidden="true" />
          <span className="block h-0.5 w-6 bg-nb-black transition-transform duration-300" aria-hidden="true" />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-nb-cream/95 backdrop-blur-[10px] pt-10 fixed top-[72px] right-0 left-0 z-40 p-4 overflow-y-auto h-[calc(100vh-72px)] nb-border-b border-b-2 border-nb-black"
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-nb-black hover:bg-nb-black hover:text-nb-cream py-2 px-4 font-bold text-base nb-border transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {children}

      {/* Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={90}
        />
      </div>

      {/* Sticky Socials — neubrutalism style */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-nb-cream nb-border rounded-full p-2 md:p-4 flex flex-col items-center space-y-7 md:space-y-5">
        {socialLinks.map((link) => (
          <Link
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-110"
            aria-label={link.platform}
          >
            <Image
              src={link.iconPath}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
            />
          </Link>
        ))}
      </div>
    </>
  );
}