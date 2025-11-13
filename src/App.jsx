// =============================================
// File: src/App.jsx
// Purpose: Top-level routing with persistent Header + Footer
// via RootLayout. Public pages and private pages share the
// same global chrome. Auth-only pages are still wrapped by
// AppLayout (sidebar + Outlet) and gated by PrivateRoute.
// =============================================

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import RootLayout from "./components/common/RootLayout";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// ---------- Public pages ----------
import LandingPage from "./pages/Landing";
import CollaborationPage from "./pages/Collaboration";
import SignInPage from "./pages/Authentication/sign-In";
import ForgotPasswordPage from "./pages/Authentication/passwordReset";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PricingPage from "./pages/Pricing";
import SignedOut from "./pages/SignedOut";
import NewPasswordPage from "./pages/Authentication/newPassword";
import EmailConfirmationPage from "./pages/Authentication/emailConfirmation";

// ---------- Private pages ----------
import AppLayout from "./components/common/AppLayout/AppLayout";
import ProfilePage from "./pages/Profile";
import LikedPage from "./pages/Liked";
import PlaylistsPage from "./pages/Playlists";
import MyMusicPage from "./pages/My-Music/my-Music";
import EventsPage from "./pages/Events/events";
import HomeSignedIn from "./pages/HomeSignedIn";
import AccountStartupPage from "./pages/Authentication/accountStartup";

// ---------- Messages (nested) ----------
import MessageDashboardPage from "./pages/Messages/MessageDashboard";
import Messages from "./pages/Messages/Messages";
import Requests from "./pages/Messages/Requests";

// ---------- Auth logic ----------
function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "PASSWORD_RECOVERY") {
        localStorage.setItem("isPasswordRecovery", "true");
      }

      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return {
    isAuthenticated: !!session,
    session,
    loading,
  };
}

function PrivateRoute() {
  const { session, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const [delayDone, setDelayDone] = useState(false);

  const isRecovery = localStorage.getItem("isPasswordRecovery") === "true";

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchRole() {
      if (!session) {
        setCheckingRole(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!error) {
        setRole(data?.role ?? null);
      }

      setCheckingRole(false);
    }

    fetchRole();
  }, [session]);

  // Still checking session or role
  if (loading || checkingRole || !delayDone) {
    return <div style={{ textAlign: "center", padding: 40 }}>Checking account...</div>;
  }

  // Not signed in at all
  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  // Reset password flow
  if (isRecovery) {
    return <Navigate to="/new-password" replace />;
  }

  // User signed in but no role → force onboarding
  if (role === null) {
    return <Navigate to="/account-startup" replace />;
  }

  // Allow access
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
          <Route path="/" element={<LandingPage />} />
        <Route element={<RootLayout />}>
          {/* ---------- PUBLIC ---------- */}
          <Route path="/collab" element={<CollaborationPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/SignedOut" element={<SignedOut />} />
          <Route path="/new-password" element={<NewPasswordPage />} />
          <Route path="/account-startup" element={<AccountStartupPage />} />
          <Route path="/email-confirmation" element={<EmailConfirmationPage />} />

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