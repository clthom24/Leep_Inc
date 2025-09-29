// ============================================================================
// File: src/pages/Liked/index.jsx
// Purpose: Renders the "Liked Songs" page using CSS Modules.
// Notes:
//   - Pure client-side mock right now (see `initialMock`). Replace with API data.
//   - Accessibility: labeled section, polite empty-state, semantic list markup.
//   - Child component: <TrackItem /> handles per-row UI/controls.
// ============================================================================

import { useState, useCallback, useMemo } from "react";
import styles from "./styles/styles.module.css"; // scoped styles for this page
import TrackItem from "./TrackItem";              // list row component (play/like UI)

/** ---------------------------------------------------------------------------
 * Temporary mock data for layout/interaction.
 * Replace with fetched user data when backend is wired up.
 * Each track: { id, title, artist, duration, liked }
 * ------------------------------------------------------------------------- */
const initialMock = [
  { id: 1, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 2, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 3, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 4, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 5, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 6, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 7, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 8, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 9, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 10, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 11, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 12, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 13, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 14, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 15, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 16, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 17, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 18, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 19, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 20, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 21, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 22, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 23, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
  { id: 24, title: "Song Title", artist: "Artist Name", duration: "6:43", liked: true },
];

/**
 * LikedPage
 * Displays the user's liked tracks with simple "play" and "un/like" actions.
 * @returns {JSX.Element}
 */
export default function LikedPage() {
  const [tracks, setTracks] = useState(initialMock); // source of truth for tracks

  /**
   * Toggle a track's `liked` state immutably by id.
   * Memoized to avoid re-creating the handler on each render.
   */
  const toggleLike = useCallback((id) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, liked: !t.liked } : t))
    );
  }, []);

  /**
   * "Play" handler (placeholder): finds the track and logs it.
   * TODO: Wire this to the global/player context when available.
   */
  const playTrack = useCallback(
    (id) => {
      const t = tracks.find((x) => x.id === id);
      if (t) {
        console.log("PLAY:", `${t.title} — ${t.artist}`);
        // TODO: integrate with your audio player here
      }
    },
    [tracks] // depends on current list; fine for now since this is lightweight
  );

  // Derive only liked tracks; recalculates when `tracks` changes.
  const liked = useMemo(() => tracks.filter((t) => t.liked), [tracks]);

  return (
    // Landmark section for the page; heading is associated via aria-labelledby.
    <section className={styles.wrapper} aria-labelledby="likedHeading">
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          {/* Main page title; keep unique id to match aria-labelledby above */}
          <h1 id="likedHeading" className={styles.heading}>♡ Liked Songs</h1>
        </div>

        <div className={styles.panelBody}>
          {/* Accessible empty-state; `aria-live=polite` announces changes non-intrusively */}
          {liked.length === 0 ? (
            <p aria-live="polite">No liked songs yet.</p>
          ) : (
            // Semantic list; TrackItem rows rendered as list items
            <ul className={styles.list} role="list">
              {liked.map((t) => (
                <li key={t.id}>
                  <TrackItem
                    track={t}                        // data model for row
                    onToggleLike={() => toggleLike(t.id)} // invert liked flag
                    onPlay={() => playTrack(t.id)}        // trigger play action
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
