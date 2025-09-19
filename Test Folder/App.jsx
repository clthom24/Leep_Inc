// =============================================
// File: src/App.jsx
// Purpose: Define top-level routes and wrap auth-only pages with PrivateRoute.
// =============================================
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LikedPage from "./pages/Liked";
import PlaylistsPage from "./pages/Playlists";
import ProfilePage from "./pages/Profile";
import DiscoveryPage from "./pages/Discovery";
import CollaborationPage from "./pages/Collaboration";

function PrivateRoute({ children }) {
  // temp: render children without auth checks
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/collab" element={<CollaborationPage />} />

        {/* Auth-only routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists/*"
          element={
            <PrivateRoute>
              <PlaylistsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
