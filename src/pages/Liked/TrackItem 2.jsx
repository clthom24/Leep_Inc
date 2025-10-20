// ============================================================================
// File: src/pages/Liked/TrackItem.jsx
// Purpose: Represents a single track row inside the "Liked Songs" list.
// Notes:
//   - Whole row is clickable to play the track (Enter/Space for keyboard users).
//   - Right side shows duration + heart button (toggles liked state).
//   - Uses CSS Modules for scoped styling.
// ============================================================================

import styles from "./styles/TrackItem.module.css";

/**
 * TrackItem
 * @param {Object}   props
 * @param {Object}   props.track        - Track model (id, title, artist, duration, liked)
 * @param {Function} props.onToggleLike - Called when user clicks heart button
 * @param {Function} props.onPlay       - Called when user clicks row or presses Enter/Space
 */
export default function TrackItem({ track, onToggleLike, onPlay }) {
  return (
    <div
      className={styles.row}
      role="button" // makes div behave like a button for screen readers
      tabIndex={0} // focusable so keyboard users can activate with Enter/Space
      onClick={onPlay} // row click triggers play
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay();
        }
      }}
      aria-label={`Play ${track.title} by ${track.artist}`} // accessible label
    >
      {/* Placeholder album artwork box */}
      <div className={styles.artwork} aria-hidden />

      {/* Middle section: title + artist */}
      <div className={styles.meta}>
        <div className={styles.titleArtist}>
          <span className={styles.title}>{track.title}</span>
          <span className={styles.dash}> — </span>
          <span className={styles.artist}>{track.artist}</span>
        </div>
      </div>

      {/* Right section: duration + heart button */}
      <div className={styles.rightSide}>
        <span className={styles.duration}>{track.duration}</span>

        {/* Heart button — use stopPropagation so clicking it doesn't trigger play */}
        <button
          className={`${styles.heart} ${track.liked ? styles.heartOn : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          aria-pressed={track.liked}                 // conveys toggle state
          aria-label={track.liked ? "Unlike" : "Like"} // accessible toggle label
        >
          {track.liked ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
