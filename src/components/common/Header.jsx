// src/components/common/Header.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.jpg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Signed-in pages live under /home/*
  const isSignedIn = location.pathname.startsWith("/home");

  const homePath = isSignedIn ? "/home" : "/";
  const searchPath = isSignedIn ? "/home/search" : "/search";
  const pricingPath = isSignedIn ? "/home/pricing" : "/pricing";
  const helpPath = isSignedIn ? "/home/help" : "/help";
  const notificationsPath = "/home/notifications";
  const profilePath = "/home/profile";

  function onSearchSubmit(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    if (q) navigate(`${searchPath}?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to={homePath} className="brand" aria-label="Leep Audio home">
          <img src={logo} alt="" className="logo-img" />
          <span className="brand-name">Leep Audio</span>
        </Link>

        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            name="q"
            className="search-input"
            placeholder="Search for artists or songs..."
          />
          <button className="icon-button" type="submit" aria-label="Search">
            <span className="icon search" />
          </button>
        </form>

        <nav className="user-nav" aria-label="Header actions">
          <Link to={pricingPath} className="btn-outline">
            <span className="icon tag" />
            <span>Pricing</span>
          </Link>

          {isSignedIn && (
            <Link
              to={notificationsPath}
              className="icon-button"
              aria-label="Notifications"
            >
              <span className="icon bell" />
            </Link>
          )}

          <Link to={helpPath} className="icon-button" aria-label="Help">
            <span className="icon help" />
          </Link>

          {isSignedIn ? (
            <Link
              to={profilePath}
              className="icon-button"
              aria-label="Profile"
            >
              <span className="icon user" />
            </Link>
          ) : (
            <Link to="/home" className="btn-primary">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
