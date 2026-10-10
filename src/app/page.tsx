'use client';

import { AnimatePresence, motion, animate, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTerminal,
} from 'react-icons/fa6';
import projects from '@/data/projects';
import { PortfolioMotionLayer } from '@/components/PortfolioMotionLayer';
import { SnakeGame } from '@/components/SnakeGame';

const skills = {
  build: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PHP', 'REST API'],
  data: ['MySQL', 'SQL', 'Excel', 'Google Sheets', 'GitHub'],
  product: ['Figma', 'Tailwind CSS', 'UI/UX', 'Customer Experience', 'Operations'],
};

const experiences = [
  {
    period: 'Jan 2025 — Now',
    role: 'Spesialis Entri Data',
    company: 'Dukungan Lepas / Jarak Jauh',
    location: 'Indonesia',
    tools: 'Excel Lanjutan · Google Sheets · SQL · Python · REST API',
    text: 'Memproses rata-rata ratusan baris data per sesi dengan pemeriksaan berlapis, merapikan spreadsheet, dan menjaga file klien tetap tertata serta mudah ditelusuri.',
    result: 'Otomasi dengan Excel lanjutan dan SQL memangkas waktu rekap lebih dari 60%.',
  },
  {
    period: 'Okt 2025 — Mei 2026',
    role: 'Staf Dukungan IT',
    company: 'Kejaksaan Negeri Jakarta Barat',
    location: 'Jakarta Barat, Indonesia',
    tools: 'Hardware · Software · Networking · Active Directory',
    text: 'Menjadi titik kontak teknis pertama bagi lebih dari 50 staf, menangani perangkat, jaringan, dan software, serta memasang dan mengonfigurasi 30+ perangkat komputer, printer, dan jaringan.',
    result: 'Membangun sistem inventaris perangkat agar aset dan jadwal perawatan mudah ditelusuri.',
  },
  {
    period: 'Jan 2025 — Jun 2025',
    role: 'Petugas Administrasi & Dukungan',
    company: 'J&T Express',
    location: 'Indonesia',
    tools: 'Microsoft Office · Administrasi Operasional · Manajemen Data',
    text: 'Mengelola pencatatan operasional harian cabang, verifikasi stok, rekap pengiriman, pengecekan dokumen, serta perapian sistem pengarsipan.',
    result: 'Menjadi penghubung antara tim kantor, driver, dan manajemen agar informasi tersampaikan tepat waktu.',
  },
  {
    period: 'Jul 2024 — Des 2024',
    role: 'Magang Sumber Daya Manusia',
    company: 'Solid Gold',
    location: 'Jakarta, Indonesia',
    tools: 'Administrasi SDM · Pengarsipan · Koordinasi · Mediasi',
    text: 'Mengelola arsip personel ratusan karyawan dengan sistem terstandarisasi serta menjaga kerahasiaan dokumen.',
    result: 'Mendukung penempatan mahasiswa magang dari komunikasi, seleksi, hingga penempatan akhir dan membantu mediasi perselisihan.',
  },
  {
    period: 'Jan 2024 — Jun 2024',
    role: 'Konsultan Layanan & Penjualan',
    company: 'WAKI Indonesia',
    location: 'Tangerang, Banten',
    tools: 'Customer Service · Komunikasi Konsultatif · Sales',
    text: 'Melayani pelanggan dengan pendekatan konsultatif, memahami kebutuhan sebelum memberi rekomendasi, dan menangani keluhan dengan solusi yang dapat dijalankan.',
    result: 'Membimbing karyawan baru dalam standar layanan, kebutuhan pelanggan, dan penanganan situasi yang lebih kompleks.',
  },
];

const filters = ['All', 'Full Stack', 'Web App', 'Automation', 'UI/UX'];

const workflowItems = [
  {
    title: 'Discover',
    body: 'Understand the problem, users, data, constraints, and what success should look like.',
  },
  {
    title: 'Build',
    body: 'Turn the idea into a clean interface, working system, and repeatable delivery flow.',
  },
  {
    title: 'Improve',
    body: 'Measure what matters, refine the experience, reduce friction, and keep shipping.',
  },
];

const snippets = {
  frontend: [
    '// FRONTEND DELIVERY',
    'const stack = [',
    '  "Next.js",',
    '  "React",',
    '  "TypeScript",',
    '  "Tailwind CSS",',
    '];',
    '',
    'ship(stack).with("clarity");',
  ].join('\n'),
  backend: [
    '// DATA + BACKEND',
    'const system = {',
    '  api: "REST",',
    '  database: "MySQL",',
    '  state: "simple & explicit",',
    '};',
    '',
    'system.validate().then(ship);',
  ].join('\n'),
  ops: [
    '// DELIVERY + OPERATIONS',
    'const release = {',
    '  verify: true,',
    '  monitor: true,',
    '  rollback: true,',
    '};',
    '',
    'deploy(release);',
  ].join('\n'),
} as const;

const morphWords = ['BUILD', 'AUTOMATE', 'SIMPLIFY', 'SHIP', 'IMPROVE'];

const faqs = [
  {
    q: 'What kind of work do you take on?',
    a: 'Web applications, portfolio sites, internal tools, automation, data workflows, and practical UI improvements.',
  },
  {
    q: 'Which technologies do you prefer?',
    a: 'I enjoy TypeScript, React, Next.js, Node.js, PHP, MySQL, Tailwind CSS, and tools that keep the final system understandable.',
  },
  {
    q: 'Can you work with an existing project?',
    a: 'Yes. I can improve an existing codebase, fix issues, refine UX, or add features without forcing an unnecessary rewrite.',
  },
  {
    q: 'How do you approach a new project?',
    a: 'First I clarify the goal and constraints, then break the work into small deliverable pieces and iterate from a working baseline.',
  },
];

function AnimatedMetric({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div className="metric-cell">
      <span ref={ref} className="metric-value">{display}{suffix}</span>
      <span className="metric-label">{label}</span>
    </div>
  );
}

function TypeSnippet({ text }: { text: string }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timer = window.setInterval(() => {
      setVisible((count) => {
        if (count >= text.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 2;
      });
    }, 18);
    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <pre className="code-screen">
      <code>{text.slice(0, visible)}<span className="type-caret">▋</span></code>
    </pre>
  );
}

