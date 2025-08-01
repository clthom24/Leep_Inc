import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/globals.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProfilePage from './pages/Profile';
import DiscoveryPage from './pages/Discovery';
import CollaborationPage from './pages/Collaboration';

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-500 underline">Tailwind is working!</h1>
      <div className="card mt-4">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <p className="read-the-docs mt-2">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/collab" element={<CollaborationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
