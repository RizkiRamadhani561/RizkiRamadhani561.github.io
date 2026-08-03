'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NeubrutalismCard from './NeubrutalismCard';

const achievements = [
  {
    title: 'Hackathon Finalist',
    desc: 'Top 10 at Campus Digital Fest 2025 — built full-stack solution in 24h',
    color: 'pink' as const,
  },
  {
    title: 'Data Entry Excellence',
    desc: '99.8% accuracy rate across 10K+ records processed in 2024',
    color: 'cyan' as const,
  },
  {
    title: 'HR Innovation Award',
    desc: 'Automated intern onboarding workflow reducing admin time by 40%',
    color: 'yellow' as const,
  },
  {
    title: 'Open Source Contributor',
    desc: 'Active contributions across 5+ open source repositories',
    color: 'lime' as const,
  },
  {
    title: 'D&I Champion',
    desc: 'Spearheaded diversity & inclusion initiatives reaching 500+ employees',
    color: 'orange' as const,
  },
  {
    title: 'Certified Frontend Dev',
    desc: 'Professional certification in modern web development (React/Next.js)',
    color: 'purple' as const,
  },
];

const Achievements: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <NeubrutalismCard color={a.color} className="h-full flex flex-col">
              <div className="w-10 h-10 mb-3 border-[3px] border-nb-black flex items-center justify-center text-nb-black bg-nb-white">
                <AchievementIcon index={i} />
              </div>
              <h3 className="font-black text-sm uppercase mb-1">{a.title}</h3>
              <p className="text-xs font-medium opacity-70 leading-relaxed">
                {a.desc}
              </p>
            </NeubrutalismCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AchievementIcon: React.FC<{ index: number }> = ({ index }) => {
  const icons = [
    <svg key="trophy" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 6 6 9z" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C18 4 18 6 18 9z" />
      <path d="M6 9v1c0 3.3 2.7 6 6 6s6-2.7 6-6V9" />
      <path d="M12 16v3" />
      <path d="M8 22h8" />
      <path d="M12 19v3" />
    </svg>,
    <svg key="target" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>,
    <svg key="zap" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    <svg key="globe" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    <svg key="heart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>,
    <svg key="star" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
};

export default Achievements;