'use client';

import React from 'react';
import BlurText from '@/blocks/TextAnimations/BlurText/BlurText';
import TrueFocus from '@/blocks/TextAnimations/TrueFocus/TrueFocus';
import Threads from '@/blocks/Backgrounds/Threads/Threads';
import ScrollVelocity from '@/blocks/TextAnimations/ScrollVelocity/ScrollVelocity';
import ProfileCard from '@/blocks/Components/ProfileCard/ProfileCard';
import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillTag from '@/components/SkillTag';
import ProjectCard from '@/components/ProjectCard';
import NeubrutalismCard from '@/components/NeubrutalismCard';
import SkillsMarquee from '@/components/SkillsMarquee';
import Achievements from '@/components/Achievements';
import {
  IconBolt,
  IconCode,
  IconUser,
  IconBriefcase,
  IconStar,
  IconDatabase,
  IconGlobe,
  IconTrophy,
  IconHeart,
  IconTarget,
  IconRocket,
  IconBookOpen,
  IconAward,
  IconZap,
  IconMapPin,
  IconPhone,
  IconMail,
  IconLink,
} from '@/components/Icons';
import projects from '@/data/projects';

const serviceSkills = [
  'Front Office Operations',
  'Guest Experience & Service',
  'Consultative Selling',
  'Upselling & Cross-selling',
  'Conflict Resolution',
  'Team Training & Mentoring',
  'Fast-Paced Service Excellence',
];

const dataSkills = [
  'Advanced Excel (Pivot, VLOOKUP)',
  'Google Sheets',
  'Data Entry & Processing',
  'SQL (SELECT, INSERT, UPDATE)',
  'Document Administration',
  'Figma',
  'Active Directory',
  'Microsoft Office Suite',
  'Fast & Accurate Typing',
  'Inventory & Stock Control',
];

const devSkills = [
  'TypeScript & JavaScript',
  'React & Next.js',
  'PHP & CodeIgniter',
  'Python & FastAPI',
  'Tailwind CSS & Bootstrap',
  'MySQL & Database Design',
  'Git & GitHub',
  'HTML5 & CSS3',
  'REST API Integration',
  'Responsive Web Design',
];

const languages = [
  { name: 'Indonesian', level: 'Native (C2)', flag: '\u{1F1EE}\u{1F1E9}' },
  { name: 'English', level: 'Professional Working', flag: '\u{1F1EC}\u{1F1E7}' },
  { name: 'Arabic', level: 'Conversational', flag: '\u{1F1F8}\u{1F1E6}' },
];

const interests = ['Traveling', 'Reading', 'Community Engagement', 'Hospitality Trends'];

