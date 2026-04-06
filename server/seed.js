/**
 * SEED SCRIPT — Run once to populate your MongoDB
 * Usage: node server/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Profile       = require('./models/Profile');
const Project       = require('./models/Project');
const Skill         = require('./models/Skill');
const Experience    = require('./models/Experience');
const Certification = require('./models/Certification');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Promise.all([
      Profile.deleteMany(),
      Project.deleteMany(),
      Skill.deleteMany(),
      Experience.deleteMany(),
      Certification.deleteMany(),
    ]);
    console.log('🗑  Cleared existing data');

    // ── Profile ───────────────────────────────────────────
    await Profile.create({
      name: 'Debjit Dey',
      title: 'Full Stack Developer',
      subtitle: 'MERN Specialist',
      bio: "I'm a full-stack developer from West Bengal, India, specialising in the MERN stack. With a deep passion for both engineering and design, I build web products that are as performant as they are beautiful.",
      bio2: "Every project I take on is an opportunity to craft something exceptional — clean architecture on the backend, intuitive experiences on the front. I care about the details that most miss.",
      location: 'West Bengal, India',
      email: 'debjitdey336@gmail.com',
      github: 'https://github.com/debjitdey336',
      linkedin: 'https://linkedin.com/in/debjitdey',
      twitter: 'https://twitter.com/debjitdey',
      resumeUrl: '/resume.pdf',
      available: true,
      stats: { years: '3+', projects: '15+', certs: '6+' },
    });

    // ── Skills ────────────────────────────────────────────
    await Skill.insertMany([
      { category: 'Frontend',             icon: '⚡', order: 1, items: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Redux', 'Tailwind CSS', 'Responsive Design'] },
      { category: 'Backend & APIs',       icon: '🖥',  order: 2, items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Nodemailer', 'bcryptjs', 'Middleware'] },
      { category: 'Database',             icon: '🗄',  order: 3, items: ['MongoDB', 'Mongoose ODM', 'MongoDB Atlas', 'Schema Design', 'Aggregations'] },
      { category: 'DevOps & Deployment',  icon: '🚀', order: 4, items: ['Git & GitHub', 'Vercel', 'Render', 'Railway', 'npm / yarn', 'Environment Config'] },
      { category: 'Design & UX',          icon: '🎨', order: 5, items: ['Figma', 'CSS Animations', 'Framer Motion', 'Web Accessibility', 'UI Components'] },
      { category: 'Concepts & Practices', icon: '🔩', order: 6, items: ['MVC Architecture', 'CRUD Operations', 'Clean Code', 'Agile / Scrum', 'Code Review'] },
    ]);

    // ── Experience ────────────────────────────────────────
    await Experience.insertMany([
      {
        role: 'Full Stack Developer',
        company: 'Freelance & Independent Projects',
        period: '2024 — Present',
        description: 'Designing and delivering complete MERN-stack web applications for clients. Leading all phases from architecture and API design to frontend development and production deployment. Focused on performance, security, and exceptional UX.',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API', 'JWT'],
        current: true,
        order: 1,
      },
      {
        role: 'Web Development Intern',
        company: 'Tech Startup · Remote',
        period: '2023 — 2024',
        description: 'Contributed to React-based interfaces and Express APIs in an Agile team. Improved API response performance with optimized Mongoose queries and helped ship product features to thousands of active users.',
        tech: ['React', 'JavaScript', 'Git', 'Agile', 'Postman'],
        current: false,
        order: 2,
      },
      {
        role: 'Self-Directed Engineering',
        company: 'Personal Development',
        period: '2021 — 2023',
        description: 'Mastered the full MERN stack through structured learning, open-source exploration, and progressively complex personal projects. Built a solid foundation in web fundamentals, data structures, and software design.',
        tech: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
        current: false,
        order: 3,
      },
    ]);

    // ── Projects ──────────────────────────────────────────
    await Project.insertMany([
      {
        title: 'MERN E-Commerce Platform',
        description: 'Full-featured online store with product listings, cart management, user authentication, order processing, and an admin dashboard for inventory management. Built for scale with clean API architecture.',
        tag: 'Full Stack · Featured',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'bcryptjs'],
        github: 'https://github.com/debjitdey336',
        live: '#',
        emoji: '🏪',
        featured: true,
        order: 1,
      },
      {
        title: 'Real-Time Chat App',
        description: 'Live messaging platform with WebSocket integration, private rooms, online presence indicators, and full message history persisted in MongoDB.',
        tag: 'Real-Time App',
        tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        github: 'https://github.com/debjitdey336',
        live: '#',
        emoji: '💬',
        featured: false,
        order: 2,
      },
      {
        title: 'Task Management Dashboard',
        description: 'Kanban-style project tracker with drag-and-drop, team collaboration features, due dates, priority labels, and a clean analytics overview.',
        tag: 'Productivity Tool',
        tech: ['React', 'Redux', 'Express', 'MongoDB'],
        github: 'https://github.com/debjitdey336',
        live: '#',
        emoji: '📋',
        featured: false,
        order: 3,
      },
      {
        title: 'Developer Portfolio',
        description: 'This portfolio itself — a full MERN application with a CMS-style backend, dynamic project and skill management, and a contact form powered by Nodemailer.',
        tag: 'This Site',
        tech: ['React', 'Framer Motion', 'Node.js', 'MongoDB', 'Nodemailer'],
        github: 'https://github.com/debjitdey336',
        live: '#',
        emoji: '👤',
        featured: false,
        order: 4,
      },
    ]);

    // ── Certifications ────────────────────────────────────
    await Certification.insertMany([
      { name: 'Complete MERN Stack Developer Course',       issuer: 'Udemy',                          year: '2024', icon: '🎓', order: 1 },
      { name: 'React — The Complete Guide incl. Redux',     issuer: 'Udemy · Maximilian Schwarzmüller', year: '2023', icon: '⚛️', order: 2 },
      { name: 'Node.js, Express & MongoDB Bootcamp',        issuer: 'Udemy',                          year: '2023', icon: '🟢', order: 3 },
      { name: 'MongoDB for JavaScript Developers',          issuer: 'MongoDB University',              year: '2023', icon: '🗃',  order: 4 },
      { name: 'Responsive Web Design Certification',        issuer: 'freeCodeCamp',                   year: '2022', icon: '🌐', order: 5 },
      { name: 'JavaScript Algorithms & Data Structures',    issuer: 'freeCodeCamp',                   year: '2022', icon: '🏆', order: 6 },
    ]);

    console.log('🌱 Seed complete!');
    console.log('   ✓ 1 Profile');
    console.log('   ✓ 6 Skill groups');
    console.log('   ✓ 3 Experience entries');
    console.log('   ✓ 4 Projects');
    console.log('   ✓ 6 Certifications');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();
