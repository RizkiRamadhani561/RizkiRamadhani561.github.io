'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import projects from '@/data/projects';

const skills = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'PHP',
  'MySQL',
  'Tailwind CSS',
  'Figma',
  'Excel',
  'SQL',
  'GitHub',
  'REST API',
];

const strengths = [
  'Front Office Excellence',
  'Operations Optimization',
  'Customer Experience',
  'Data Accuracy & Reporting',
  'Team Training',
  'UI/UX Thinking',
];

const experiences = [
  {
    period: 'Feb 2026 — May 2026',
    role: 'Outlet Service Crew',
    company: 'Geprekin Aja',
    description:
      'Handled daily rush orders, improved average transaction value, operated POS accurately, and kept service standards high in a fast-paced outlet environment.',
  },
  {
    period: 'Jan 2025 — Present',
    role: 'Data Entry Specialist',
    company: 'Freelance',
    description:
      'Built verification systems, produced reports with Excel and SQL, and improved data quality across daily processing workflows.',
  },
  {
    period: 'Jul 2024 — Dec 2024',
    role: 'Human Resources Intern',
    company: 'Solid Gold',
    description:
      'Supported employee administration, compliance tracking, and internship placement coordination while improving HR documentation quality.',
  },
  {
    period: 'Jan 2024 — Jun 2024',
    role: 'Admin & Operations Support Officer',
    company: 'J&T Express',
    description:
      'Managed daily operational records, maintained inventory accuracy, and served as a communication bridge between teams and stakeholders.',
  },
];

export default function Home() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio 2026</p>
          <h1>
            M. Rizki <span>Ramadhani</span>
          </h1>
          <p className="hero-tagline">
            Front Office Enthusiast • Full-Stack Developer • Data-Driven Operations
          </p>

          <div className="cta-row">
            <Link href="#projects" className="primary-btn">
              View Projects
            </Link>
            <a href="mailto:ramscool98@gmail.com" className="secondary-btn">
              Email Me
            </a>
          </div>

          <div className="mini-metrics">
            <div className="metric-box">
              <strong>4+</strong>
              <span>Years in service & ops</span>
            </div>
            <div className="metric-box">
              <strong>15+</strong>
              <span>Projects & case studies</span>
            </div>
            <div className="metric-box">
              <strong>99%</strong>
              <span>Data accuracy focus</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-purple" />
          <div className="orb orb-teal" />
          <motion.div
            className="glass-card profile-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="profile-topbar">
              <span className="status-pill">Available for work</span>
              <span className="dot-indicator" />
            </div>

            <div className="profile-avatar">
              <div className="avatar-ring">
                <div className="avatar-core">RR</div>
              </div>
            </div>

            <div className="profile-meta">
              <h3>M Rizki Ramadhani</h3>
              <p>Front Office & Data Operations</p>
            </div>

            <div className="info-list">
              <div>
                <span>Location</span>
                <strong>Jakarta Barat</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>ramscool98@gmail.com</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>Ops + Web Dev</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-block" id="about">
        <div className="section-heading">
          <span className="section-label">About</span>
        </div>

        <div className="about-grid">
          <div className="glass-card large-card">
            <p>
              My background is rooted in hospitality, service, and operational excellence.
              I enjoy creating systems that are efficient, human-centered, and measurable.
              Over time, I developed a strong interest in building practical digital
              experiences that combine performance, usability, and real business value.
            </p>
            <p>
              I currently study Information Management and work on both operational support
              and web development projects, balancing customer-facing experience with data
              discipline and clean technical execution.
            </p>
          </div>

          <div className="glass-card feature-stack">
            <h3>Core Strengths</h3>
            <div className="chip-wrap">
              {strengths.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="skills">
        <div className="section-heading">
          <span className="section-label">Skillset</span>
        </div>

        <div className="skill-grid">
          <div className="glass-card skill-card accent-purple">
            <h3>Operations & Service</h3>
            <p>Guest experience, service quality, upselling, conflict handling, and team support.</p>
            <div className="chip-wrap">
              {['Customer Service', 'Sales Support', 'Upselling', 'Conflict Resolution', 'Training', 'Inventory Control'].map((item) => (
                <span key={item} className="chip soft">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card skill-card accent-teal">
            <h3>Data & Development</h3>
            <p>Data processing, reporting, web interfaces, and modern workflow automation.</p>
            <div className="chip-wrap">
              {skills.map((item) => (
                <span key={item} className="chip soft">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="experience">
        <div className="section-heading">
          <span className="section-label">Experience</span>
        </div>

        <div className="timeline">
          {experiences.map((item, index) => (
            <motion.article
              key={item.role}
              className="timeline-item glass-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className="timeline-period">{item.period}</span>
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.company}</p>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-block" id="projects">
        <div className="section-heading">
          <span className="section-label">Selected Work</span>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-card glass-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="project-upper">
                <span className="project-number">{project.number}</span>
                <span className="project-category">{project.category}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tech">
                {project.techstack.map((tech, i) => (
                  <span key={`${project.id}-${i}`} className="tech-pill">
                    {tech.replace('/techstack/', '').replace('.svg', '')}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="section-block contact-section">
        <div className="glass-card contact-card">
          <div>
            <p className="eyebrow alt">Let’s build something useful</p>
            <h2>Open to opportunities, collaborations, and meaningful projects.</h2>
          </div>

          <div className="contact-actions">
            <a href="https://wa.me/6285119512611" className="primary-btn" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/m-rizki-ramadhani" className="secondary-btn" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
