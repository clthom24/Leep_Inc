// ============================================================================
// File: src/pages/Playlists/PlaylistList.jsx
// Purpose: Displays a grid of playlists, each linking to its detail page.
// Notes:
//   - Uses mock data for now; replace with API data later.
//   - Each playlist is rendered as a <Link> card, navigates to /playlists/:id.
//   - Scoped CSS Modules style section, grid, and cards.
// ============================================================================

import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";

/** ---------------------------------------------------------------------------
 * Temporary mock data.
 * Replace with playlists fetched from backend when available.
 * Each playlist: { id, name, trackCount }
 * ------------------------------------------------------------------------- */
const mockPlaylists = [
  { id: "1", name: "Chill Vibes", trackCount: 24 },
  { id: "2", name: "Studio Session", trackCount: 12 },
  { id: "3", name: "Late Night Coding", trackCount: 18 },
  { id: "4", name: "Weekend Jam", trackCount: 31 },
];

/**
 * PlaylistList
 * Renders a section with a grid of playlist cards.
 * @returns {JSX.Element}
 */
export default function PlaylistList() {
  return (
    <section className={styles.section}>
      {/* Section heading */}
      <h1 className={styles.sectionTitle}>Playlists</h1>

      {/* Card container */}
      <div className={styles.panel}>
        <div className={styles.grid}>
          {mockPlaylists.map((p) => (
            <Link
              key={p.id}
              to={p.id}                    // navigates to /playlists/:id
              className={styles.card}
            >
              <div className={styles.cardTitle}>{p.name}</div>
              <div className={styles.cardMeta}>{p.trackCount} tracks</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
