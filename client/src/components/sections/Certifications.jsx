import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { scaleIn, viewportConfig } from '../../utils/motion';

const FALLBACK = [
  { name: 'Complete MERN Stack Developer Course',    issuer: 'ARDENT COMPUTECH PVT.LTD', year: '2024', icon: '🎓' },
  { name: 'React — The Complete Guide incl. Redux',  issuer: 'ARDENT COMPUTECH PVT.LTD', year: '2023', icon: '⚛️' },
  { name: 'Node.js, Express & MongoDB Bootcamp',     issuer: 'ARDENT COMPUTECH PVT.LTD', year: '2023', icon: '🟢' },
  { name: 'MongoDB for JavaScript Developers',       issuer: 'MongoDB University',       year: '2023', icon: '🗃'  },
  { name: 'Responsive Web Design Certification',     issuer: 'freeCodeCamp',             year: '2022', icon: '🌐' },
  { name: 'JavaScript Algorithms & Data Structures', issuer: 'Coursera',                 year: '2022', icon: '🏆' },
];

const CertCard = ({ cert, index }) => {
  const [ref, inView] = useInView(viewportConfig);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 3}
      whileHover={{ y: -7, borderColor: 'rgba(212,175,90,0.28)', background: 'var(--s2)' }}
      transition={{ duration: 0.35 }}
      style={{
        padding: '26px',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        display: 'flex', gap: '18px', alignItems: 'flex-start',
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Subtle gradient on hover - done via border-color transition above */}
      <div style={{
        width: '44px', height: '44px', flexShrink: 0,
        borderRadius: '10px',
        background: 'rgba(212,175,90,0.08)',
        border: '1px solid rgba(212,175,90,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.25rem',
      }}>
        {cert.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-head)', fontSize: '0.92rem',
          fontWeight: 600, color: 'var(--text)',
          marginBottom: '5px', lineHeight: 1.3,
        }}>
          {cert.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--g1)', marginBottom: '3px',
        }}>
          {cert.issuer}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--muted2)' }}>
          {cert.year}
        </div>
      </div>

      {cert.url && (
        <motion.a
          href={cert.url} target="_blank" rel="noreferrer"
          whileHover={{ color: 'var(--g2)' }}
          style={{ color: 'var(--muted2)', flexShrink: 0, cursor: 'none' }}
        >
          <FiExternalLink size={14} />
        </motion.a>
      )}
    </motion.div>
  );
};

const Certifications = ({ certifications }) => {
  const data = (certifications && certifications.length > 0) ? certifications : FALLBACK;

  return (
    <section id="certifications" style={{ background: 'var(--ink2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader
          tag="Credentials"
          title=""
          highlight="Certifications"
          subtitle="Formal recognition of my commitment to mastering the craft."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
        }} className="cert-grid">
          {data.map((cert, i) => (
            <CertCard key={cert._id || i} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cert-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .cert-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Certifications;
