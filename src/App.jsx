// =============================================
// File: src/App.jsx
// Purpose: Top-level routing with persistent Header + Footer
// via RootLayout. Public and private pages share global chrome.
// =============================================

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import RootLayout from "./components/common/RootLayout";

// ---------- Public pages ----------
import LandingPage from "./pages/Landing";
import CollaborationPage from "./pages/Collaboration";
import SignInPage from "./pages/Authentication/sign-In";
import ForgotPasswordPage from "./pages/Authentication/passwordReset";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PricingPage from "./pages/Pricing";
import SignedOut from "./pages/SignedOut";
import Legal from "./pages/Legal/Legal";

// ---------- Private pages ----------
import AppLayout from "./components/common/AppLayout/AppLayout";
import ProfilePage from "./pages/Profile";
import LikedPage from "./pages/Liked";
import PlaylistsPage from "./pages/Playlists";
import MyMusicPage from "./pages/My-Music/my-Music";
import EventsPage from "./pages/Events/events";
import HomeSignedIn from "./pages/HomeSignedIn";

// ---------- Messages (nested) ----------
import MessageDashboardPage from "./pages/Messages/MessageDashboard";
import Messages from "./pages/Messages/Messages";
import Requests from "./pages/Messages/Requests";

// ---------- Auth logic ----------
function useAuth() {
  // Replace this with real authentication logic.
  return { isAuthenticated: true }; // temporary dev bypass
}

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}

// ---------- Fallback 404 ----------
function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>Page not found</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            textDecoration: "underline",
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

// ---------- Main Router ----------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- GLOBAL LAYOUT (Header + Footer persistent) ---------- */}
        <Route element={<RootLayout />}>
          {/* Landing page (now inside RootLayout) */}
          <Route index element={<LandingPage />} />

          {/* ---------- PUBLIC ---------- */}
          <Route path="/collab" element={<CollaborationPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/SignedOut" element={<SignedOut />} />
          <Route path="/Legal" element={<Legal />} />

          {/* ---------- PRIVATE (with shared AppLayout) ---------- */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/liked" element={<LikedPage />} />
              <Route path="/playlists/*" element={<PlaylistsPage />} />
              <Route path="/my-music" element={<MyMusicPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/HomeSignedIn" element={<HomeSignedIn />} />

              {/* Nested messages section */}
              <Route path="/messagedashboard" element={<MessageDashboardPage />}>
                <Route index element={<Messages />} />
                <Route path="messages" element={<Messages />} />
                <Route path="requests" element={<Requests />} />
              </Route>
            </Route>
          </Route>

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
