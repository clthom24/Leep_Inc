import { NavLink } from "react-router-dom";
import styles from "./styles/Sidebar.module.css";

export default function Sidebar({ collapsed, onToggle }) {
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

      <NavLink to="/home" className={styles.link} title="Home">
        <span className={styles.label}>Home</span>
      </NavLink>

      <NavLink to="/my-music" className={styles.link} title="My Music">
        <span className={styles.label}>My Music</span>
      </NavLink>

      <NavLink to="/messages" className={styles.link} title="Messages">
        <span className={styles.label}>Messages</span>
      </NavLink>

      <NavLink to="/remix" className={styles.link} title="Remix Requests">
        <span className={styles.label}>Remix Requests</span>
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

      <NavLink to="/radio" className={styles.link} title="Radio">
        <span className={styles.label}>Radio</span>
      </NavLink>

      <NavLink to="/" className={styles.link} title="Logout">
        <span className={styles.label}>Logout</span>
      </NavLink>
    </aside>
  );
}