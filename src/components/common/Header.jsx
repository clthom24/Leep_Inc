// =============================================
// File: src/components/common/Header.jsx
// Purpose: Global top navigation for Leep Audio.
// Simplified to use Supabase session instead of
// guessing auth state from current route.
// =============================================

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import logo from "../../assets/leep-logo.png";

export default function Header() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // --- Track Supabase session ---
  useEffect(() => {
    // Get initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    // Subscribe to auth state changes (sign in / sign out)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // True if user is signed in
  const isSignedIn = !!session;

  // --- Handle Sign Out ---
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in"); // Redirect to sign-in page
  };

  // --- Search handler ---
  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    if (q) navigate(`/collab?q=${encodeURIComponent(q)}`);
  };

  // --- Routes ---
  const homePath = isSignedIn ? "/HomeSignedIn" : "/";
  const collabPath = "/collab";
  const aboutPath = "/about";
  const contactPath = "/contact";
  const pricingPath = "/pricing";
  const profilePath = "/profile";

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo / Brand */}
        <Link to={homePath} className="brand" aria-label="Leep Audio home">
          <img src={logo} alt="Leep Audio logo" className="logo-img" />
          <span className="brand-name">Leep Audio</span>
        </Link>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            name="q"
            className="search-input"
            placeholder="Search for artists or songs..."
          />
          <button className="icon-button" type="submit" aria-label="Search">
            <span className="icon search" />
          </button>
        </form>

        {/* Navigation */}
        <nav className="user-nav" aria-label="Header navigation">
          {!isSignedIn && (
            <>
              <Link to={aboutPath} className="btn-outline">About</Link>
              <Link to={pricingPath} className="btn-outline">Pricing</Link>
              <Link to={contactPath} className="btn-outline">Contact</Link>
              <Link to={collabPath} className="btn-outline">Collab</Link>
              <Link to="/sign-in" className="btn-primary">Sign In</Link>
            </>
          )}

          {isSignedIn && (
            <>
              <Link to={profilePath} className="icon-button" aria-label="Profile">
                <span className="icon user" />
              </Link>
              <Link to="/notifications" className="icon-button" aria-label="Notifications">
                <span className="icon bell" />
              </Link>
              <Link to="/settings" className="icon-button" aria-label="Settings">
                <span className="icon settings" />
              </Link>

              {/* Use a button for proper sign-out */}
              <button onClick={handleSignOut} className="btn-primary">
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}