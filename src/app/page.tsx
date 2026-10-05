'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaArrowRight, FaCode, FaEnvelope, FaGithub, FaLinkedin, FaBars, FaXmark, FaTerminal } from 'react-icons/fa6';
import projects from '@/data/projects';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const skills = {
  build: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PHP', 'REST API'],
  data: ['MySQL', 'SQL', 'Excel', 'Google Sheets', 'GitHub'],
  product: ['Figma', 'Tailwind CSS', 'UI/UX', 'Customer Experience', 'Operations'],
};

const experiences = [
  {
    period: '2026',
    role: 'Outlet Service Crew',
    company: 'Geprekin Aja',
    location: 'South Tangerang',
    text: 'Handled 150+ daily orders, improved transaction value through upselling, and maintained accurate POS operations.',
  },
  {
    period: '2025 — Now',
    role: 'Data Entry Specialist',
    company: 'Freelance',
    location: 'Remote',
    text: 'Built verification workflows and recurring reports with Excel, Google Sheets, and SQL while maintaining near-zero error rates.',
  },
  {
    period: '2024',
    role: 'Human Resources Intern',
    company: 'Solid Gold',
    location: 'Jakarta',
    text: 'Supported personnel administration, internship placements, data protection, and employee engagement initiatives.',
  },
  {
    period: '2024',
    role: 'Admin & Operations Support',
    company: 'J&T Express',
    location: 'Indonesia',
    text: 'Processed 500+ daily data entries, improved entry speed, and solved high-volume communication issues across operations.',
  },
];

