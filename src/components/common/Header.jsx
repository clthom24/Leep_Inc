// =============================================
// File: src/components/common/Header.jsx
// Purpose: Global top navigation for Leep Audio.
// Works for both public and private routes, matching
// paths defined in App.jsx.
// =============================================

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.jpg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Temporary auth state — replace with real auth logic or context
  const isSignedIn = location.pathname.startsWith("/profile") ||
                     location.pathname.startsWith("/liked") ||
                     location.pathname.startsWith("/playlists") ||
                     location.pathname.startsWith("/my-music") ||
                     location.pathname.startsWith("/events") ||
                     location.pathname.startsWith("/HomeSignedIn") ||
                     location.pathname.startsWith("/messagedashboard");

  // Navigation paths based on App.jsx
  const homePath = isSignedIn ? "/HomeSignedIn" : "/";
  const collabPath = "/collab";
  const aboutPath = "/about";
  const contactPath = "/contact";
  const pricingPath = "/pricing";
  const profilePath = "/profile";
  const myMusicPath = "/my-music";
  const eventsPath = "/events";
  const messagesPath = "/messagedashboard";

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    if (q) {
      navigate(`/collab?q=${encodeURIComponent(q)}`); // Example: reuse collab page for search
    }
  };

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
          {/* Public links */}
          {!isSignedIn && (
            <>
              <Link to={aboutPath} className="btn-outline">About</Link>
              <Link to={pricingPath} className="btn-outline">Pricing</Link>
              <Link to={contactPath} className="btn-outline">Contact</Link>
              <Link to={collabPath} className="btn-outline">Collab</Link>
            </>
          )}

          {/* Auth links */}
          {isSignedIn ? (
            <>
              <Link to={profilePath} className="icon-button" aria-label="Profile">
                <span className="icon user" />
              </Link>
              
              <Link to="/notifications" className="icon-button" aria-label="Notifications">
                <span className="icon bell" />
              </Link>

              <Link to="/contact" className="icon-button" aria-label="Contact">
                <span className="icon contact" />
              </Link>

              <Link to="/settings" className="icon-button" aria-label="Settings">
                <span className="icon settings" />
              </Link>

              <Link to="/" className="btn-primary">Sign Out</Link>
            </>
          ) : (
            <Link to="/sign-in" className="btn-primary">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
