import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


import './styles/globals.css';

import useFetch from './hooks/useFetch';
import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchCertifications,
} from './utils/api';


import Cursor  from './components/ui/Cursor';
import Navbar  from './components/ui/Navbar';
import Footer  from './components/ui/Footer';
import Loader  from './components/ui/Loader';


import Hero          from './components/sections/Hero';
import About         from './components/sections/About';
import Skills        from './components/sections/Skills';
import Experience    from './components/sections/Experience';
import Projects      from './components/sections/Projects';
import GitHubStats   from './components/sections/GitHubStats';
import Certifications from './components/sections/Certifications';
import Contact       from './components/sections/Contact';

function App() {
  const [appReady, setAppReady] = useState(false);

  
  const { data: profile }        = useFetch(fetchProfile);
  const { data: projects }       = useFetch(fetchProjects);
  const { data: skills }         = useFetch(fetchSkills);
  const { data: experience }     = useFetch(fetchExperience);
  const { data: certifications } = useFetch(fetchCertifications);

  
  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  
  const githubUsername = profile?.github
    ? profile.github.replace(/.*github\.com\//, '').replace(/\/$/, '')
    : 'debjitdey336';

  return (
    <>
   
      <Cursor />
      <div className="noise-overlay" />

     
      <AnimatePresence>
        {!appReady && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main app */}
      <AnimatePresence>
        {appReady && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />

            <main>
              <Hero          profile={profile} />
              <About         profile={profile} />
              <Skills        skills={skills} />
              <Experience    experience={experience} />
              <Projects      projects={projects} />
              <GitHubStats   githubUsername={githubUsername} />
              <Certifications certifications={certifications} />
              <Contact       profile={profile} />
            </main>

            <Footer profile={profile} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
