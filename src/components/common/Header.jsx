// =============================================
// File: src/components/common/Header.jsx
// Purpose: Global top navigation for Leep Audio.
// Simplified to use Supabase session instead of
// guessing auth state from current route.
// =============================================

import { supabase } from "../../supabaseClient";
import logo from "../../assets/leep-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// --- Popover rendered in a portal so it's not clipped by header overflow ---
function NotificationPopover({
  open,
  anchorRef,
  popoverRef,
  notifications,
  unreadCount,
  onMarkAllRead,
  onClose,
}) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      // Position popover just below and right-aligned to the button
      setPosition({
        top: rect.bottom + 8, // 8px gap under the bell
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, anchorRef]);

  // Close on resize/scroll to avoid weird misalignment (optional)
  useEffect(() => {
    if (!open) return;
    const handle = () => onClose();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle);
    };
  }, [open, onClose]);

  if (!open || !position) return null;
  if (typeof document === "undefined") return null; // SSR safety

  return createPortal(
    <div
      id="notif-popover"
      ref={popoverRef}
      role="dialog"
      aria-label="Notifications"
      className="popover"
      style={{
        position: "fixed",
        top: position.top,
        right: position.right,
        zIndex: 9999,
      }}
    >
      <div className="popover-header">
        <span>Notifications</span>
        {unreadCount > 0 && (
          <button className="link-reset" onClick={onMarkAllRead}>
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">You’re all caught up 🎉</div>
      ) : (
        <ul className="notif-list" role="menu">
          {notifications.map((n) => (
            <li
              key={n.id}
              role="menuitem"
              className={`notif-item ${n.unread ? "unread" : ""}`}
            >
              <div className="notif-title">{n.title}</div>
              <div className="notif-meta">{n.time}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="popover-footer">
        <Link to="/homeSignedIn" className="btn-outline small" onClick={onClose}>
          View all
        </Link>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // --- Track Supabase session ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const isSignedIn = !!session;
  const isRecovery = localStorage.getItem("isPasswordRecovery") === "true";

  // Prevents a header flicker issue when user sets a new password in password recovery
  const isLocked = localStorage.getItem("headerLock") === "true";

  const showAsSignedOut = !isSignedIn || isRecovery || isLocked;

  // --- Handle Sign Out ---
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in");
  };

  // --- Routes ---
  const homePath = isSignedIn ? "/HomeSignedIn" : "/";
  const collabPath = "/collab";
  const aboutPath = "/about";
  const contactPath = "/contact";
  const pricingPath = "/pricing";
  const profilePath = "/profile";
  const myMusicPath = "/my-music";
  const eventsPath = "/events";
  const messagesPath = "/messagedashboard";

  // Mock notifications — replace with data from your API / context
  const [notifications, setNotifications] = useState([
    { id: "n1", title: "New remix on your track", time: "2m", unread: true },
    { id: "n2", title: "Alex left a comment", time: "1h", unread: true },
    { id: "n3", title: "Payout processed", time: "Yesterday", unread: false },
  ]);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Dialog state + a11y
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on click outside + Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    //if (q) navigate(`/collab?q=${encodeURIComponent(q)}`);
  };

  // Mark all as read (example)
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      className="site-header"
      style={{
        backgroundColor: "#15181c",
        width: "100%",
        overflowX: "auto",
        overflowY: "visible",
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: "100%",
          paddingBottom: "4px",
          paddingTop: "4px",
          marginLeft: "0.5vw",
          marginRight: "0px",
          gap: "14vw",
        }}
      >
        {/* Logo / Brand */}
        <Link to={homePath} className="brand" aria-label="Leep Audio home">
          <img
            src={logo}
            style={{ height: "56px", width: "56px" }}
            alt="Leep Audio logo"
            className="logo-img"
          />
          <span className="brand-name" style={{ fontSize: "19px" }}>
            Leep Audio
          </span>
        </Link>

        <span
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          {/* Search Bar */}
          <form
            className="search-form"
            onSubmit={handleSearch}
            style={{ paddingRight: "14px" }}
          >
            <input
              name="q"
              className="search-input"
              placeholder="Search for artists or songs..."
              aria-label="Search"
              style={{ height: "40px" }}
            />
            <button
              className="icon-button"
              type="submit"
              aria-label="Search"
              style={{ height: "40px", width: "40px" }}
            >
              <span className="icon search" />
            </button>
          </form>

          {/* Navigation */}
          <nav className="user-nav" aria-label="Header navigation">
            {showAsSignedOut ? (
              <>
                <Link to={aboutPath} className="btn-outline">
                  About
                </Link>
                <Link to={pricingPath} className="btn-outline">
                  Pricing
                </Link>
                <Link to={contactPath} className="btn-outline">
                  Contact
                </Link>
                <Link to="/sign-in" className="btn-primary">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={profilePath}
                  className="icon-button"
                  aria-label="Profile"
                  style={{ height: "40px", width: "40px" }}
                >
                  <span className="icon user" />
                </Link>

                {/* Notifications: button + portal popover */}
                <div className="notif-wrapper">
                  <button
                    ref={buttonRef}
                    type="button"
                    className="icon-button notif-button"
                    aria-label="Notifications"
                    aria-haspopup="dialog"
                    aria-expanded={open}
                    aria-controls="notif-popover"
                    onClick={() => setOpen((v) => !v)}
                    style={{ height: "40px", width: "40px" }}
                  >
                    <span className="icon bell" />
                    {unreadCount > 0 && (
                      <span
                        className="badge"
                        aria-label={`${unreadCount} unread notifications`}
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>

                  <NotificationPopover
                    open={open}
                    anchorRef={buttonRef}
                    popoverRef={popoverRef}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onMarkAllRead={markAllRead}
                    onClose={() => setOpen(false)}
                  />
                </div>

                <Link
                  to="/contact"
                  className="icon-button"
                  aria-label="Contact"
                  style={{ height: "40px", width: "40px" }}
                >
                  <span className="icon contact" />
                </Link>
                <button onClick={handleSignOut} className="btn-primary">
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </span>
      </div>
    </header>
  );
}