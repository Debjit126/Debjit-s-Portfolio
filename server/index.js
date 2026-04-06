// // const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();


// const app = express();

// // ── Middleware ─────────────────────────────────────────
// app.use(express.json());
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production'
//     ? process.env.CLIENT_URL
//     : 'http://localhost:3000',
//   credentials: true,
// }));

// // ── Routes ─────────────────────────────────────────────
// app.use('/api/profile',        require('./routes/profile'));
// app.use('/api/projects',       require('./routes/projects'));
// app.use('/api/skills',         require('./routes/skills'));
// app.use('/api/experience',     require('./routes/experience'));
// app.use('/api/certifications', require('./routes/certifications'));
// app.use('/api/contact',        require('./routes/contact'));

// // ── Health ─────────────────────────────────────────────
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// // ── Serve React build in production ───────────────────
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
//   );
// }

// // ── MongoDB ────────────────────────────────────────────
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });
// //
// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ───────────────────────────────
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:3000',
  credentials: true,
}));

// ── API Routes ───────────────────────────────
app.use('/api/profile',        require('./routes/profile'));
app.use('/api/projects',       require('./routes/projects'));
app.use('/api/skills',         require('./routes/skills'));
app.use('/api/experience',     require('./routes/experience'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/contact',        require('./routes/contact'));

// ── Health Check ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── MongoDB Connection ──────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ── Local Dev Server ────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; // Export for Vercel Serverless