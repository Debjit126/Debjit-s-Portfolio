import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiStar, FiGitCommit, FiUsers, FiBook } from 'react-icons/fi';
import { fadeUp, scaleIn, viewportConfig } from '../../utils/motion';

const GitHubStats = ({ githubUsername = 'debjitdey336' }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView(viewportConfig);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=6`),
        ]);
        if (userRes.ok) setStats(await userRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch {
        // silently fail — fallback UI shown
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [githubUsername]);

  const goldText = {
    background: 'linear-gradient(115deg,#b8922e,#d4af5a,#f5d98a,#d4af5a)',
    backgroundSize: '200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 5s linear infinite',
  };

  const statCards = stats ? [
    { icon: <FiBook size={16} />,      label: 'Public Repos',  value: stats.public_repos },
    { icon: <FiUsers size={16} />,     label: 'Followers',     value: stats.followers },
    { icon: <FiGitCommit size={16} />, label: 'Following',     value: stats.following },
    { icon: <FiStar size={16} />,      label: 'Total Stars',   value: repos.reduce((a, r) => a + r.stargazers_count, 0) },
  ] : [];

  return (
    <section id="github" style={{ background: 'var(--ink3)', padding: '100px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}
        >
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--g1)',
              display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px',
            }}>
              <span style={{ width: '28px', height: '1px', background: 'var(--g1)', display: 'block' }} />
              Open Source
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text)',
            }}>
              GitHub{' '}
              <span style={{ fontStyle: 'normal', fontFamily: 'var(--font-head)', ...goldText }}>
                Activity
              </span>
            </h2>
          </div>
          <motion.a
            href={`https://github.com/${githubUsername}`}
            target="_blank" rel="noreferrer"
            whileHover={{ y: -3, borderColor: 'var(--g1)', color: 'var(--g2)', background: 'rgba(212,175,90,0.07)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 28px',
              border: '1px solid rgba(212,175,90,0.35)',
              color: 'var(--g1)', borderRadius: '6px',
              fontFamily: 'var(--font-head)', fontWeight: 600,
              fontSize: '0.8rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', cursor: 'none',
              transition: 'all 0.3s',
            }}
          >
            <FiGithub size={15} /> View Profile
          </motion.a>
        </motion.div>

        {loading ? (
          /* Loading skeleton */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                height: '100px', background: 'var(--surface)',
                borderRadius: '10px', border: '1px solid var(--line)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '40px' }} className="gh-stats-grid">
              {statCards.map((s, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                  custom={i}
                  whileHover={{ y: -6, borderColor: 'rgba(212,175,90,0.25)' }}
                  style={{
                    padding: '28px 24px',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    display: 'flex', flexDirection: 'column', gap: '10px',
                  }}
                >
                  <div style={{ color: 'var(--g1)' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 700, ...goldText }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Profile card */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              custom={2}
              style={{
                padding: '28px 32px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', gap: '24px',
                marginBottom: '32px', flexWrap: 'wrap',
              }}
            >
              {stats.avatar_url && (
                <img
                  src={stats.avatar_url} alt="GitHub Avatar"
                  style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(212,175,90,0.3)' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                  {stats.name || githubUsername}
                </div>
                {stats.bio && (
                  <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{stats.bio}</div>
                )}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--g1)', padding: '6px 14px',
                border: '1px solid rgba(212,175,90,0.2)',
                borderRadius: '100px',
              }}>
                @{stats.login}
              </div>
            </motion.div>

            {/* Top repos */}
            {repos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="gh-repos-grid">
                {repos.slice(0, 6).map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url} target="_blank" rel="noreferrer"
                    variants={scaleIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    custom={i}
                    whileHover={{ y: -6, borderColor: 'rgba(212,175,90,0.25)', background: 'var(--s2)' }}
                    style={{
                      padding: '20px', background: 'var(--surface)',
                      border: '1px solid var(--line)', borderRadius: '10px',
                      cursor: 'none', transition: 'background 0.3s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                        {repo.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--g1)', fontSize: '0.78rem' }}>
                        <FiStar size={12} /> {repo.stargazers_count}
                      </div>
                    </div>
                    {repo.description && (
                      <div style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '12px' }}>
                        {repo.description.length > 80 ? repo.description.slice(0, 80) + '…' : repo.description}
                      </div>
                    )}
                    {repo.language && (
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        padding: '3px 8px',
                        background: 'rgba(0,255,209,0.06)',
                        border: '1px solid rgba(0,255,209,0.14)',
                        color: 'var(--cyan)', borderRadius: '3px',
                      }}>{repo.language}</span>
                    )}
                  </motion.a>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Fallback if API fails */
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{
              padding: '48px', textAlign: 'center',
              border: '1px solid var(--line)', borderRadius: '14px',
              background: 'var(--surface)',
            }}
          >
            <FiGithub size={32} style={{ color: 'var(--g1)', margin: '0 auto 16px' }} />
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '8px' }}>
              View My GitHub
            </div>
            <div style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Check out my open source projects and contributions.
            </div>
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer"
              style={{ color: 'var(--g1)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
              github.com/{githubUsername} →
            </a>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gh-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gh-repos-grid  { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .gh-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gh-repos-grid  { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default GitHubStats;