const filters = ['All', 'Full Stack', 'Web App', 'Automation', 'UI/UX'];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const visibleProjects = useMemo(() => {
    if (filter === 'All') return projects.slice(0, 6);
    return projects
      .filter((project) => {
        const value = project.category.toLowerCase();
        if (filter === 'Full Stack') return value.includes('full stack');
        if (filter === 'Web App') return value.includes('web');
        if (filter === 'Automation') return value.includes('automation') || value.includes('ai');
        return value.includes('ui/ux');
      })
      .slice(0, 6);
  }, [filter]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link href="#home" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">RR</span>
            <span>Rizki Ramadhani</span>
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="top-cta" href="#contact">Let&apos;s talk <FaArrowRight /></a>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="container hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Available for selected opportunities</div>
            <p className="kicker">FULL-STACK DEVELOPER / OPERATIONS</p>
            <h1>Build useful things.<br /><span>Make them work.</span></h1>
            <p className="hero-lead">
              I&apos;m <strong>M. Rizki Ramadhani</strong> — an Information Management student who combines
              web development, data discipline, and real-world service experience to create practical digital products.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">Explore my work <FaArrowRight /></a>
              <a href="#contact" className="button button-light">Start a conversation</a>
            </div>
            <div className="micro-stats">
              <div><strong>09+</strong><span>Projects</span></div>
              <div><strong>4</strong><span>Work chapters</span></div>
              <div><strong>99%</strong><span>Accuracy mindset</span></div>
            </div>
          </div>

          <div className="hero-window">
            <div className="window-bar">
              <span className="window-title"><FaTerminal /> rizki@workspace</span>
              <div className="window-dots"><i /><i /><i /></div>
            </div>
            <div className="terminal-body">
              <p><span className="terminal-muted">$</span> whoami</p>
              <h2>rizki_ramadhani</h2>
              <p><span className="terminal-muted">$</span> cat focus.txt</p>
              <div className="focus-box">
                <span>01</span><p>Interfaces that feel simple.</p>
                <span>02</span><p>Systems that stay reliable.</p>
                <span>03</span><p>Data that tells the truth.</p>
              </div>
              <p><span className="terminal-muted">$</span> status</p>
              <div className="terminal-status"><span>●</span> ONLINE / LEARNING / SHIPPING</div>
              <div className="terminal-sign">RR<span>_</span></div>
            </div>
          </div>
        </section>

        <div className="ticker">
          <div className="ticker-track">
            {['NEXT.JS', 'REACT', 'TYPESCRIPT', 'PHP', 'MYSQL', 'UI/UX', 'DATA', 'OPERATIONS', 'NEXT.JS', 'REACT', 'TYPESCRIPT', 'PHP'].map((item, i) => (
              <span key={i}>{item}<b>✦</b></span>
            ))}
          </div>
        </div>

        <section id="about" className="container section">
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <h2>A technical mind with an operational instinct.</h2>
          </div>

          <div className="bento about-grid">
            <article className="panel panel-dark about-main">
              <div className="panel-label">PROFILE.LOG</div>
              <p className="big-copy">
                I enjoy the space between <em>people, process, and technology.</em>
              </p>
              <p>
                My background in hospitality and operations taught me to care about details, speed, and
                how people actually experience a system. I bring that perspective into full-stack development.
              </p>
            </article>
            <article className="panel accent-panel">
              <span className="giant-number">01</span>
              <h3>Human first</h3>
              <p>Clear flows, useful interfaces, and communication that makes technology approachable.</p>
            </article>
            <article className="panel cyan-panel">
              <span className="giant-number">02</span>
              <h3>Data aware</h3>
              <p>Structured information, validation, reporting, and measurable improvements.</p>
            </article>
            <article className="panel white-panel">
              <span className="giant-number">03</span>
              <h3>Always shipping</h3>
              <p>Learn fast, build practical, iterate often, and keep the result maintainable.</p>
            </article>
          </div>
        </section>

        <section id="skills" className="section section-paper">
          <div className="container">
            <div className="section-heading">
              <span className="section-index">02 / TOOLKIT</span>
              <h2>The stack behind the work.</h2>
            </div>
            <div className="skills-grid">
              {[
                { num: '01', title: 'BUILD', items: skills.build, tone: 'orange' },
                { num: '02', title: 'DATA', items: skills.data, tone: 'cyan' },
                { num: '03', title: 'PRODUCT', items: skills.product, tone: 'lime' },
              ].map((skillGroup) => (
                <article
                  className={`skill-card ${skillGroup.tone}`}
                  key={skillGroup.title}
                >
                  <div className="skill-head"><span>{skillGroup.num}</span><h3>{skillGroup.title}</h3></div>
                  <div className="tag-list">
                    {skillGroup.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <span className="section-index">03 / JOURNEY</span>
            <h2>Experience, viewed as a timeline.</h2>
          </div>
          <div className="timeline">
            {experiences.map((item, i) => (
              <motion.article
                key={item.role}
                className="timeline-item"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="timeline-year">{item.period}</div>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <p className="timeline-company">{item.company} · {item.location}</p>
                  <h3>{item.role}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="section section-dark">
          <div className="container">
            <div className="section-heading heading-light">
              <span className="section-index">04 / SELECTED WORK</span>
              <h2>Small systems, real problems.</h2>
            </div>
            <div className="filter-row">
              {filters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'filter active' : 'filter'}>
                  {item}
                </button>
              ))}
            </div>
            <motion.div layout className="project-grid">
              {visibleProjects.map((project) => (
                <motion.a
                  layout
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="project-top"><span>{project.number}</span><FaArrowRight /></div>
                  <div className="project-icon"><FaCode /></div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.techstack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech.split('/').pop()?.replace('.svg', '')}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </motion.div>
            <div className="center-action">
              <a href="https://github.com/RizkiRamadhani561?tab=repositories" target="_blank" rel="noreferrer" className="button button-lime">
                See all repositories <FaGithub />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="container section contact-section">
          <div className="contact-card">
            <div>
              <span className="section-index">05 / CONTACT</span>
              <h2>Have an idea?<br /><span>Let&apos;s make it useful.</span></h2>
              <p>Open to web projects, collaborations, internships, and opportunities where technology can simplify real work.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:ramscool98@gmail.com"><FaEnvelope /> Email me <FaArrowRight /></a>
              <a href="https://www.linkedin.com/in/m-rizki-ramadhani" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn <FaArrowRight /></a>
              <a href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer"><FaGithub /> GitHub <FaArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 M. Rizki Ramadhani</span>
          <span>DESIGNED & BUILT WITH PURPOSE</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}
