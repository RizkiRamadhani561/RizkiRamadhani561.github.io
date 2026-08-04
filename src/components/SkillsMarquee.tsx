'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  IconChartBar,
  IconClipboard,
  IconDatabase,
  IconKeyboard,
  IconCreditCard,
  IconPalette,
  IconBriefcaseMini,
  IconHandshake,
  IconTrendingUp,
  IconShield,
  IconUsers,
  IconPackage,
  IconCode,
  IconGlobe,
  IconLayers,
  IconZap,
  IconRocket,
} from '@/components/Icons';

const skills = [
  { name: 'Excel & Pivot Tables', icon: <IconChartBar size={18} /> },
  { name: 'Google Sheets', icon: <IconClipboard size={18} /> },
  { name: 'SQL', icon: <IconDatabase size={18} /> },
  { name: 'Data Entry', icon: <IconKeyboard size={18} /> },
  { name: 'POS Systems', icon: <IconCreditCard size={18} /> },
  { name: 'Figma', icon: <IconPalette size={18} /> },
  { name: 'Microsoft Office', icon: <IconBriefcaseMini size={18} /> },
  { name: 'Guest Service', icon: <IconHandshake size={18} /> },
  { name: 'Upselling', icon: <IconTrendingUp size={18} /> },
  { name: 'Conflict Resolution', icon: <IconShield size={18} /> },
  { name: 'Team Training', icon: <IconUsers size={18} /> },
  { name: 'Inventory Control', icon: <IconPackage size={18} /> },
  { name: 'TypeScript', icon: <IconCode size={18} /> },
  { name: 'React & Next.js', icon: <IconGlobe size={18} /> },
  { name: 'PHP & CodeIgniter', icon: <IconDatabase size={18} /> },
  { name: 'Python', icon: <IconZap size={18} /> },
  { name: 'Git & GitHub', icon: <IconLayers size={18} /> },
  { name: 'Tailwind CSS', icon: <IconRocket size={18} /> },
];

const SkillsMarquee: React.FC = () => {
  const doubled = [...skills, ...skills];

  return (
    <div className="overflow-hidden border-y-[3px] border-nb-black py-4 bg-nb-cream">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-2 border-[3px] border-nb-black bg-nb-white font-bold text-sm uppercase tracking-wide shadow-[3px_3px_0_0_var(--nb-black)] whitespace-nowrap"
          >
            <span className="text-nb-black">{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsMarquee;