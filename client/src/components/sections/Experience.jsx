import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import { fadeUp, viewportConfig } from '../../utils/motion';

const FALLBACK = [
   {
    role: 'Java Developer', company: 'NA',
    period: '2026 — Present', current: true,
    description: 'Designing and delivering end-to-end Java-based applications. Leading all phases from system architecture and API design to backend development, database integration, and production deployment.',
    tech: ['Java', 'React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
  },
  {
    role: 'Full Stack Developer', company: 'Freelance & Independent',
    period: '2024 — 2025', current: false,
    description: 'Designing and delivering complete MERN-stack web applications for clients. Leading all phases from architecture and API design to frontend development and production deployment.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
  },
  {
    role: 'Web Development Intern', company: 'Tech Startup · Remote',
    period: '2023 — 2024', current: false,
    description: 'Contributed to React-based interfaces and Express APIs in an Agile team. Improved API performance with optimized Mongoose queries and helped ship features to thousands of users.',
    tech: ['React', 'JavaScript', 'Git', 'Agile', 'Postman'],
  },
  {
    role: 'Self-Directed Engineering', company: 'Personal Development',
    period: '2021 — 2025', current: false,
    description: 'Mastered the full MERN stack through structured learning, open-source exploration, and progressively complex personal projects.',
    tech: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
  },
];

const TimelineItem = ({ exp, index, isLast }) => {
  const [ref, inView] = useInView(viewportConfig);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      style={{ paddingLeft: '40px', paddingBottom: isLast ? 0 : '60px', position: 'relative' }}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.22,1,0.36,1] }}
        style={{
          position: 'absolute', left: '-5px', top: '4px',
          width: '11px', height: '11px', borderRadius: '50%',
          background: exp.current ? 'var(--cyan)' : 'var(--g1)',
          boxShadow: exp.current
            ? '0 0 0 4px rgba(0,255,209,0.12), 0 0 16px rgba(0,255,209,0.3)'
            : '0 0 0 4px rgba(212,175,90,0.12), 0 0 16px rgba(212,175,90,0.25)',
        }}
      />

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: exp.current ? 'var(--cyan)' : 'var(--g1)',
        marginBottom: '10px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        {exp.period}
        {exp.current && (
          <span style={{
            fontSize: '0.58rem', padding: '2px 8px',
            background: 'rgba(0,255,209,0.1)',
            border: '1px solid rgba(0,255,209,0.25)',
            color: 'var(--cyan)', borderRadius: '100px',
          }}>Current</span>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-head)', fontSize: '1.35rem',
        fontWeight: 600, color: 'var(--text)', marginBottom: '4px',
      }}>
        {exp.role}
      </div>
      <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '18px' }}>
        {exp.company}
      </div>
      <div style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '18px' }}>
        {exp.description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {exp.tech?.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--line2)',
            color: 'var(--muted)', borderRadius: '4px',
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = ({ experience }) => {
  const data = (experience && experience.length > 0) ? experience : FALLBACK;

  return (
    <section id="experience" style={{ background: 'var(--ink2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          tag="Career"
          title="Work"
          highlight="Experience"
          subtitle="Building real impact through code and collaboration, one project at a time."
        />

        <div style={{ maxWidth: '780px' }}>
          {/* Timeline track */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: '8px', bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, var(--g1), transparent)',
              opacity: 0.2,
            }} />
            {data.map((exp, i) => (
              <TimelineItem
                key={exp._id || i}
                exp={exp}
                index={i}
                isLast={i === data.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
