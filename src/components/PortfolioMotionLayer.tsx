'use client';

import Lenis from 'lenis';
import { motion, useMotionValue, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaArrowUp, FaHouse, FaFolderOpen, FaUser, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';

export function PortfolioMotionLayer() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { damping: 22, stiffness: 220 });
  const dotY = useSpring(cursorY, { damping: 22, stiffness: 220 });
  const ringX = useSpring(dotX, { damping: 34, stiffness: 360 });
  const ringY = useSpring(dotY, { damping: 34, stiffness: 360 });
  const ringScale = useSpring(1, { damping: 20, stiffness: 240 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setLoading(false);
      return;
    }
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('a, button, [data-cursor]')) ringScale.set(1.55);
    };
    const onOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('a, button, [data-cursor]')) ringScale.set(1);
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [cursorX, cursorY, ringScale, reduceMotion]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!revealNodes.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -30px' },
    );
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {loading && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
        >
          <div className="loader-card">
            <div className="loader-brand"><span>RR</span><b>RIZKI RAMADHANI</b></div>
            <p>INITIALIZING PORTFOLIO<span className="loader-dots" /></p>
            <div className="loader-track">
              <motion.div
                className="loader-bar"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.85, ease: 'easeInOut' }}
              />
            </div>
            <small>BUILD / DATA / OPERATIONS</small>
          </div>
        </motion.div>
      )}

      {!reduceMotion && (
        <>
          <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} aria-hidden="true" />
          <motion.div className="cursor-ring" style={{ x: ringX, y: ringY, scale: ringScale }} aria-hidden="true" />
        </>
      )}

      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <div className="floating-dock" aria-label="Quick navigation">
        <a href="#home" data-cursor aria-label="Home"><FaHouse /></a>
        <a href="#work" data-cursor aria-label="Work"><FaFolderOpen /></a>
        <a href="#about" data-cursor aria-label="About"><FaUser /></a>
        <a href="#contact" data-cursor aria-label="Contact"><FaEnvelope /></a>
      </div>

      <div className="social-rail" aria-label="Social links">
        <a href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer" data-cursor aria-label="GitHub"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/m-rizki-ramadhani" target="_blank" rel="noreferrer" data-cursor aria-label="LinkedIn"><FaLinkedin /></a>
      </div>

      {showTop && (
        <motion.button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          data-cursor
          aria-label="Back to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
}

export function ThemeToggleButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('rizki-theme');
    const initial = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem('rizki-theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <button className="theme-button" onClick={toggle} data-cursor aria-label="Toggle color theme">
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
