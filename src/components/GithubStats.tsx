'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NeubrutalismCard from './NeubrutalismCard';
import { IconStar, IconCode, IconDatabase } from './Icons';

const repos = [
  { name: 'CampusBridge', stars: 12, forks: 5, lang: 'TypeScript' },
  { name: 'UniMovie', stars: 8, forks: 3, lang: 'JavaScript' },
  { name: 'Dalley-Cafe-Voucher', stars: 6, forks: 2, lang: 'TypeScript' },
  { name: 'conso-web-ide', stars: 15, forks: 4, lang: 'Python' },
  { name: 'PLM-Enrolment-System', stars: 4, forks: 1, lang: 'Java' },
];

const languages = [
  { name: 'TypeScript', percent: 35, color: '#3178c6' },
  { name: 'JavaScript', percent: 25, color: '#f7df1e' },
  { name: 'Python', percent: 20, color: '#3776ab' },
  { name: 'Java', percent: 10, color: '#b07219' },
  { name: 'Other', percent: 10, color: '#666' },
];

const GithubStats: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Top Repos */}
          <NeubrutalismCard color="pink">
          <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2">
            <IconStar size={18} /> Top Repos
          </h3>
          <div className="space-y-3">
            {repos.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between border-2 border-[#1a1a1a] px-3 py-2"
              >
                <span className="font-bold text-sm truncate mr-2">
                  {r.name}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono bg-[#1a1a1a] text-white px-1.5 py-0.5">
                    {r.lang}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1">
                    <IconStar size={12} /> {r.stars}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1">
                    <IconCode size={12} /> {r.forks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </NeubrutalismCard>

        {/* Language breakdown */}
          <NeubrutalismCard color="cyan">
          <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2">
            <IconDatabase size={18} /> Languages
          </h3>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>{lang.name}</span>
                  <span>{lang.percent}%</span>
                </div>
                <div className="w-full h-3 border-[2px] border-[#1a1a1a] bg-white">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </NeubrutalismCard>
      </motion.div>
    </div>
  );
};

export default GithubStats;