function GithubPulse() {
  const [stats, setStats] = useState({ repos: 0, stars: 0, followers: 0, loading: true });

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/RizkiRamadhani561'),
          fetch('https://api.github.com/users/RizkiRamadhani561/repos?per_page=100&sort=updated'),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub unavailable');
        const profile = (await profileRes.json()) as { followers?: number };
        const repos = (await reposRes.json()) as Array<{ stargazers_count?: number }>;
        setStats({
          repos: repos.length,
          stars: repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0),
          followers: profile.followers ?? 0,
          loading: false,
        });
      } catch {
        setStats((current) => ({ ...current, loading: false }));
      }
    };
    load();
  }, []);

  return (
    <div className="github-pulse">
      <div className="github-pulse-head">
        <span className="section-index">LIVE SIGNAL</span>
        <span className="pulse-led" />
      </div>
      <h3>GitHub Pulse</h3>
      <p>Repository activity pulled from the public GitHub profile.</p>
      <div className="github-stats">
        <div><strong>{stats.loading ? '—' : stats.repos}</strong><span>Repositories</span></div>
        <div><strong>{stats.loading ? '—' : stats.stars}</strong><span>Total stars</span></div>
        <div><strong>{stats.loading ? '—' : stats.followers}</strong><span>Followers</span></div>
      </div>
      <a className="mini-link" href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer">
        Open GitHub <FaArrowRight />
      </a>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [snippetTab, setSnippetTab] = useState<keyof typeof snippets>('frontend');
  const [flipIndex, setFlipIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [morphIndex, setMorphIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const workflowTimer = window.setInterval(() => {
      setWorkflowIndex((value) => (value + 1) % workflowItems.length);
    }, 2200);
    const morphTimer = window.setInterval(() => {
      setMorphIndex((value) => (value + 1) % morphWords.length);
    }, 1750);
    const flipTimer = window.setInterval(() => {
      setFlipIndex((value) => (value + 1) % 3);
    }, 2600);
    return () => {
      window.clearInterval(workflowTimer);
      window.clearInterval(morphTimer);
      window.clearInterval(flipTimer);
    };
  }, [reduceMotion]);

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

  const currentWorkflow = workflowItems[workflowIndex];
  const flipCards = [
    ['SPEED', 'Move from idea to usable baseline without unnecessary ceremony.'],
    ['QUALITY', 'Readable systems, deliberate interactions, and repeatable delivery.'],
    ['GROWTH', 'Use feedback and data to keep improving what was shipped.'],
  ] as const;

  return (
    <div className="site-shell">
      <PortfolioMotionLayer />

      <main>
        <section id="home" className="container hero" data-reveal>
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Available for selected opportunities</div>
            <p className="kicker">FULL-STACK DEVELOPER / OPERATIONS</p>
            <h1>
              <span className="hero-line">Build useful things.</span>
              <span className="hero-line hero-accent">
                {Array.from('Make them work.').map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    className="char"
                    initial={{ opacity: 0, y: 25, rotate: 8 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.55 + index * 0.035, duration: 0.45, ease: 'easeOut' }}
                  >
                    {char === ' ' ? '\u00a0' : char}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="hero-lead">
              I&apos;m <strong>M. Rizki Ramadhani</strong> — an Information Management student combining
              web development, data discipline, and real-world service experience to create practical digital products.
            </p>
            <motion.div
              className="arch-btw"
              aria-label="i use arch btw"
              initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: -2 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={reduceMotion ? undefined : {
                opacity: { duration: 0.45, delay: 0.7 },
                y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <span className="arch-prompt" aria-hidden="true">~/</span>
              <span>i use arch btw</span>
              <span className="arch-spark" aria-hidden="true">✳</span>
            </motion.div>
            <div className="hero-actions">
              <a href="#work" className="button button-primary" data-cursor>Explore my work <FaArrowRight /></a>
              <a href="/CV_M_Rizki_Ramadhani.pdf" className="button button-light" download="CV_M_Rizki_Ramadhani.pdf" data-cursor>
                Download CV <FaDownload />
              </a>
              <a href="#contact" className="button button-light" data-cursor>Start a conversation</a>
            </div>
            <div className="micro-stats">
              <AnimatedMetric value={9} suffix="+" label="Projects" />
              <AnimatedMetric value={4} label="Work chapters" />
              <AnimatedMetric value={99} suffix="%" label="Accuracy mindset" />
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-badge badge-one" data-cursor>BUILD</div>
            <div className="hero-badge badge-two" data-cursor>DATA</div>
            <div className="hero-badge badge-three" data-cursor>OPS</div>
            <motion.div
              className="hero-window"
              initial={{ opacity: 0, y: 30, rotate: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="window-bar">
                <span className="window-title"><FaTerminal /> rizki@workspace</span>
                <div className="window-dots"><i /><i /><i /></div>
              </div>
              <div className="terminal-body">
                <p><span className="terminal-muted">$</span> whoami</p>
                <h2>rizki_ramadhani</h2>
                <p><span className="terminal-muted">$</span> focus --today</p>
                <div className="focus-box">
                  <span>01</span><p>Interfaces that feel simple.</p>
                  <span>02</span><p>Systems that stay reliable.</p>
                  <span>03</span><p>Data that tells the truth.</p>
                </div>
                <p><span className="terminal-muted">$</span> status</p>
                <div className="terminal-status"><span>●</span> ONLINE / LEARNING / SHIPPING</div>
                <div className="terminal-sign">RR<span>_</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="ticker stat-ticker" data-reveal aria-label="Portfolio highlights">
          <motion.div
            className="ticker-track"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={reduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(2)].flatMap((_, copy) =>
              ['9+ PROJECTS', 'FULL-STACK + OPERATIONS', 'DATA-AWARE DELIVERY', 'BASED IN JAKARTA', 'OPEN TO COLLABORATION'].map((item, i) => (
                <span key={`${copy}-${i}`}>{item}<b>✦</b></span>
              )),
            )}
          </motion.div>
        </section>

        <section id="about" className="container section" data-reveal>
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <h2>A technical mind with an operational instinct.</h2>
          </div>
          <div className="bento about-grid">
            <article className="panel panel-dark about-main" data-reveal>
              <div className="panel-label">PROFILE.LOG</div>
              <p className="big-copy">
                I enjoy the space between <em>people, process, and technology.</em>
              </p>
              <p>
                My background in hospitality and operations taught me to care about details, speed, and how people actually experience a system.
                I bring that perspective into full-stack development.
              </p>
              <div className="mini-metrics">
                <AnimatedMetric value={150} suffix="+" label="Daily orders handled" />
                <AnimatedMetric value={500} suffix="+" label="Daily data entries" />
              </div>
            </article>
            <article className="panel accent-panel" data-reveal>
              <span className="giant-number">01</span>
              <h3>Human first</h3>
              <p>Clear flows, useful interfaces, and communication that makes technology approachable.</p>
            </article>
            <article className="panel cyan-panel" data-reveal>
              <span className="giant-number">02</span>
              <h3>Data aware</h3>
              <p>Structured information, validation, reporting, and measurable improvements.</p>
            </article>
            <article className="panel white-panel" data-reveal>
              <span className="giant-number">03</span>
              <h3>Always shipping</h3>
              <p>Learn fast, build practical, iterate often, and keep the result maintainable.</p>
            </article>
          </div>
        </section>

        <section className="container section matrix-section" data-reveal>
          <div className="section-heading">
            <span className="section-index">01.5 / EXECUTION ENGINE</span>
            <h2>We build to <span className="morph-word">{morphWords[morphIndex]}</span>.</h2>
          </div>

          <div className="matrix-grid">
            <article className="workflow-card" data-cursor>
              <div className="workflow-label">SERVICE WORKFLOW</div>
              <div className="workflow-stage">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentWorkflow.title}
                    className="workflow-main-card"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <div className="workflow-main-number">{String(workflowIndex + 1).padStart(2, '0')}</div>
                    <div className="workflow-main-copy">
                      <h3>{currentWorkflow.title}</h3>
                      <p>{currentWorkflow.body}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="workflow-next-row">
                  {workflowItems.map((item, index) => (
                    <button
                      type="button"
                      key={item.title}
                      className={index === workflowIndex ? 'workflow-chip active' : 'workflow-chip'}
                      onClick={() => setWorkflowIndex(index)}
                      data-cursor
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="workflow-progress">
                {workflowItems.map((_, index) => <i key={index} className={index === workflowIndex ? 'active' : ''} />)}
              </div>
            </article>

            <article className="code-card">
              <div className="code-card-head">
                <div>
                  <span className="workflow-label">FRAMEWORKS / LANGUAGES</span>
                  <h3>Code that explains itself.</h3>
                </div>
                <FaCode />
              </div>
              <div className="code-tabs">
                {(Object.keys(snippets) as Array<keyof typeof snippets>).map((tab) => (
                  <button
                    key={tab}
                    className={snippetTab === tab ? 'code-tab active' : 'code-tab'}
                    onClick={() => setSnippetTab(tab)}
                    data-cursor
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={snippetTab}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.25 }}
                >
                  <TypeSnippet text={snippets[snippetTab]} />
                </motion.div>
              </AnimatePresence>
            </article>
          </div>

          <div className="flip-grid">
            {flipCards.map(([front, back], index) => (
              <motion.button
                key={front}
                className="flip-card"
                onClick={() => setFlipIndex(index)}
                animate={{ rotateY: flipIndex === index ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                data-cursor
                aria-label={`Show detail for ${front}`}
              >
                <div className="flip-face flip-front">
                  <span>0{index + 1}</span>
                  <h3>{front}</h3>
                  <p>Click to reveal →</p>
                </div>
                <div className="flip-face flip-back">
                  <span>RR / MATRIX</span>
                  <h3>{front}</h3>
                  <p>{back}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="skills" className="section section-paper" data-reveal>
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
              ].map((skillGroup, index) => (
                <motion.article
                  className={`skill-card ${skillGroup.tone}`}
                  key={skillGroup.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-cursor
                >
                  <div className="skill-head"><span>{skillGroup.num}</span><h3>{skillGroup.title}</h3></div>
                  <div className="tag-list">
                    {skillGroup.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="container section github-section" data-reveal>
          <div className="section-heading">
            <span className="section-index">02.5 / LIVE DATA</span>
            <h2>A portfolio connected to the work.</h2>
          </div>
          <div className="github-grid">
            <GithubPulse />
            <article className="github-story panel panel-dark">
              <span className="workflow-label">WHY IT MATTERS</span>
              <h3>Make the portfolio prove the point.</h3>
              <p>
                Instead of only saying I build software, this area surfaces live public repository signals and a working code-delivery concept.
              </p>
              <div className="signal-row"><span /> repository-first <b>→</b></div>
              <div className="signal-row"><span /> practical systems <b>→</b></div>
              <div className="signal-row"><span /> continuous learning <b>→</b></div>
            </article>
          </div>
        </section>

        <section id="journey" className="container section" data-reveal>
          <div className="section-heading">
            <span className="section-index">03 / JOURNEY</span>
            <h2>Experience, viewed as a timeline.</h2>
          </div>
          <div className="timeline">
            {experiences.map((item, i) => (
              <motion.article
                key={`${item.company}-${item.role}`}
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
                  <p className="timeline-tools">{item.tools}</p>
                  <p>{item.text}</p>
                  <p className="timeline-result"><strong>Impact:</strong> {item.result}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="section section-dark" data-reveal>
          <div className="container">
            <div className="section-heading heading-light">
              <span className="section-index">04 / SELECTED WORK</span>
              <h2>Small systems, real problems.</h2>
            </div>
            <div className="filter-row">
              {filters.map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'filter active' : 'filter'} data-cursor>
                  {item}
                </button>
              ))}
            </div>
            <motion.div layout className="project-grid">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.a
                    layout
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.96 }}
                    whileHover={{ y: -7, rotate: -0.4 }}
                    transition={{ duration: 0.3 }}
                    data-cursor
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
              </AnimatePresence>
            </motion.div>
            <div className="center-action">
              <a href="https://github.com/RizkiRamadhani561?tab=repositories" target="_blank" rel="noreferrer" className="button button-lime" data-cursor>
                See all repositories <FaGithub />
              </a>
            </div>
          </div>
        </section>

        <section className="container section snake-wrap" data-reveal>
          <SnakeGame />
        </section>

        <section className="container section faq-section" data-reveal>
          <div className="section-heading">
            <span className="section-index">04.5 / FAQ</span>
            <h2>Questions, answered without the fluff.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className={open ? 'faq-item open' : 'faq-item'} data-cursor>
                  <button onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open}>
                    <span>0{index + 1}</span>
                    <strong>{item.q}</strong>
                    <b>{open ? '−' : '+'}</b>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="faq-answer"
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="container section contact-section" data-reveal>
          <div className="contact-card">
            <div>
              <span className="section-index">05 / CONTACT</span>
              <h2>Have an idea?<br /><span>Let&apos;s make it useful.</span></h2>
              <p>
                Open to web projects, collaborations, internships, and opportunities where technology can simplify real work.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:ramscool98@gmail.com" data-cursor><FaEnvelope /> Email me <FaArrowRight /></a>
              <a href="https://www.linkedin.com/in/m-rizki-ramadhani" target="_blank" rel="noreferrer" data-cursor><FaLinkedin /> LinkedIn <FaArrowRight /></a>
              <a href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer" data-cursor><FaGithub /> GitHub <FaArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 M. Rizki Ramadhani</span>
          <span>DESIGNED & BUILT WITH PURPOSE</span>
          <div className="footer-links">
            <Link href="/Archive">Archive</Link>
            <Link href="/Contact">Profile</Link>
            <a href="#home">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
