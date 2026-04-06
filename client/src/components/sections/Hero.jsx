import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiMail, FiDownload } from 'react-icons/fi';

const Hero = ({ profile }) => {
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  /* Parallax orbs on mouse move */
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      if (orb1.current) orb1.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      if (orb2.current) orb2.current.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const name  = profile?.name  || 'Debjit Dey';
  const parts = name.split(' ');
  const first = parts[0] || 'Debjit';
  const last  = parts.slice(1).join(' ') || 'Dey';

  const goldText = {
    background: 'linear-gradient(115deg,#b8922e 0%,#d4af5a 35%,#f5d98a 65%,#d4af5a 100%)',
    backgroundSize: '250%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 5s linear infinite',
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '0 64px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div ref={orb1} style={{
          position: 'absolute', width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,90,0.09) 0%, transparent 70%)',
          top: '-150px', right: '-100px',
          filter: 'blur(80px)',
          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        }} />
        <div ref={orb2} style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,209,0.05) 0%, transparent 70%)',
          bottom: '50px', left: '-100px',
          filter: 'blur(80px)',
          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 100% 90% at 70% 50%, black 0%, transparent 65%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 90% at 70% 50%, black 0%, transparent 65%)',
      }} />

      {/* Left gold accent line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, var(--g1) 20%, var(--g1) 80%, transparent)',
        opacity: 0.12,
      }} />

      {/* Content */}
      <div style={{ maxWidth: '1000px', position: 'relative', zIndex: 2 }}>
         <br /><br /><br />

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}
        >
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%', background: 'var(--cyan)',
            boxShadow: '0 0 12px var(--cyan)', animation: 'glow-pulse 2.5s infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)',
          }}>
           
            {profile?.available ? 'Available for Work' : 'Currently Busy'}
          </span>
        </motion.div>

        {/* Name — two-line animated reveal */}
        <div style={{ overflow: 'hidden', marginBottom: '6px' }}>
          <motion.h1
            initial={{ y: '110%' }} animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22,1,0.36,1] }}
            style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(5rem, 13vw, 13rem)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
              color: 'var(--text)', display: 'block',
            }}
          >
            {first}
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
          <motion.h1
            initial={{ y: '110%' }} animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22,1,0.36,1] }}
            style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(5rem, 13vw, 13rem)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
              display: 'block', ...goldText,
            }}
          >
            {last}
          </motion.h1>
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: 'var(--font-head)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '24px',
          }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer · MERN Specialist', 2500,
              'React & Node.js Engineer', 2000,
              'MongoDB · Express · React · Node', 2000,
              'Building Premium Web Experiences', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22,1,0.36,1] }}
          style={{
            fontSize: '1.05rem', color: 'var(--muted)',
            lineHeight: 1.8, maxWidth: '520px', marginBottom: '48px',
          }}
        >
          {profile?.bio || "I architect and build complete web applications — from MongoDB schemas and Node.js APIs to pixel-perfect React interfaces. Clean code, bold design, real results."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '72px' }}
        >
          <Link to="projects" spy smooth offset={-80} duration={600}>
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(212,175,90,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '16px 36px',
                background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a)',
                backgroundSize: '200%',
                color: '#0a0a0b',
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '0.82rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', border: 'none',
                borderRadius: '6px', cursor: 'none',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <FiArrowRight size={15} /> See My Work
            </motion.button>
          </Link>

          {profile?.resumeUrl && (
            <motion.a
              href={profile.resumeUrl} target="_blank" rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '16px 36px',
                background: 'rgba(212,175,90,0.08)',
                border: '1px solid rgba(212,175,90,0.35)',
                color: 'var(--g1)',
                fontFamily: 'var(--font-head)', fontWeight: 600,
                fontSize: '0.82rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', borderRadius: '6px',
                cursor: 'none',
              }}
            >
              <FiDownload size={15} /> Resume
            </motion.a>
          )}

          <Link to="contact" spy smooth offset={-80} duration={600}>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '16px 36px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--muted)',
                fontFamily: 'var(--font-head)', fontWeight: 600,
                fontSize: '0.82rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', borderRadius: '6px',
                cursor: 'none',
              }}
            >
              <FiMail size={15} /> Contact
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', gap: '0' }}
        >
          {[
            { num: profile?.stats?.years || '3+',    label: 'Years Coding' },
            { num: profile?.stats?.projects || '15+', label: 'Projects Built' },
            { num: profile?.stats?.certs || '6+',     label: 'Certifications' },
            { num: '∞',                                label: 'Passion' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px 36px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-head)', fontSize: '2.8rem', fontWeight: 700,
                lineHeight: 1, ...goldText,
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--muted)', marginTop: '6px',
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: '48px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}
      >
        <div style={{
          width: '22px', height: '34px',
          border: '1.5px solid rgba(212,175,90,0.3)',
          borderRadius: '12px',
          display: 'flex', justifyContent: 'center', paddingTop: '6px',
        }}>
          <div style={{
            width: '3px', height: '7px',
            background: 'var(--g1)', borderRadius: '2px',
            animation: 'scroll-wheel 2.5s ease-in-out infinite',
          }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted2)',
        }}>Scroll</span>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero { padding: 120px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
