import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiLayers, FiZap } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { fadeUp, slideLeft, slideRight, viewportConfig } from '../../utils/motion';
import profileImg from '../../assets/image.jpg';

const About = ({ profile }) => {
  const [ref, inView] = useInView(viewportConfig);

  const tiles = [
    { icon: <FiMapPin size={14} />, label: 'Location', value: profile?.location || 'West Bengal, India' },
    { icon: <FiMail size={14} />,   label: 'Email',    value: profile?.email    || 'debjitdey336@gmail.com' },
    { icon: <FiLayers size={14} />, label: 'Stack',    value: 'MongoDB · Express · React · Node' },
    { icon: <FiZap size={14} />,    label: 'Status',   value: profile?.available ? '● Open to Opportunities' : '● Not Available', cyan: profile?.available },
  ];

  return (
    <section id="about" style={{ background: 'var(--ink2)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.1fr',
        gap: '96px', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
      }} ref={ref} className="about-grid">

        {/* Photo / visual side */}
        <motion.div
          variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ position: 'relative' }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Main frame */}
            <div style={{
              width: '100%', aspectRatio: '4/5',
              background: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--line2)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Initials display */}
             
<div
  style={{
    position: 'relative',
    width: '100%',
    height: '655px',
    overflow: 'hidden'
  }}
>
  <img
    src={profileImg}
    alt="profile"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />

  <h1
    style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      color: '#fff',
      fontSize: '2rem'
    }}
  >
    {profile?.name || 'Debjit Dey'}
  </h1>
</div>

              {/* Subtle grid inside frame */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(212,175,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,90,0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} />
            </div>

            {/* Corner accents */}
            {[
              { top: '-12px', left: '-12px', borderTop: '2px solid var(--g1)', borderLeft: '2px solid var(--g1)', borderRadius: '4px 0 0 0' },
              { bottom: '-12px', right: '-12px', borderBottom: '2px solid var(--g1)', borderRight: '2px solid var(--g1)', borderRadius: '0 0 4px 0' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: '56px', height: '56px', opacity: 0.45, ...s }} />
            ))}

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.22,1,0.36,1] }}
              style={{
                position: 'absolute', bottom: '-22px', right: '-22px',
                background: 'var(--g1)', color: 'var(--ink)',
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '14px 22px', borderRadius: '8px',
                boxShadow: '0 16px 40px rgba(212,175,90,0.25)',
              }}
            >
              MERN Developer
            </motion.div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <SectionHeader
            tag="Who I Am"
            title="Turning ideas into"
            highlight="digital reality"
          />

          <motion.p variants={fadeUp} custom={3} style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '20px' }}>
            {profile?.bio || "I'm a full-stack developer from West Bengal, India, specialising in the MERN stack. With a deep passion for both engineering and design, I build web products that are as performant as they are beautiful."}
          </motion.p>
          <motion.p variants={fadeUp} custom={4} style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '36px' }}>
            {profile?.bio2 || "Every project I take on is an opportunity to craft something exceptional — clean architecture on the backend, intuitive experiences on the front. I care about the details that most miss."}
          </motion.p>

          {/* Info tiles */}
          <motion.div
            variants={fadeUp} custom={5}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
          >
            {tiles.map(({ icon, label, value, cyan }, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: 'rgba(212,175,90,0.3)' }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '20px',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--g1)', marginBottom: '7px',
                }}>
                  {icon} {label}
                </div>
                <div style={{
                  fontSize: '0.88rem', fontWeight: 500,
                  color: cyan ? 'var(--cyan)' : 'var(--text)',
                }}>
                  {value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
