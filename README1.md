`yogasara-app-final-v1/
├── web/
│   ├── public/data/poses.json          ✅ 100+ yoga poses
│   ├── assets/poses/                   ✅ SVG illustrations
│   ├── src/
│   │   ├── App.tsx, main.tsx
│   │   ├── firebase.ts
│   │   ├── styles/global.css
│   │   ├── pages/
│   │   │   ├── InstructorSignup.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── FlowBuilder.tsx
│   │   │   └── SessionSummary.tsx
│   │   ├── components/
│   │   │   ├── Instructor/Dashboard.tsx, ClassCard.tsx
│   │   │   ├── Student/Player.tsx
│   │   │   └── Shared/Navbar.tsx, Footer.tsx
│   │   ├── routes/index.tsx
│   │   └── i18n/index.ts
│   ├── tailwind.config.js, postcss.config.js, vite.config.ts
│   └── package.json
├── api/
│   └── sendWeeklyRecap.ts              ✅ basic cloud function
├── .github/workflows/firebase-deploy.yml
├── README.md, FIRESTORE_SCHEMA.md, .env.example





✅ Key Features Implemented
Yoga Pose Library (JSON + SVG)

Instructor + Student layout (basic scaffold done)

GMeet + YouTube link support (structure)

i18n support (English/Spanish setup)

Mood Before / After Tracker (UI planned)

Instructor Notepad (planned)

Flow Builder (layout ready)

GitHub Action: deploy + weekly recap email (template)

Yogasara App – Business Requirements
🌐 1. User Types
a. Students
Can view and attend yoga classes (live or video)

Track progress and mood

Receive weekly summaries

Unlock poses as they practice more

b. Instructors
Create & manage yoga classes

Build custom session flows

Track student progress & mood

Share GMeet/Zoom links for live sessions

Personal branding: their own subdomain or domain

c. Admin
Hardcoded email login (premkumar2306@gmail.com)

Access all instructor accounts

Moderate flows, sessions, notes

🧭 2. Instructor Dashboard
Feature	Description
Dashboard Overview	Summary cards: total students, earnings, active classes
Class Management	Add/Edit/Delete classes, with: title, time, duration, GMeet link, session type
Flow Assignment	Assign a preset or custom flow (sequence of poses/videos) to each class
Student List	View enrolled students per class
Instructor Notepad ✏️	Write notes per student or per class (private or shared)
Branding Options	Add bio, logo, profile picture, preferred color theme
🎓 3. Student Dashboard
Feature	Description
Session Player (Down Dog–style)	Watch pre-recorded classes, play pose-by-pose
Live Class Join	Join GMeet/Zoom from session link
Mood Before / After Tracker	Log mood before and after class for mental wellness insights
Weekly Recap	See summary of classes attended, streaks, mood change
Progress Unlocks	Unlock new poses, themes, or rewards based on streaks
🧱 4. Core System Features
Feature	Description
Yoga Pose Library	100+ poses with SVG image, name, Sanskrit name, difficulty, tags
Flow Builder	Instructors build flows using drag-and-drop pose selector
Preset Flows	Admin-defined starter flows for quick use
Firestore DB	Auth, classes, flows, notes, moods, and user info
Firebase Auth	Email-based (or passwordless) login for students/instructors
i18n Support	App starts with English + Spanish, ready to add more languages
💬 5. Community + Engagement (Optional Phase)
Feature	Description
Community Feed	Share progress, unlocks, and streaks (private leaderboard)
Chat Between Students	Future enhancement for accountability partners
Class Reminders (Push/Email)	Notify about upcoming sessions
🧪 6. Analytics & Admin Tools
Feature	Description
Admin Dashboard	View instructors, students, usage, class count
Weekly Email Recaps	GitHub Action triggers function to send summary
Firebase Analytics	Track user sessions, flow completion, most-used classes
💸 7. Monetization (Freemium Model)
Tier	Features
Free	Access to limited daily sessions, basic flows, 1 instructor
Premium ($5–10/month)	Unlimited classes, flow history, full pose library
Instructor Plan	Pay per month to host own branded class app (via subdomain)
🌍 8. Hosting & Domains
Feature	Description
Firebase Hosting	Default deployment with CI/CD
Instructor Subdomain	Each instructor gets e.g. alice.yogasara.app
Custom Domain Support	Optional: point to DNS (instructor config in dashboard)
✅ MVP Scope Checklist
Must-Have for First Launch
Instructor class system + dashboard
Student pose session player
Mood tracking
Flow builder
Firebase Auth + Firestore
GMeet integration
GitHub CI/CD
Admin account
SVG Yoga pose library
`