const handleAnimationComplete = () => {};

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 hidden md:block">
        <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
      </div>
      <main id="main-content" className="relative z-10 flex flex-col items-center pt-24 pb-10">
        {/* HERO */}
        <section className="w-full text-center relative">
          <div className="inline-flex items-center gap-2 nb-section-label bg-nb-yellow text-nb-black mb-6">
            <IconZap size={16} />
            PORTFOLIO 2026
          </div>
          <BlurText
            text="M. RIZKI RAMADHANI"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="lg:text-8xl md:text-7xl text-3xl font-black uppercase tracking-tighter"
          />
          <div className="mt-4 font-bold">
            <TrueFocus
              sentence="Front Office Enthusiast | Full-Stack Developer | Data-Driven Operations"
              manualMode={true}
              blurAmount={5}
              borderColor="cyan"
              animationDuration={0.3}
              pauseBetweenAnimations={1}
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-[3px] border-nb-black bg-nb-yellow shadow-[3px_3px_0_0_#1a1a1a]">
              <IconMapPin size={16} /> Kembangan, Jakarta Barat
            </span>
            <a
              href="https://wa.me/6285119512611"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-[3px] border-nb-black bg-nb-cream shadow-[3px_3px_0_0_#1a1a1a] hover:bg-nb-black hover:text-nb-cream hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
            >
              <IconPhone size={16} /> +62 851-1951-2611
            </a>
            <a
              href="mailto:ramscool98@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-[3px] border-nb-black bg-nb-cream shadow-[3px_3px_0_0_#1a1a1a] hover:bg-nb-black hover:text-nb-cream hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
            >
              <IconMail size={16} /> ramscool98@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/m-rizki-ramadhani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-[3px] border-nb-black bg-nb-cream shadow-[3px_3px_0_0_#1a1a1a] hover:bg-nb-black hover:text-nb-cream hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
            >
              <IconLink size={16} /> linkedin.com/in/m-rizki-ramadhani
            </a>
          </div>
        </section>

        <div className="w-full mt-10 relative h-[120px] hidden md:block border-y-[3px] border-nb-black">
          <ScrollVelocity
            texts={['M Rizki Ramadhani', 'Front Office · Data Operations · Guest Experience']}
            velocity={100}
            className="custom-scroll-text"
          />
        </div>

        {/* TOOLS & SKILLS MARQUEE */}
        <section className="w-full mt-16">
          <div className="max-w-5xl mx-auto px-4 mb-6">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-pink text-nb-white">
              <IconBolt size={16} />
              TOOLS & SKILLS
            </span>
          </div>
          <SkillsMarquee />
        </section>

        {/* ABOUT & LANGUAGES */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconUser size={16} />
              ABOUT ME
            </span>
            <div className="nb-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeubrutalismCard color="yellow">
              <p className="text-base leading-relaxed font-medium">
                Detail-oriented hospitality and data operations professional with a strong foundation
                in guest-facing service, data management, and administrative excellence. Currently
                pursuing a Diploma in Information Management at Politeknik LP3I Jakarta, combining
                analytical precision with genuine hospitality DNA honed across restaurant, retail,
                logistics, and corporate environments. Proven track record of elevating guest
                satisfaction, streamlining workflows, and delivering measurable results — 99%+ data
                accuracy, 40% faster reporting, and 25% higher sales conversion.
              </p>
            </NeubrutalismCard>
            <NeubrutalismCard color="cyan">
              <h3 className="font-black text-lg uppercase mb-4 inline-flex items-center gap-2">
                <IconGlobe size={20} />
                Languages
              </h3>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between border-2 border-nb-black px-4 py-2 bg-nb-white"
                  >
                    <span className="font-bold text-sm">
                      {lang.flag} {lang.name}
                    </span>
                    <span className="text-xs font-mono bg-nb-black text-nb-white px-2 py-0.5">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </NeubrutalismCard>
          </div>
        </section>

        {/* SKILLSET */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconCode size={16} />
              SKILLSET
            </span>
            <div className="nb-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeubrutalismCard color="pink">
              <h3 className="font-black text-lg uppercase mb-1 inline-flex items-center gap-2">
                <IconRocket size={20} />
                Front Office & Service
              </h3>
              <p className="text-sm font-medium opacity-70 mb-4">
                Guest-facing service professional delivering warm, accurate, and solution-first
                experiences in high-traffic hospitality and retail environments.
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceSkills.map((skill) => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </NeubrutalismCard>
            <NeubrutalismCard color="lime">
              <h3 className="font-black text-lg uppercase mb-1 inline-flex items-center gap-2">
                <IconDatabase size={20} />
                Data & Admin
              </h3>
              <p className="text-sm font-medium opacity-70 mb-4">
                Data-driven operations professional proficient in data processing, office software,
                SQL, and audit-ready documentation workflows.
              </p>
              <div className="flex flex-wrap gap-2">
                {dataSkills.map((skill) => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </NeubrutalismCard>
          </div>
        </section>

        {/* CONTACT */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconHeart size={16} />
              CONTACT
            </span>
            <div className="nb-divider" />
          </div>
          <div className="hidden md:flex justify-center">
            <ProfileCard
              name="M Rizki Ramadhani"
              title="Front Office & Data Operations"
              handle="rizkiramadhani"
              status="Open to Opportunities"
              grainUrl="/photos/texture/grain.webp"
              iconUrl="/photos/texture/iconpattern.png"
              contactText="Connect on LinkedIn"
              avatarUrl="/photos/profile/profilecard_2.svg"
              miniAvatarUrl="/photos/profile/profilecard_2.svg"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() =>
                window.open('https://www.linkedin.com/in/m-rizki-ramadhani', '_blank')
              }
            />
          </div>
          <div className="md:hidden flex justify-center">
            <ProfileCard
              name="M Rizki Ramadhani"
              title="Front Office & Data Operations"
              handle="rizkiramadhani"
              status="Open to Opportunities"
              grainUrl="/photos/texture/grain.webp"
              iconUrl="/photos/texture/iconpattern.png"
              contactText="Connect on LinkedIn"
              avatarUrl="/photos/profile/profilecard.svg"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() =>
                window.open('https://www.linkedin.com/in/m-rizki-ramadhani', '_blank')
              }
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="w-full mt-20">
          <div className="max-w-5xl mx-auto px-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
                <IconBriefcase size={16} />
                MY JOURNEY
              </span>
              <div className="nb-divider" />
            </div>
          </div>
          <ExperienceTimeline />
        </section>

        {/* EDUCATION */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconBookOpen size={16} />
              EDUCATION
            </span>
            <div className="nb-divider" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <NeubrutalismCard color="cyan">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h3 className="text-xl font-black uppercase">Diploma in Information Management</h3>
                <span className="text-xs font-black font-mono bg-nb-black text-nb-white px-3 py-1 inline-block w-fit">
                  Sep 2024 – Present
                </span>
              </div>
              <p className="text-base font-bold opacity-80">Politeknik LP3I Jakarta</p>
              <p className="text-sm font-medium mt-2 opacity-70 leading-relaxed">
                Combining analytical precision with hospitality DNA — building expertise in data management, 
                information systems, and administrative operations to support modern hospitality workflows.
              </p>
            </NeubrutalismCard>
          </motion.div>
        </section>

        {/* DEVELOPMENT SKILLS */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconStar size={16} />
              DEVELOPMENT SKILLS
            </span>
            <div className="nb-divider" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <NeubrutalismCard color="purple">
              <h3 className="font-black text-lg uppercase mb-1 inline-flex items-center gap-2">
                <IconCode size={20} />
                Programming & Web Development
              </h3>
              <p className="text-sm font-medium opacity-70 mb-4">
                Full-stack developer building scalable web applications with modern frameworks, clean code practices, and responsive design.
              </p>
              <div className="flex flex-wrap gap-2">
                {devSkills.map((skill) => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </NeubrutalismCard>
          </motion.div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="w-full mt-20">
          <div className="max-w-5xl mx-auto px-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
                <IconTrophy size={16} />
                ACHIEVEMENTS
              </span>
              <div className="nb-divider" />
            </div>
          </div>
          <Achievements />
        </section>

        {/* INTERESTS */}
        <section className="w-full max-w-5xl mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconTarget size={16} />
              INTERESTS
            </span>
            <div className="nb-divider" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {interests.map((interest) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <NeubrutalismCard color="orange" className="px-6 py-3">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <IconBookOpen size={16} />
                    {interest}
                  </span>
                </NeubrutalismCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="w-full max-w-[1400px] mx-auto px-4 mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 nb-section-label bg-nb-white">
              <IconAward size={16} />
              PROJECTS
            </span>
            <div className="nb-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t-[3px] border-nb-black bg-nb-cream py-6 text-center text-sm font-bold">
        <p>&copy; {new Date().getFullYear()} M Rizki Ramadhani. All rights reserved.</p>
      </footer>
    </>
  );
}