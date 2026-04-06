import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { fadeUp, scaleIn, viewportConfig } from '../../utils/motion';

const FALLBACK = [
  { title: 'MERN E-Commerce Platform', description: 'Full-featured online store with product listings, cart management, user authentication, order processing, and an admin dashboard for inventory management.', tag: 'Full Stack · Featured', tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'bcryptjs'], github: '#', live: '#', emoji: '🏪', featured: true },
  { title: 'Real-Time Chat App', description: 'Live messaging with WebSocket integration, private rooms, online presence indicators, and full message history persisted in MongoDB.', tag: 'Real-Time App', tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'], github: '#', live: '#', emoji: '💬', featured: false },
  { title: 'Task Management Dashboard', description: 'Kanban-style project tracker with drag-and-drop, team collaboration, due dates, priority labels, and analytics overview.', tag: 'Productivity Tool', tech: ['React', 'Redux', 'Express', 'MongoDB'], github: '#', live: '#', emoji: '📋', featured: false },
  { title: 'Developer Portfolio', description: 'This portfolio itself — a full MERN application with CMS backend, dynamic content management, and a contact form via Nodemailer.', tag: 'This Site', tech: ['React', 'Framer Motion', 'Node.js', 'MongoDB', 'Nodemailer'], github: '#', live: '#', emoji: '👤', featured: false },
];

const ProjectCard = ({ project, index, featured }) => {
  const [ref, inView] = useInView(viewportConfig);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 2}
      whileHover={{ y: featured ? -14 : -12, boxShadow: '0 40px 100px rgba(0,0,0,0.6)', borderColor: 'rgba(212,175,90,0.2)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--ink3)',
        border: '1px solid var(--line)',
        borderRadius: '16px',
        overflow: 'hidden',
        gridColumn: featured ? '1 / -1' : 'auto',
        cursor: 'default',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: featured ? '260px' : '200px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(212,175,90,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,90,0.07) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Color glow per card */}
        <div style={{
          position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
          filter: 'blur(60px)', opacity: 0.18,
          background: index === 0 ? 'radial-gradient(circle,#d4af5a,transparent)'
            : index === 1 ? 'radial-gradient(circle,#00ffd1,transparent)'
            : index === 2 ? 'radial-gradient(circle,rgba(180,100,255,1),transparent)'
            : 'radial-gradient(circle,#d4af5a,transparent)',
        }} />
        <motion.div
          style={{ fontSize: featured ? '3.5rem' : '2.8rem', position: 'relative', zIndex: 1, lineHeight: 1 }}
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {project.emoji || '🚀'}
        </motion.div>
        {/* Big number watermark */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '20px',
          fontFamily: 'var(--font-head)', fontSize: '5rem', fontWeight: 700,
          color: 'rgba(212,175,90,0.08)', lineHeight: 1, userSelect: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        {/* Featured badge */}
        {featured && (
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '5px 12px',
            background: 'rgba(212,175,90,0.15)',
            border: '1px solid rgba(212,175,90,0.3)',
            color: 'var(--g1)', borderRadius: '100px',
          }}>★ Featured</div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: featured ? '32px 36px' : '26px 28px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--cyan)', marginBottom: '10px',
        }}>● {project.tag}</div>

        <div style={{
          fontFamily: 'var(--font-head)', fontSize: featured ? '1.4rem' : '1.2rem',
          fontWeight: 600, color: 'var(--text)', marginBottom: '10px',
        }}>{project.title}</div>

        <div style={{
          color: 'var(--muted)', fontSize: '0.88rem',
          lineHeight: 1.75, marginBottom: '20px',
        }}>{project.description}</div>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.tech?.map((t, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              padding: '3px 9px',
              background: 'rgba(0,255,209,0.04)',
              border: '1px solid rgba(0,255,209,0.14)',
              color: 'var(--cyan)', borderRadius: '3px',
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {project.github && (
            <motion.a
              href={project.github} target="_blank" rel="noreferrer"
              whileHover={{ color: 'var(--g2)', x: 2 }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--g1)', display: 'flex', alignItems: 'center', gap: '6px',
                cursor: 'none',
              }}
            >
              <FiGithub size={13} /> GitHub
            </motion.a>
          )}
          {project.live && project.live !== '#' && (
            <motion.a
              href={project.live} target="_blank" rel="noreferrer"
              whileHover={{ color: 'var(--g2)', x: 2 }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--g1)', display: 'flex', alignItems: 'center', gap: '6px',
                cursor: 'none',
              }}
            >
              <FiExternalLink size={13} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ projects }) => {
  const data = (projects && projects.length > 0) ? projects : FALLBACK;
  const featured = data.filter(p => p.featured);
  const rest = data.filter(p => !p.featured);

  return (
    <section id="projects" style={{ background: 'var(--ink)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          tag="Portfolio"
          title="Featured"
          highlight="Projects"
          subtitle="A selection of things I've built — each one a learning journey in code and design."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="proj-grid">
          {featured.map((p, i) => (
            <ProjectCard key={p._id || i} project={p} index={i} featured />
          ))}
          {rest.map((p, i) => (
            <ProjectCard key={p._id || i} project={p} index={i + featured.length} featured={false} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Projects;
