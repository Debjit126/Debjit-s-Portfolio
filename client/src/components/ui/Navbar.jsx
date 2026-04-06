import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import profileImg from '../../assets/image.jpg';

const NAV_LINKS = [
  { label: 'About',    to: 'about' },
  { label: 'Skills',   to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Certs',    to: 'certifications' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: scrolled ? '0 64px' : '0 64px',
    height: scrolled ? '60px' : '72px',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    background: 'rgba(10,10,11,0.8)',
    borderBottom: '1px solid var(--line)',
    transition: 'height 0.4s var(--ease)',
  };

  return (
    <>
      <motion.nav
        style={navStyle}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
       <div
  style={{
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '2px solid #d4af5a',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.boxShadow = '0 0 15px #d4af5a';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  }}
>
  <img
    src={profileImg}
    alt="logo"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</div>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }} className="nav-desktop">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to} spy smooth offset={-80} duration={600}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  cursor: 'none', transition: 'color 0.3s',
                }}
                activeStyle={{ color: 'var(--g1)' }}
                onMouseEnter={e => e.target.style.color = 'var(--g2)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="contact" spy smooth offset={-80} duration={600}
          style={{
            fontFamily: 'var(--font-head)', fontWeight: 600,
            fontSize: '0.78rem', letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '9px 22px',
            border: '1px solid rgba(212,175,90,0.35)',
            color: 'var(--g1)', borderRadius: '6px',
            transition: 'all 0.35s',
            cursor: 'none',
          }}
          className="nav-cta"
          onMouseEnter={e => {
            e.target.style.borderColor = 'var(--g1)';
            e.target.style.color = 'var(--g2)';
            e.target.style.background = 'rgba(212,175,90,0.07)';
          }}
          onMouseLeave={e => {
            e.target.style.borderColor = 'rgba(212,175,90,0.35)';
            e.target.style.color = 'var(--g1)';
            e.target.style.background = 'transparent';
          }}
        >
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="nav-hamburger"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--g1)', fontSize: '1.4rem', cursor: 'none',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: '60px', left: 0, right: 0,
              background: 'rgba(10,10,11,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 799,
              padding: '24px',
              borderBottom: '1px solid var(--line)',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to} to={to} spy smooth offset={-80} duration={600}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.2rem',
                  fontWeight: 600, color: 'var(--text)', cursor: 'none',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="contact" spy smooth offset={-80} duration={600}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-head)', fontSize: '1rem',
                fontWeight: 700, color: 'var(--g1)', marginTop: '8px',
                cursor: 'none',
              }}
            >
              → Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        nav { padding-left: 32px !important; padding-right: 32px !important; }
        @media (min-width: 769px) {
          nav { padding-left: 64px !important; padding-right: 64px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
