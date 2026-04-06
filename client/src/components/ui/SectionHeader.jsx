import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp, viewportConfig } from '../../utils/motion';

const SectionHeader = ({ tag, title, highlight, subtitle, center = false }) => {
  const [ref, inView] = useInView(viewportConfig);

  return (
    <div ref={ref} style={{ textAlign: center ? 'center' : 'left', marginBottom: '56px' }}>
      <motion.div
        variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        custom={0}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--g1)',
          display: 'flex', alignItems: 'center',
          gap: '14px', marginBottom: '16px',
          justifyContent: center ? 'center' : 'flex-start',
        }}
      >
        <span style={{ width: '28px', height: '1px', background: 'var(--g1)', display: 'block' }} />
        {tag}
      </motion.div>

      <motion.h2
        variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        custom={1}
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
          lineHeight: 1.05, letterSpacing: '-0.02em',
          color: 'var(--text)', marginBottom: '16px',
        }}
      >
        {title}{' '}
        {highlight && (
          <span style={{
            fontStyle: 'normal',
            fontFamily: 'var(--font-head)',
            background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a,#d4af5a)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
          }}>
            {highlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={2}
          style={{
            color: 'var(--muted)', fontSize: '1rem',
            lineHeight: 1.8, maxWidth: '520px',
            margin: center ? '0 auto' : '0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
