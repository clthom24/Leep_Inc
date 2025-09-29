// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";

import SignedOut from "./pages/SignedOut/index.jsx";
import HomeSignedIn from "./pages/HomeSignedIn/index.jsx";
import Search from "./pages/Search/index.jsx";
import Profile from "./pages/Profile/index.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* ---------- Signed OUT ---------- */}
        <Route index element={<SignedOut />} />
        <Route path="search" element={<Search />} />
        <Route path="pricing" element={<div />} />
        <Route path="help" element={<div />} />
        <Route path="notifications" element={<div />} />

        {/* ---------- Signed IN (/home/...) ---------- */}
        <Route path="home" element={<HomeSignedIn />} />
        <Route path="home/search" element={<Search />} />
        <Route path="home/profile" element={<Profile />} />
        <Route path="home/pricing" element={<div />} />
        <Route path="home/help" element={<div />} />
        <Route path="home/notifications" element={<div />} />

        {/* Optional mirror */}
        <Route path="profile" element={<Profile />} />

        {/* Section-aware fallbacks */}
        <Route path="home/*" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
