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
import SignInPage from './pages/Authentication/sign-In';
import ForgotPasswordPage from './pages/Authentication/passwordReset';
import AppLayout from "./components/common/AppLayout/AppLayout";
import MessageDashboardPage from "./pages/Messages/MessageDashboard";
import Messages from "./pages/Messages/Messages";
import Requests from "./pages/Messages/Requests";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PricingPage from "./pages/Pricing";

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
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />

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
          
          <Route path="/messagedashboard" element={<MessageDashboardPage />}>
          <Route index element={<Messages />} />        {/* default tab */}
          <Route path="messages" element={<Messages />} />
          <Route path="requests" element={<Requests />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
