# Leep Inc. Developer Guide

![Node.js](https://img.shields.io/badge/node-v20.12.2-brightgreen)
![Vite](https://img.shields.io/badge/bundler-vite_4.0-purple)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-enabled-blue)
![React](https://img.shields.io/badge/react-18+-blue)

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
├── public/                   # Static public assets like index.html and logos
├── src/                      # All frontend application logic lives here
│   ├── assets/               # Static assets like SVGs, images, etc.
│   ├── components/           # Reusable components
│   │   └── common/           # Shared UI components used across pages (e.g., Button.jsx)
│   ├── context/              # Global app state with React Context (e.g., AuthProvider)
│   ├── hooks/                # Custom React hooks (e.g., useAuth, usePlayer)
│   ├── pages/                # Top-level route pages
│   │   ├── Profile/          # Profile route and related layout/components
│   │   ├── Discovery/        # Discovery page components and logic
│   │   └── Collaboration/    # Collaboration/remix/upload UI
│   ├── services/             # Axios API utilities and integration functions
│   ├── styles/               # Tailwind global styles and design tokens
│   ├── utils/                # Helper functions (e.g., formatTime, parseWaveData)
│   ├── App.jsx               # App-level routes and layout wrappers
│   └── main.jsx              # Entry file for mounting the React app
├── .gitignore                # Files ignored by Git
├── index.html                # Base HTML file used by Vite
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
├── postcss.config.js         # PostCSS processor for Tailwind
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite bundler settings and aliases
└── README.md                 # Project overview and onboarding instructions
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
<summary><strong>🎨 TailwindCSS Guidelines</strong></summary>

Use utility classes or shared global classes defined in `src/styles/globals.css`. Examples include:

```jsx
<button className="btn-primary">Follow</button>
<div className="card-base">
  <h2 className="section-title">Top Songs</h2>
</div>
```

* Prefer `text-white`, `p-4`, `rounded-md`, etc. for layout.
* Use shared classes for buttons, cards, sections.

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

This guide should evolve as your team builds. Don’t hesitate to:

* Add new reusable classes to `globals.css`
* Expand the service layer as backend APIs evolve
* Ask teammates to review your code for consistency

You’re building something awesome — let’s keep it clean, scalable, and fun!
