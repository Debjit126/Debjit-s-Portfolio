import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import { scaleIn, staggerContainer, viewportConfig } from '../../utils/motion';

const FALLBACK_SKILLS = [
   { category: 'Java Development',    icon: '☕', items: ['Java','React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Redux', 'Tailwind CSS'] },
  { category: 'Frontend',             icon: '⚡', items: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Redux', 'Tailwind CSS'] },
  { category: 'Backend & APIs',       icon: '🖥',  items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Nodemailer', 'bcryptjs'] },
  { category: 'Database',             icon: '🗄',  items: ['MongoDB', 'Mongoose ODM', 'MongoDB Atlas', 'Schema Design'] },
  { category: 'DevOps & Deployment',  icon: '🚀', items: ['Git & GitHub', 'Vercel', 'Render', 'Railway', 'npm/yarn'] },
  { category: 'Design & UX',          icon: '🎨', items: ['Figma', 'Framer Motion', 'CSS Animations', 'Accessibility'] },
  { category: 'Concepts',             icon: '🔩', items: ['MVC Architecture', 'Clean Code', 'Agile/Scrum', 'Code Review'] },
];

const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView(viewportConfig);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 3}
      whileHover={{ y: -10, borderColor: 'rgba(212,175,90,0.25)' }}
      transition={{ duration: 0.35 }}
      style={{
        padding: '36px',
        background: 'var(--ink3)',
        border: '1px solid var(--line)',
        borderRadius: '14px',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top accent line on hover — done via CSS class */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a)',
          transformOrigin: 'left',
        }}
        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
      />

      <div style={{ fontSize: '1.8rem', marginBottom: '22px', lineHeight: 1 }}>
        {skill.icon}
      </div>
      <div style={{
        fontFamily: 'var(--font-head)', fontSize: '1.05rem',
        fontWeight: 600, color: 'var(--text)', marginBottom: '18px',
      }}>
        {skill.category}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skill.items.map((item, i) => (
          <motion.span
            key={i}
            whileHover={{ background: 'rgba(212,175,90,0.12)', borderColor: 'rgba(212,175,90,0.3)' }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
              letterSpacing: '0.05em',
              padding: '5px 12px',
              background: 'rgba(212,175,90,0.06)',
              border: '1px solid rgba(212,175,90,0.12)',
              color: 'var(--g2)', borderRadius: '100px',
              transition: 'background 0.3s, border-color 0.3s',
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = ({ skills }) => {
  const data = (skills && skills.length > 0) ? skills : FALLBACK_SKILLS;

  return (
    <section id="skills" style={{ background: 'var(--ink)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          tag="Technical Arsenal"
          title="Skills &"
          highlight="Technologies"
          subtitle="Forged through real-world projects and relentless learning. A full toolkit from database to deployment."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="skills-grid">
          {data.map((skill, i) => (
            <SkillCard key={skill._id || i} skill={skill} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px)  { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Skills;
