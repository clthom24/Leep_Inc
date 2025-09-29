// =============================================
// File: src/App.jsx
// Purpose: Top-level routes. Public pages render alone;
//          auth-only pages are wrapped with AppLayout (Sidebar + Outlet).
// =============================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LikedPage from "./pages/Liked";
import PlaylistsPage from "./pages/Playlists";
import ProfilePage from "./pages/Profile";
import DiscoveryPage from "./pages/Discovery";
import CollaborationPage from "./pages/Collaboration";
import AppLayout from "./components/common/AppLayout/AppLayout";

function PrivateRoute({ children }) {
  // TODO: add auth checks; for now pass through
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/collab" element={<CollaborationPage />} />

        {/* Auth-only (with shared layout) */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/playlists/*" element={<PlaylistsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
