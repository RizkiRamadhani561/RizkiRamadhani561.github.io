'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaArrowRight, FaCode, FaGithub } from 'react-icons/fa6';
import projects from '@/data/projects';

const filters = ['ALL', 'FULL STACK', 'WEB', 'AUTOMATION', 'UI/UX'];

export default function ArchivePage() {
  const [filter, setFilter] = useState('ALL');

  const visible = useMemo(() => {
    if (filter === 'ALL') return projects;
    return projects.filter((project) => {
      const value = project.category.toLowerCase();
      if (filter === 'FULL STACK') return value.includes('full stack');
      if (filter === 'WEB') return value.includes('web') || value.includes('e-commerce');
      if (filter === 'AUTOMATION') return value.includes('automation') || value.includes('ai');
      return value.includes('ui/ux');
    });
  }, [filter]);

  return (
    <main className="route-page">
      <section className="container archive-route">
        <div className="route-title-card archive-title">
          <span className="section-index">ARCHIVE / PROJECTS</span>
          <h1>Everything I&apos;ve <span>built.</span></h1>
          <p>A complete project shelf using the same bright, high-contrast design system as the homepage.</p>
        </div>

        <div className="archive-toolbar">
          <div className="archive-filter-row">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? 'archive-filter active' : 'archive-filter'}
                onClick={() => setFilter(item)}
                data-cursor
              >
                {item}
              </button>
            ))}
          </div>
          <a
            href="https://github.com/RizkiRamadhani561?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="archive-github"
            data-cursor
          >
            GitHub <FaGithub />
          </a>
        </div>

        <motion.div layout className="archive-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.a
                layout
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="archive-card"
                initial={{ opacity: 0, y: 18, scale: .98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: .97 }}
                transition={{ duration: .3 }}
                whileHover={{ y: -7 }}
                data-cursor
              >
                <div className="archive-card-top">
                  <span>{project.number}</span>
                  <FaArrowRight />
                </div>
                <div className="archive-card-icon"><FaCode /></div>
                <small>{project.category}</small>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="archive-tech">
                  {project.techstack.map((tech) => (
                    <span key={tech}>{tech.split('/').pop()?.replace('.svg', '')}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
