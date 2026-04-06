import { motion } from 'framer-motion';

const Loader = () => (
  <div style={{
    position: 'fixed', inset: 0,
    background: 'var(--ink)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
  }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: 'var(--font-head)', fontSize: '3rem', fontWeight: 700,
        background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a,#d4af5a)',
        backgroundSize: '200%',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 2s linear infinite',
        marginBottom: '32px',
      }}
    >
      DD
    </motion.div>

    {/* Loading bar */}
    <div style={{
      width: '160px', height: '2px',
      background: 'var(--line2)', borderRadius: '1px', overflow: 'hidden',
    }}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg,transparent,var(--g1),transparent)', borderRadius: '1px' }}
      />
    </div>
  </div>
);

export default Loader;
