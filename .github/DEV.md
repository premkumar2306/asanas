# 🔧 Yogasara Developer Guide

This document contains technical details and feature breakdowns for contributing developers working on the Yogasara app.

---

## 📦 Features Overview

Yogasara is a full-featured yoga platform built with instructors and students in mind.

### Core Features
- Multi-language support (`i18n`)
- Yoga pose library from the Ashtanga Primary Series
- Live & pre-recorded class flows
- Instructor dashboard for:
  - Creating and managing classes
  - Viewing earnings and reports
  - Managing students and notes
- Student dashboard for:
  - Class scheduling
  - Session summaries
  - Mood tracking
- Streak system and motivation loop
- Zoom/Meet integration for live classes
- Instructor Notepad (private/shared notes)
- Flow Builder for custom yoga routines
- Admin email-based login (no password)

---

## 🧱 Folder Structure

```bash
src/
├── assets/              # Static assets like images, icons
├── components/          # Reusable UI components (e.g., Button, Card, Modal)
│   ├── common/          # Low-level generic components
│   └── layout/          # Navbar, Footer, Layout wrappers
├── config/              # Firebase & app-level configuration
├── context/             # React context for auth, theme, language, etc.
├── data/                # Static yoga pose data, metadata
├── flows/               # Session & flow logic (custom routines)
├── hooks/               # Custom React hooks (e.g., useAuth, useFirestoreQuery)
├── locales/             # Language JSON files for i18n
├── pages/               # Route-level pages for dashboard, classes, flows, etc.
│   ├── Instructor/      # Instructor-specific pages
│   ├── Student/         # Student-specific dashboard views
│   └── Auth/            # Sign-in, auth flow
├── styles/              # Tailwind and global styles
├── types/               # Global TypeScript types and interfaces
├── utils/               # Utility functions (e.g., formatDate, analytics helpers)
└── App.tsx              # Main entry point
```

---

## 🔐 Environment Setup

- `.env` should include:
  ```
  VITE_FIREBASE_API_KEY=
  VITE_FIREBASE_AUTH_DOMAIN=
  VITE_FIREBASE_PROJECT_ID=
  VITE_FIREBASE_STORAGE_BUCKET=
  VITE_FIREBASE_MESSAGING_SENDER_ID=
  VITE_FIREBASE_APP_ID=
  ADMIN_EMAIL=premkumar2306@gmail.com
  ```

---

## 🔥 Firebase Setup

Used services:
- Firebase Authentication (Email Link)
- Firestore (for instructors, classes, flows)
- Firebase Hosting
- Firebase Functions (future optional)
- GitHub Actions: deploy, weekly email jobs

Collections tracked in `FIRESTORE_SCHEMA.md`.

---

## 📊 Analytics

We use:
- Firebase Analytics (basic setup)
- Weekly summary via GitHub Actions to students
- RUM/APM via Datadog (backend APIs)
- Splunk (log monitoring)

---

## 📈 Game-Theory Features

- Daily streaks with reset logic
- Pose unlock progression
- Practice-based unlocks
- Mood Before/After tracking
- Class leaderboard (future)

---

## 📅 Upcoming Enhancements

- Stripe/PayPal integration
- Chat & DMs between students/instructors
- Audio-guided sessions
- Custom branding for instructors
- Instructor portfolios under subdomains

---

## 🧪 Testing

We currently use:
- Cypress for end-to-end (WIP)
- Vitest for unit testing (coming soon)
- Manual QA checklist in Notion

---

## 🧠 Want to Contribute?

Check open issues or roadmap. PRs welcome!

---

## 🚀 Onboarding Guide for Engineers

Welcome! Here’s how to get up and running fast:

### 🔧 Setup
1. Clone the repo:  
   `git clone https://github.com/your-org/yogasara.git`
2. Install dependencies:  
   `npm install`
3. Add a `.env` file (see example in this doc)
4. Run locally:  
   `npm run dev`
5. Visit `http://localhost:5173`

### 🛠 Key Areas to Know
- `components/` – Reusable elements for buttons, modals, etc.
- `pages/` – All route-based logic for instructors, students
- `flows/` – Core logic for yoga session building
- `context/` – Auth and theme providers
- `config/firebase.ts` – Firebase init
- `FIRESTORE_SCHEMA.md` – Firestore collection structure
- `README.dev.md` – You’re here!

### 🤝 Need Help?
- For access issues or bugs, ping the lead developer.
- Check open issues or Notion onboarding board.
- Unsure where to put a feature? Ask in the dev chat.

Let’s build something peaceful and powerful ✌️
