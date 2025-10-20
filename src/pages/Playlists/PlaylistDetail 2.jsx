// ============================================================================
// File: src/pages/Playlists/PlaylistDetail.jsx
// Purpose: Detail view for a single playlist with circular cover art and a
//          scrollable track list. Uses CSS Modules for scoped styling.
// Notes:
//   - Currently uses local `mock` data; replace with API/loader when backend is ready.
//   - Accessible semantics: list markup, aria-pressed on like buttons,
//     and an explicit back button.
//   - Styling comes from ./styles/styles.module.css (shared across Playlists).
// ============================================================================

import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/styles.module.css";

/** ---------------------------------------------------------------------------
 * Temporary mock playlist model
 * Replace with data fetched via route loader, useEffect, or context.
 * Each track: { id, title, artist, duration, liked }
 * ------------------------------------------------------------------------- */
const mock = {
  title: "Playlist Title",
  author: "Playlist Author",
  tracks: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Song Title ${i + 1}`,
    artist: "Artist Name",
    duration: "6:43",
    liked: i % 3 === 0, // demo liked state every 3rd track
  })),
};

/**
 * PlaylistDetail
 * Shows one playlist's metadata and its tracks.
 * @returns {JSX.Element}
 */
export default function PlaylistDetail() {
  const { playlistId } = useParams(); // reserved for future fetch (get playlist by id)
  const navigate = useNavigate();     // for back navigation
  const playlist = mock;              // TODO: replace with real data for `playlistId`

  return (
    // Outer panel card (scroll behavior managed by styles)
    <section className={styles.panel}>
      {/* Back button (simple arrow). 
         - Consider adding aria-label for screen readers. */}
      <button
        className={styles["back-button"]}
        onClick={() => navigate("/playlists")}
        aria-label="Back to playlists"
        type="button"
      >
        &#8592;
      </button>

      {/* Header section: circular art + title/author */}
      <div className={styles.playlistHeader}>
        {/* Decorative cover circle; no text content */}
        <div className={styles.coverCircle} aria-hidden />

        <div>
          <h2 className={styles.playlistTitle}>{playlist.title}</h2>
          <p className={styles.playlistMeta}>by {playlist.author}</p>
        </div>
      </div>

      {/* Tracks list — semantic UL with LI rows */}
      <ul className={styles.trackList} role="list">
        {playlist.tracks.map((t) => (
          <li key={t.id} className={styles.trackRow}>
            {/* Thumbnail placeholder box */}
            <div className={styles.thumb} aria-hidden />

            {/* Track main area: title/artist on left, duration aligned via CSS */}
            <div className={styles.trackMain}>
              <div className={styles.trackTitle}>
                {t.title} <span className={styles.artistSep}>•</span> {t.artist}
              </div>
              <div className={styles.duration}>{t.duration}</div>
            </div>

            {/* Like toggle — visual only in mock.
               - aria-pressed communicates toggle state to AT.
               - In real integration, wire onClick to update liked state. */}
            <button
              className={`${styles.likeBtn} ${t.liked ? styles.liked : ""}`}
              aria-pressed={t.liked}
              aria-label={t.liked ? "Unlike" : "Like"}
              type="button"
              // onClick={() => toggleLike(t.id)} // TODO: implement when data is live
            >
              ♥
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
