import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles/Sidebar.module.css";
import { supabase } from "../../supabaseClient"; // adjust path if needed

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/sign-in"); // redirect user after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <aside className={`${styles.aside} ${collapsed ? styles.isCollapsed : ""}`}>
      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? "»" : "«"}
      </button>

      <NavLink to="/HomeSignedIn" className={styles.link} title="Home">
        <span className={styles.label}>Home</span>
      </NavLink>

      <NavLink to="/my-music" className={styles.link} title="My Music">
        <span className={styles.label}>My Music</span>
      </NavLink>

      <NavLink to="/collaborationdashboard" className={styles.link} title="Collaboration">
        <span className={styles.label}>Collaboration</span>
      </NavLink>

      <NavLink to="/messagedashboard" className={styles.link} title="Messages | Remix Requests">
        <span className={styles.label}>Messages</span>
      </NavLink>

      <NavLink to="/liked" className={styles.link} title="Liked Songs">
        <span className={styles.label}>Liked Songs</span>
      </NavLink>

      <NavLink to="/playlists" className={styles.link} title="Playlists">
        <span className={styles.label}>Playlists</span>
      </NavLink>

      <NavLink to="/events" className={styles.link} title="Events">
        <span className={styles.label}>Events</span>
      </NavLink>
    </aside>
  );
}