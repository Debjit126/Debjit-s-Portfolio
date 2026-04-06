<<<<<<< HEAD
# Debjit-s-Portfolio
=======
# Debjit Dey — Portfolio v2.0 (MERN Stack)

A **production-grade full-stack portfolio** built with MongoDB, Express.js, React.js, and Node.js — featuring Apple-level UI, Framer Motion animations, GitHub stats integration, and a fully working contact form.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔥 Apple-level UI | Instrument Serif + Clash Display typography, gold palette, dark luxury aesthetic |
| ⚡ Framer Motion | Page-load cinematic entrance, scroll-triggered reveals, hover micro-interactions |
| 🖱 Custom Cursor | Gold dot + lagging ring that scales on interactive elements |
| 📝 Typewriter | React Type Animation cycling through roles |
| 🗂 Sections | Hero, About, Skills, Experience Timeline, Projects, GitHub Stats, Certifications, Contact |
| 📊 GitHub Stats | Live GitHub API — repos, followers, stars, top projects |
| 📬 Contact Form | Saves to MongoDB + sends Nodemailer email notification |
| 📱 Fully Responsive | Mobile-first, collapses gracefully across all breakpoints |
| 🌐 Deploy-ready | Vercel config included |
| 🌱 Seed Script | One command to populate your whole database |

---

## 📁 Project Structure

```
debjit-portfolio/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── sections/            # Hero, About, Skills, Experience,
│       │   │                        # Projects, GitHubStats, Certifications, Contact
│       │   └── ui/                  # Cursor, Navbar, Footer, Loader, SectionHeader
│       ├── hooks/
│       │   └── useFetch.js
│       ├── styles/
│       │   └── globals.css
│       ├── utils/
│       │   ├── api.js               # Axios API calls
│       │   └── motion.js            # Framer Motion variants
│       ├── App.jsx
│       └── index.js
├── server/                          # Node + Express backend
│   ├── controllers/                 # profileController, projectController, etc.
│   ├── models/                      # Profile, Project, Skill, Experience, Certification, Contact
│   ├── routes/                      # profile, projects, skills, experience, certifications, contact
│   ├── seed.js                      # Database seed script
│   └── index.js                     # Express entry point
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/debjit-portfolio.git
cd debjit-portfolio
npm run install-all
```

### 2. Environment variables
```bash
cp .env.example .env
```
Edit `.env`:
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/portfolio
PORT=5000
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
```

### 3. Seed database (first time only)
```bash
node server/seed.js
```

### 4. Run dev server
```bash
npm run dev
```
- Frontend → http://localhost:3000
- Backend  → http://localhost:5000

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B — Vercel Dashboard
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables in Vercel dashboard (same as `.env`)
4. Deploy — Vercel auto-detects the config from `vercel.json`

### Environment variables to add in Vercel:
```
MONGO_URI
PORT
NODE_ENV=production
EMAIL_USER
EMAIL_PASS
CLIENT_URL=https://your-domain.vercel.app
```

---

## ☁️ Deploy Backend Only (Render)

If you prefer a separate frontend/backend:

1. Push to GitHub
2. Render → New Web Service → Connect repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars in Render dashboard
6. In `client/src/utils/api.js`, set:
   ```js
   baseURL: process.env.REACT_APP_API_URL || 'https://your-api.onrender.com/api'
   ```
7. Deploy client to Vercel separately

---

## 🗄 API Endpoints

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | /api/profile              | Get profile data        |
| PUT    | /api/profile              | Update profile          |
| GET    | /api/projects             | Get all projects        |
| POST   | /api/projects             | Add project             |
| PUT    | /api/projects/:id         | Update project          |
| DELETE | /api/projects/:id         | Delete project          |
| GET    | /api/skills               | Get all skill groups    |
| POST   | /api/skills               | Add skill group         |
| PUT    | /api/skills/:id           | Update skill group      |
| DELETE | /api/skills/:id           | Delete skill group      |
| GET    | /api/experience           | Get experience          |
| POST   | /api/experience           | Add experience          |
| PUT    | /api/experience/:id       | Update experience       |
| DELETE | /api/experience/:id       | Delete experience       |
| GET    | /api/certifications       | Get certifications      |
| POST   | /api/certifications       | Add certification       |
| PUT    | /api/certifications/:id   | Update certification    |
| DELETE | /api/certifications/:id   | Delete certification    |
| POST   | /api/contact              | Submit contact form     |
| GET    | /api/contact              | Get all messages        |
| GET    | /api/health               | Health check            |

---

## 📧 Gmail App Password Setup

1. Google Account → Security → Enable 2-Step Verification
2. Security → App Passwords → Create password for "Mail"
3. Paste into `.env` as `EMAIL_PASS`

---

## ✏️ Customise Your Content

All content is seeded from `server/seed.js`. Edit that file then re-run:
```bash
node server/seed.js
```

Or update directly via API using any REST client (Postman, Insomnia, etc.).

**Change colors:** Edit CSS variables in `client/src/styles/globals.css` (`:root` block).

**GitHub stats:** The `GitHubStats` component uses the public GitHub API — just update the `githubUsername` prop in `App.jsx` or set your GitHub URL in the Profile seed.

---

## 🛠 Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | React 18, Framer Motion, React Icons, Axios   |
| Animations | Framer Motion 10, react-type-animation        |
| Backend    | Node.js, Express.js                           |
| Database   | MongoDB, Mongoose                             |
| Email      | Nodemailer (Gmail SMTP)                       |
| Fonts      | Instrument Serif, Clash Display, JetBrains Mono |
| Deploy     | Vercel (fullstack) or Render (backend)        |

---

Made with ❤️ by **Debjit Dey** · debjitdey336@gmail.com
>>>>>>> 6a3ddd2 (Initial commit - MERN portfolio)
