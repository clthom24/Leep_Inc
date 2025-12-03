# Leep Inc. Developer Guide

![Node.js](https://img.shields.io/badge/node-v20.12.2-brightgreen)
![Vite](https://img.shields.io/badge/bundler-vite_4.0-purple)
![CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
![React](https://img.shields.io/badge/react-18+-blue)
![Supabase](https://supabase.com/docs)

Welcome to the **Leep Inc. Music Platform Developer Environment**. This guide is a complete walkthrough of our file structure, project setup, coding practices, and day-to-day development workflow. It is written to be beginner-friendly, yet detailed enough to support experienced team members.

---

<details>
<summary><strong>🔧 Project Foundation: Vite + React</strong></summary>

This project is scaffolded with **React + Vite**, which provides a lightweight, modern development experience. Vite enables:

* Instant startup
* Lightning-fast hot module replacement (HMR)
* Simpler build tooling

> ✅ We are using [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react), which relies on **Babel** for Fast Refresh.

To enable more powerful linting rules (e.g., type-aware), check out Vite's [React TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [typescript-eslint](https://typescript-eslint.io).

</details>

<details>
<summary><strong>📦 Project Description</strong></summary>

**Leep\_Inc** is a collaborative project focused on designing a user-centric music collaboration platform with an emphasis on **digital accessibility**, **workflow efficiency**, and **artist-driven tools**.

Commit SHA: `7623964f06e12e7cfc311f412c099de789683d15`

</details>

<details open>
<summary><strong>🧱 Project Structure Overview</strong></summary>

```
leep-platform/
├── backend/                  # Node.js backend server and upload handling
│   ├── server.js             # Express server
│   ├── uploads/              # File uploads storage
│   ├── README.md             # Backend documentation
│   ├── TESTING_GUIDE.md      # Backend testing instructions
│   └── package.json          # Backend dependencies
├── public/                   # Static public assets like hero images and mockups
│   ├── Mockups/              # Design mockups used in UI
│   ├── hero-background.jpg   # Landing visuals
│   ├── artist.jpg            # Default artist asset
│   └── leep.avif             # Optimized hero media
├── src/                      # Frontend application logic
│   ├── assets/               # Icons, images, and branding
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Shared layout components
│   │   ├── CollabComponents/ # Collaboration tools UI
│   │   └── MessagesComponents/ # Messaging‐related UI
│   ├── pages/                # Route pages for each app screen
│   │   ├── Landing/          # Marketing and onboarding flow
│   │   ├── Authentication/   # Sign in, reset password, onboarding
│   │   ├── Profile/          # Profile and user settings
│   │   ├── Collaboration/    # Editor and stem management
│   │   ├── Messages/         # Inbox, requests, threads
│   │   ├── Playlists/        # Playlist browsing
│   │   ├── My-Music/         # User music library
│   │   └── Liked/            # Saved and liked media
│   ├── styles/               # Global and modular CSS files
│   ├── supabaseClient.js     # Supabase initialization
│   ├── App.jsx               # App routing and layout
│   └── main.jsx              # React entry point
├── index.html                # Base HTML used by Vite
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS setup
├── postcss.config.cjs        # PostCSS processor for Tailwind
├── package.json              # Root project dependencies
├── package-lock.json         # Dependency lock file
├── .gitignore                # Git ignored files
└── README.md                 # Project overview and onboarding
```

</details>

<details>
<summary><strong>🚀 Project Setup</strong></summary>

### 1. Install Node.js

```bash
nvm install 20.12.2
nvm use 20.12.2
```

### 2. Clone the Repository

```bash
git clone <repo-url>
cd leep-platform
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install React Router DOM

```bash
npm install react-router-dom
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

</details>

<details>
<summary><strong>⚛️ React Guidelines</strong></summary>

* Component filenames must use PascalCase: `TrackCard.jsx`
* Route pages live in `src/pages/RouteName/index.jsx`
* Shared components go in `src/components/common/`
* Global state goes in `context/`
* Hooks go in `hooks/`

</details>

<details>
<summary><strong>🔌 API Integration</strong></summary>

* Use `axios` wrappers in `services/`

```js
import api from './api';
export const fetchTracks = () => api.get('/tracks');
```

Use in component:

```jsx
useEffect(() => {
  fetchTracks().then(res => setTracks(res.data));
}, []);
```

</details>

<details>
<summary><strong>🧪 Build & Deployment</strong></summary>

```bash
npm run build      # Build production version
npm run preview    # Preview production build
```

</details>

<details>
<summary><strong>❓ Common FAQs</strong></summary>

* **Tailwind not working?** Ensure `globals.css` is imported + contains Tailwind layers.
* **Routing not working?** Wrap app in `<BrowserRouter>` and define routes in `<Routes>`.
* **What's `@/`?** It's an alias to `src/` (set in `vite.config.js`).

</details>

<details>
<summary><strong>🧼 Best Practices</strong></summary>

* Extract reusable logic into hooks/components.
* Prefer composition over large monoliths.
* Use comments for complex logic.
* Use Tailwind + shared utility classes only.

</details>

<details>
<summary><strong>👥 Team Workflow</strong></summary>

* Create feature branches for every PR.
* Run `npm run dev` to test locally.
* Use readable commit messages.
* Keep your code modular and clean.

</details>

---

## ✅ Final Note

This guide should evolve as our team builds. Don’t hesitate to:

* Add new reusable classes to `globals.css`
* Expand the service layer as backend APIs evolve
* Ask teammates to review your code for consistency

We’re building something awesome — let’s keep it clean, scalable, and fun!
