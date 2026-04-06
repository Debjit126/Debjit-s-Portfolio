import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck, FiAlertCircle, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { submitContact } from '../../utils/api';
import { fadeUp, viewportConfig } from '../../utils/motion';

const InputField = ({ icon, label, type = 'text', name, value, onChange, required, textarea }) => {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    width: '100%',
    padding: '14px 16px 14px 44px',
    background: 'var(--surface)',
    border: `1px solid ${focused ? 'rgba(212,175,90,0.5)' : 'var(--line2)'}`,
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focused ? '0 0 0 3px rgba(212,175,90,0.08)' : 'none',
    resize: 'vertical',
    minHeight: textarea ? '140px' : 'auto',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: focused ? 'var(--g1)' : 'var(--muted)',
        marginBottom: '8px', transition: 'color 0.3s',
      }}>
        {label}{required && ' *'}
      </label>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: '14px',
          top: textarea ? '16px' : '50%',
          transform: textarea ? 'none' : 'translateY(-50%)',
          color: focused ? 'var(--g1)' : 'var(--muted)',
          transition: 'color 0.3s', pointerEvents: 'none',
        }}>
          {icon}
        </div>
        {textarea ? (
          <textarea
            name={name} value={value} onChange={onChange} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...baseStyle, paddingTop: '14px' }}
            placeholder={`Your ${label.toLowerCase()}...`}
          />
        ) : (
          <input
            type={type} name={name} value={value} onChange={onChange} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={baseStyle}
            placeholder={`Your ${label.toLowerCase()}...`}
          />
        )}
      </div>
    </div>
  );
};

const Contact = ({ profile }) => {
  const [ref, inView] = useInView(viewportConfig);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const goldText = {
    background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a,#d4af5a)',
    backgroundSize: '200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 5s linear infinite',
  };

  const socials = [
    { icon: <FiGithub size={18} />,   href: profile?.github   || '#', label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, href: profile?.linkedin || '#', label: 'LinkedIn' },
    { icon: <FiTwitter size={18} />,  href: profile?.twitter  || '#', label: 'Twitter' },
  ];

  return (
    <section id="contact" style={{ background: 'var(--ink)', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '800px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,175,90,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }} ref={ref}>

        {/* Big headline */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--g1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '14px', marginBottom: '20px',
          }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--g1)', display: 'block' }} />
            Let's Connect
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px',
          }}>
            Let's build<br />
            <span style={{ ...goldText }}>something great.</span>
          </h2>
          <p style={{
            color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8,
            maxWidth: '480px', margin: '0 auto',
          }}>
            Have a project in mind? Looking for a dedicated full-stack developer? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          gap: '64px', alignItems: 'start',
        }} className="contact-layout">

          {/* Left — info */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            {/* Email CTA */}
            <motion.a
              href={`mailto:${profile?.email || 'debjitdey336@gmail.com'}`}
              whileHover={{ y: -3, borderColor: 'var(--g1)', boxShadow: '0 0 48px rgba(212,175,90,0.12)' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 28px',
                border: '1px solid rgba(212,175,90,0.25)',
                borderRadius: '10px',
                color: 'var(--g1)',
                fontFamily: 'var(--font-mono)', fontSize: '0.92rem',
                marginBottom: '32px', cursor: 'none',
                transition: 'all 0.4s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <FiMail size={18} />
              {profile?.email || 'debjitdey336@gmail.com'}
            </motion.a>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
              {socials.map(({ icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ y: -5, borderColor: 'rgba(212,175,90,0.4)', color: 'var(--g1)', background: 'rgba(212,175,90,0.05)' }}
                  title={label}
                  style={{
                    width: '48px', height: '48px',
                    border: '1px solid var(--line2)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', cursor: 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Info tiles */}
            {[
              { label: 'Response Time', value: 'Within 24 hours' },
              { label: 'Availability',  value: profile?.available ? 'Open to new projects' : 'Currently booked' },
              { label: 'Timezone',      value: 'IST (UTC+5:30)' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: '16px 0',
                borderBottom: '1px solid var(--line)',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {label}
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            custom={2}
          >
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <InputField icon={<FiUser size={15} />}    label="Name"    name="name"    value={form.name}    onChange={onChange} required />
                <InputField icon={<FiMail size={15} />}    label="Email"   name="email"   value={form.email}   onChange={onChange} required type="email" />
              </div>
              <InputField icon={<FiMessageSquare size={15} />} label="Subject" name="subject" value={form.subject} onChange={onChange} />
              <InputField icon={<FiMessageSquare size={15} />} label="Message" name="message" value={form.message} onChange={onChange} required textarea />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status === 'idle' ? { y: -3, boxShadow: '0 16px 48px rgba(212,175,90,0.3)' } : {}}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '16px 36px',
                  background: status === 'success'
                    ? 'rgba(0,255,209,0.15)'
                    : status === 'error'
                    ? 'rgba(255,80,80,0.15)'
                    : 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a)',
                  backgroundSize: '200%',
                  color: status === 'idle' ? 'var(--ink)' : 'var(--text)',
                  fontFamily: 'var(--font-head)', fontWeight: 700,
                  fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: status !== 'idle' ? '1px solid rgba(212,175,90,0.3)' : 'none',
                  borderRadius: '8px', cursor: status === 'idle' ? 'none' : 'default',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'all 0.3s',
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Sending…
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)' }}>
                      <FiCheck size={16} /> Message Sent!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiAlertCircle size={16} /> {errMsg}
                    </motion.span>
                  )}
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiSend size={15} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
