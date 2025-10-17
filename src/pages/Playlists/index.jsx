// ============================================================================
// File: src/pages/Playlists/index.jsx
// Purpose: Renders the Playlists page with nested routes for list & detail.
// Notes:
//   - Uses React Router's nested <Routes> to swap between PlaylistList (index)
//     and PlaylistDetail (/:playlistId).
//   - Scoped CSS Modules control page, header, layout, and footer styling.
//   - Optional <aside> nav matches Figma wireframe, but can be removed if
//     global sidebar is already provided at app level.
// ============================================================================

import { Routes, Route } from "react-router-dom";
import PlaylistList from "./PlaylistList";         // grid/list of all playlists
import PlaylistDetail from "./PlaylistDetail";     // detail view for one playlist
import styles from "./styles/styles.module.css";   // scoped styles for Playlists

/**
 * PlaylistsPage
 * Wraps header, optional nav, and main content area.
 * Provides nested routes for list vs. detail.
 * @returns {JSX.Element}
 */
export default function PlaylistsPage() {
  return (
    <div className={styles.page}>
      {/* Top page header */}
      <header className={styles.header}>Playlists</header>

      <div className={styles.layout}>
        {/* Main area where nested routes render */}
        <main className={styles.main}>
          <Routes>
            {/* Index route → shows all playlists */}
            <Route index element={<PlaylistList />} />

            {/* Detail route → shows specific playlist by id */}
            <Route path=":playlistId" element={<PlaylistDetail />} />
          </Routes>
        </main>
      </div>

      {/* Simple footer (auto-updates year) */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Leep Audio
      </footer>
    </div>
  );
}
