'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NeubrutalismCard, { type NbColor } from './NeubrutalismCard';

type Exp = {
  period: string;
  title: string;
  company: string;
  desc: string;
  side: 'left' | 'right';
  color: NbColor;
};

const experiences: Exp[] = [
  {
    period: 'Feb 2026 – May 2026',
    title: 'Outlet Service Crew',
    company: 'Geprekin Aja — South Tangerang',
    desc: 'Delivered 150+ daily orders with speed and precision. Achieved 20% increase in average transaction value through upselling. Operated POS with 100% cash accuracy. Maintained 90%+ customer satisfaction score.',
    side: 'left',
    color: 'pink',
  },
  {
    period: 'Jan 2025 – Present',
    title: 'Data Entry Specialist',
    company: 'Freelance — Remote',
    desc: 'Built multi-layer verification workflows achieving near-zero error rates. Produced daily/weekly analytical reports using Advanced Excel, Google Sheets, and SQL. Restructured disorganized spreadsheets, cutting analysis time from hours to minutes.',
    side: 'right',
    color: 'cyan',
  },
  {
    period: 'Jul 2024 – Dec 2024',
    title: 'Human Resources Intern',
    company: 'Solid Gold — Jakarta',
    desc: 'Achieved 100% regulatory compliance in personnel data protection. Facilitated 20+ internship placements. Boosted D&I participation by 35%. Mediated 15+ employee disputes. Digitized HR administrative processes.',
    side: 'left',
    color: 'yellow',
  },
  {
    period: 'Jan 2024 – Jun 2024',
    title: 'Admin & Operations Support Officer',
    company: 'J&T Express — Indonesia',
    desc: 'Managed 500+ daily data entries with 99.5% inventory accuracy. Accelerated data entry speed by 30%. Resolved 50+ daily communication challenges as primary operational liaison. Recognized for highest task completion rate.',
    side: 'right',
    color: 'purple',
  },
  {
    period: 'Jan 2024 – Jun 2024',
    title: 'Service & Sales Consultant',
    company: 'WAKI Indonesia — Tangerang',
    desc: 'Drove 25% increase in team sales conversion through consultative selling. Transformed 30+ complaints into loyal repeat buyers. Mentored 5+ new hires. Earned highest service rating in branch.',
    side: 'left',
    color: 'lime',
  },
  {
    period: 'Jul 2023 – Dec 2023',
    title: 'F&B Service Associate',
    company: 'Summarecon Serpong Mall — Tangerang',
    desc: 'Delivered memorable dining experiences to 100+ guests daily. Achieved 15% increase in average check value through upselling. Operated POS with 100% accuracy. Collaborated seamlessly with kitchen and bar teams.',
    side: 'right',
    color: 'orange',
  },
];

const timelineColors: NbColor[] = ['pink', 'cyan', 'yellow', 'purple', 'lime', 'orange'];
const connectorColors = [
  'bg-nb-pink',
  'bg-nb-cyan',
  'bg-nb-yellow',
  'bg-nb-purple',
  'bg-nb-lime',
  'bg-nb-orange',
];

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative">
        {/* center line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-nb-black" />

        {experiences.map((exp, i) => {
          const colorKey = timelineColors[i % timelineColors.length];
          const isLeft = exp.side === 'left';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex items-start mb-12 last:mb-0"
            >
              {/* timeline dot — visible on md+ */}
              <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 w-5 h-5 rounded-full border-[3px] border-nb-black bg-nb-cream items-center justify-center">
                <div
                  className={`w-2 h-2 rounded-full ${connectorColors[i % connectorColors.length]}`}
                />
              </div>

              {/* content row */}
              <div className="w-full md:w-1/2 flex">
                {/* left side content */}
                {isLeft && (
                  <div className="w-full md:pr-12">
                    <NeubrutalismCard color={colorKey} className="w-full">
                      <PeriodBadge period={exp.period} color={colorKey} />
                      <h3 className="text-xl font-black uppercase leading-tight">{exp.title}</h3>
                      <p className="text-sm font-bold mt-1 opacity-70">{exp.company}</p>
                      <p className="text-sm font-medium mt-3 leading-relaxed opacity-80">
                        {exp.desc}
                      </p>
                    </NeubrutalismCard>
                  </div>
                )}

                {/* right side content */}
                {!isLeft && <div className="hidden md:block w-full" />}
              </div>

              <div className="hidden md:block w-1/2" />

              {/* right side */}
              {!isLeft && (
                <div className="w-full md:w-1/2 md:pl-12 -ml-0 md:ml-0">
                  <NeubrutalismCard color={colorKey} className="w-full">
                    <PeriodBadge period={exp.period} color={colorKey} />
                    <h3 className="text-xl font-black uppercase leading-tight">{exp.title}</h3>
                    <p className="text-sm font-bold mt-1 opacity-70">{exp.company}</p>
                    <p className="text-sm font-medium mt-3 leading-relaxed opacity-80">
                      {exp.desc}
                    </p>
                  </NeubrutalismCard>
                </div>
              )}

              {/* mobile fallback */}
              {isLeft && (
                <div className="block md:hidden w-full -ml-0 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${connectorColors[i % connectorColors.length]}`}
                    />
                    <span className="text-xs font-bold font-mono">{exp.period}</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const PeriodBadge: React.FC<{ period: string; color: NbColor }> = ({ period, color }) => {
  const badgeBorderMap: Record<NbColor, string> = {
    pink: 'border-nb-pink',
    cyan: 'border-nb-cyan',
    yellow: 'border-nb-yellow',
    lime: 'border-nb-lime',
    purple: 'border-nb-purple',
    orange: 'border-nb-orange',
    black: 'border-nb-black',
  };

  return (
    <span
      className={`inline-block text-xs font-black font-mono uppercase tracking-wider mb-3 border-b-[3px] pb-1 ${badgeBorderMap[color] || 'border-nb-black'}`}
    >
      {period}
    </span>
  );
};

export default ExperienceTimeline;