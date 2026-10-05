'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import projects from '@/data/projects';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const skills = {
  operations: [
    'Customer Service',
    'Sales Support',
    'Upselling',
    'Conflict Resolution',
    'Team Training',
    'Inventory Control',
    'POS Systems',
    'Guest Experience',
  ],
  tech: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PHP',
    'MySQL',
    'Tailwind CSS',
    'Figma',
    'Excel',
    'SQL',
    'GitHub',
    'REST API',
  ],
};

const experiences = [
  {
    period: 'Feb 2026 — May 2026',
    role: 'Outlet Service Crew',
    company: 'Geprekin Aja',
    location: 'South Tangerang',
    desc: 'Delivered 150+ daily orders with precision. Achieved 20% increase in transaction value through upselling. Operated POS with 100% cash accuracy.',
  },
  {
    period: 'Jan 2025 — Present',
    role: 'Data Entry Specialist',
    company: 'Freelance',
    location: 'Remote',
    desc: 'Built multi-layer verification workflows. Produced daily/weekly reports using Excel, Google Sheets, and SQL. Achieved near-zero error rates.',
  },
  {
    period: 'Jul 2024 — Dec 2024',
    role: 'Human Resources Intern',
    company: 'Solid Gold',
    location: 'Jakarta',
    desc: 'Achieved 100% regulatory compliance in personnel data protection. Facilitated 20+ internship placements. Boosted D&I participation by 35%.',
  },
  {
    period: 'Jan 2024 — Jun 2024',
    role: 'Admin & Operations Support Officer',
    company: 'J&T Express',
    location: 'Indonesia',
    desc: 'Managed 500+ daily data entries with 99.5% accuracy. Accelerated data entry speed by 30%. Resolved 50+ daily communication challenges.',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b-4 border-black bg-background/95 backdrop-blur">
        <div className="retro-container flex items-center justify-between py-4">
          <Link href="#home" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-primary font-bold text-white">
              R
            </div>
            <span className="hidden font-display text-lg font-bold uppercase sm:inline">
              Rizki
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="retro-press border-2 border-black bg-card px-4 py-2 font-bold uppercase transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="retro-press md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t-4 border-black bg-muted"
          >
            <div className="retro-container flex flex-col gap-2 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="retro-press border-2 border-black bg-card px-4 py-2 font-bold uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="retro-container border-b-4 border-black py-16 sm:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center"
        >
          <div>
            <div className="mb-6 inline-block">
              <span className="retro-badge">Portfolio 2026</span>
            </div>
            <h1 className="mb-4 font-display text-5xl font-bold uppercase leading-tight sm:text-6xl">
              M. Rizki <span className="text-gradient">Ramadhani</span>
            </h1>
            <p className="mb-6 text-xl font-semibold text-muted-foreground">
              Front Office Enthusiast • Full-Stack Developer • Data-Driven Operations
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <a href="#work" className="retro-button bg-primary text-primary-foreground">
                View Work
              </a>
              <a href="#contact" className="retro-button border-2 border-black">
                Get In Touch
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="retro-card">
                <p className="text-2xl font-black text-primary">4+</p>
                <p className="text-xs font-bold uppercase">Years in Service</p>
              </div>
              <div className="retro-card">
                <p className="text-2xl font-black text-secondary">15+</p>
                <p className="text-xs font-bold uppercase">Projects</p>
              </div>
              <div className="retro-card">
                <p className="text-2xl font-black text-accent">99%</p>
                <p className="text-xs font-bold uppercase">Accuracy</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="retro-card-accent aspect-square flex items-center justify-center text-8xl font-black">
              RR
            </div>
            <div className="absolute -bottom-4 -right-4 retro-card bg-secondary text-secondary-foreground">
              <p className="font-bold">Available for Work</p>
              <p className="text-sm">Based in Jakarta</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="retro-container py-16 sm:py-24">
        <div className="mb-12">
          <h2 className="font-display text-4xl font-bold uppercase">About Me</h2>
          <div className="retro-divider" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="retro-card">
            <p className="mb-4 text-lg leading-relaxed">
              My background is rooted in hospitality, service, and operational excellence. I enjoy
              creating systems that are efficient, human-centered, and measurable. Over time, I
              developed a strong interest in building practical digital experiences.
            </p>
            <p className="text-lg leading-relaxed">
              I study Information Management and work on operational support and web development
              projects, balancing customer-facing experience with data discipline and technical
              execution.
            </p>
          </div>

          <div className="space-y-4">
            <div className="retro-card-accent">
              <h3 className="mb-3 font-bold uppercase">Core Competencies</h3>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li>✓ Front Office Excellence</li>
                <li>✓ Operations Optimization</li>
                <li>✓ Customer Experience Design</li>
                <li>✓ Data Accuracy & Reporting</li>
                <li>✓ Team Leadership & Training</li>
                <li>✓ Full-Stack Web Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-muted py-16 sm:py-24">
        <div className="retro-container">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-bold uppercase">Skillset</h2>
            <div className="retro-divider" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Operations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="retro-card"
            >
              <h3 className="mb-4 font-display text-2xl font-bold uppercase text-primary">
                Operations & Service
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Guest experience, service quality, upselling, and team leadership
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.operations.map((skill) => (
                  <span key={skill} className="retro-badge-secondary text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="retro-card"
            >
              <h3 className="mb-4 font-display text-2xl font-bold uppercase text-secondary">
                Tech & Development
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Full-stack development, data processing, and modern web frameworks
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.tech.map((skill) => (
                  <span key={skill} className="retro-badge-accent text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="retro-container py-16 sm:py-24">
        <div className="mb-12">
          <h2 className="font-display text-4xl font-bold uppercase">Experience</h2>
          <div className="retro-divider" />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="retro-card"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="retro-badge">{exp.period}</span>
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  {exp.location}
                </span>
              </div>
              <h3 className="mb-1 font-display text-xl font-bold uppercase">{exp.role}</h3>
              <p className="mb-3 font-bold text-primary">{exp.company}</p>
              <p className="leading-relaxed text-muted-foreground">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="bg-muted py-16 sm:py-24">
        <div className="retro-container">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-bold uppercase">Selected Work</h2>
            <div className="retro-divider" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group retro-card flex flex-col transition-all duration-300 hover:shadow-retro"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="retro-badge">{project.number}</span>
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    {project.category}
                  </span>
                </div>
                <h3 className="mb-2 font-bold uppercase group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techstack.slice(0, 2).map((tech, i) => (
                    <span key={i} className="text-xs font-bold uppercase text-muted-foreground">
                      {tech.replace('/techstack/', '').replace('.svg', '')}
                    </span>
                  ))}
                  {project.techstack.length > 2 && (
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      +{project.techstack.length - 2}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://github.com/RizkiRamadhani561?tab=repositories" target="_blank" rel="noreferrer" className="retro-button">
              View All Projects →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="retro-container border-t-4 border-black py-16 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-4xl font-bold uppercase">Let's Work Together</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:ramscool98@gmail.com" className="retro-button bg-primary text-primary-foreground">
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/m-rizki-ramadhani"
                target="_blank"
                rel="noreferrer"
                className="retro-button bg-secondary text-secondary-foreground"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/RizkiRamadhani561"
              target="_blank"
              rel="noreferrer"
              className="retro-social-icon bg-foreground text-background hover:bg-primary hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/m-rizki-ramadhani"
              target="_blank"
              rel="noreferrer"
              className="retro-social-icon bg-secondary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:ramscool98@gmail.com"
              className="retro-social-icon bg-primary"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-foreground text-background py-8">
        <div className="retro-container">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display font-bold uppercase">Rizki Ramadhani</p>
              <p className="text-sm font-bold uppercase">Full-Stack Developer & Operations Specialist</p>
            </div>
            <div>
              <p className="mb-2 font-bold uppercase text-accent">Quick Links</p>
              <ul className="space-y-1 text-sm font-bold uppercase">
                <li>
                  <a href="#about" className="hover:text-accent">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-accent">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-accent">
                    Work
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-bold uppercase text-secondary">Connect</p>
              <ul className="space-y-1 text-sm font-bold uppercase">
                <li>
                  <a href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer" className="hover:text-secondary">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/m-rizki-ramadhani" target="_blank" rel="noreferrer" className="hover:text-secondary">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:ramscool98@gmail.com" className="hover:text-secondary">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="retro-divider mt-8" />
          <p className="mt-6 text-center text-sm font-bold uppercase">
            © 2026 M Rizki Ramadhani. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
