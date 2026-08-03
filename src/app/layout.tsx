'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { gilroy } from '@/fonts/fonts';
import { VscHome, VscArchive, VscAccount } from 'react-icons/vsc';
import { IconMenu, IconX, IconGitHub, IconLinkedIn, IconMail } from '@/components/Icons';

const items = [
  { icon: <VscHome size={18} />, label: 'Home', href: '/', onClick: () => {} },
  {
    icon: <VscArchive size={18} />,
    label: 'Archive',
    href: '/Archive',
    onClick: () => {},
  },
  {
    icon: <VscAccount size={18} />,
    label: 'Profile',
    href: '/Contact',
    onClick: () => {},
  },
];


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenis.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.current?.destroy();
      };
    }
  }, []);

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gilroy.variable} antialiased font-gilroy bg-nb-cream text-nb-black`}
        style={{ cursor: 'none' }}
      >
        {/* Custom cursor — nb-black */}
        <motion.div
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

        {/* Header */}
        <header className="sticky top-0 z-50 flex w-full items-center justify-between px-6 py-3 md:px-10 md:py-4 bg-nb-cream/95 backdrop-blur-sm border-b-[3px] border-nb-black">
          <Link href="/" passHref className="flex items-center gap-3 group">
            <Image
              src="/logo/favicon-32x32.png"
              alt="R Logo"
              width={36}
              height={36}
              className="transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12"
            />
            <span className="hidden sm:inline font-black text-lg uppercase tracking-tight">Rizki R.</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-2">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 font-bold text-sm uppercase border-2 border-nb-black bg-nb-cream hover:bg-nb-black hover:text-nb-cream transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[3px_3px_0px_#1a1a1a]"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden border-2 border-nb-black p-2 bg-nb-cream hover:bg-nb-black hover:text-nb-cream transition-all duration-200 shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-nb-cream/98 backdrop-blur-sm fixed top-[60px] right-0 left-0 z-40 p-6 overflow-y-auto h-[calc(100vh-60px)] border-b-[3px] border-nb-black">
            <nav className="flex flex-col space-y-3 pt-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-nb-black hover:bg-nb-black hover:text-nb-cream py-3 px-5 font-black text-lg uppercase border-2 border-nb-black transition-all shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {children}

        {/* Sticky Socials — neubrutalism style */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-nb-cream border-2 border-nb-black rounded-full p-2 md:p-3 flex flex-col items-center space-y-4 shadow-[3px_3px_0px_#1a1a1a]">
          <Link
            href="https://github.com/RizkiRamadhani561"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-125 p-1"
          >
            <IconGitHub size={22} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/m-rizki-ramadhani"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-125 p-1"
          >
            <IconLinkedIn size={22} />
          </Link>
          <Link
            href="mailto:ramscool98@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-125 p-1"
          >
            <IconMail size={22} />
          </Link>
        </div>
      </body>
    </html>
  );
}