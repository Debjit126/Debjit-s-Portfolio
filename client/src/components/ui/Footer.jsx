import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <FiGithub size={16} />,   href: profile?.github   || '#', label: 'GitHub' },
    { icon: <FiLinkedin size={16} />, href: profile?.linkedin || '#', label: 'LinkedIn' },
    { icon: <FiTwitter size={16} />,  href: profile?.twitter  || '#', label: 'Twitter' },
    { icon: <FiMail size={16} />,     href: `mailto:${profile?.email || 'debjitdey336@gmail.com'}`, label: 'Email' },
  ];

  return (
    <footer style={{
      background: 'var(--ink)',
      borderTop: '1px solid var(--line)',
      padding: '40px 64px',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
      }}>
        {/* Left — logo + copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700,
            background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
          }}>DD</div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.1em', color: 'var(--muted2)',
          }}>
            © {year} Debjit Dey · Built with MERN Stack
          </span>
        </div>

        {/* Center — socials */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {socials.map(({ icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noreferrer"
              whileHover={{ y: -4, color: 'var(--g1)', borderColor: 'rgba(212,175,90,0.35)' }}
              title={label}
              style={{
                width: '36px', height: '36px',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted2)', cursor: 'none',
                transition: 'all 0.3s',
              }}
            >
              {icon}
            </motion.a>
          ))}
        </div>

        {/* Right — back to top */}
        <Link to="hero" spy smooth offset={0} duration={800}>
          <motion.button
            whileHover={{ y: -4, borderColor: 'rgba(212,175,90,0.4)', color: 'var(--g1)' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--muted2)', background: 'none', border: '1px solid var(--line)',
              padding: '8px 16px', borderRadius: '6px',
              cursor: 'none', transition: 'all 0.3s',
            }}
          >
            <FiArrowUp size={13} /> Back to top
          </motion.button>
        </Link>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer { padding: 32px 20px !important; }
          footer > div { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
