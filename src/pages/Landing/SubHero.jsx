// =============================================
// File: src/pages/Landing/SubHero.jsx
// Purpose: Top band with single-artist slideshow + copy + auth CTAs.
// =============================================
import styles from "./styles/styles.module.css";
import StarBorder from "../../components/common/StarBorder"; 
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";         

const FEATURES = [
  "Browse music",
  "Collaborate with artists",
  "Remix music",
  "Share stems",
  "Get discovered",
];

// Use your real placeholder path from /public
const PLACEHOLDER = "/artist.jpg";

const ARTISTS = [
  { id: 1, name: "Nova Rae", genre: "Pop", img: PLACEHOLDER },
  { id: 2, name: "Echo Park", genre: "Indie Rock", img: PLACEHOLDER},
  { id: 3, name: "Violet Tide", genre: "Electronic", img: PLACEHOLDER},
  { id: 4, name: "Moon Harbor", genre: "Jazz", img: PLACEHOLDER },
  { id: 5, name: "Atlas Wyn", genre: "Hip-Hop", img: PLACEHOLDER},
];


export default function SubHero() {
  const [i, setI] = useState(0);            // features rotator index
  const [a, setA] = useState(0);            // artist slideshow index
  const [fade, setFade] = useState(true);   // for fade animation
  const intervalMs = 10000;                  // ⏱️ change slide every 3s

  // Feature rotator
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FEATURES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Single-artist slideshow
  useEffect(() => {
    const id = setInterval(() => {
      // trigger fade-out then swap, then fade-in
      setFade(false);
      setTimeout(() => {
        setA((n) => (n + 1) % ARTISTS.length);
        setFade(true);
      }, 180); // short fade-out duration; matches CSS
    }, intervalMs);
    return () => clearInterval(id);
  }, []);

  const current = ARTISTS[a];

  return (
    <div className={styles.subHero}>
      <div className={styles.subHeroGrid}>
        {/* LEFT: single-artist slideshow */}
        <figure className={styles.artistSlide} aria-live="polite">
          <div className={styles.artistContent}>
            {/* LEFT: image with padding; only the image fades */}
            <div className={styles.artistThumb}>
              <img 
                key={current.id}
                src={current.img}
                alt={current.name}
                className={`${styles.artistPhoto} ${fade ? styles.fadeIn : styles.fadeOut}`}
              />
            </div>

            {/* RIGHT: text block — label never fades; name/genre can fade */}
            <div className={styles.artistInfo}>
              <div className={styles.trendingLabel}>Trending Artist 🔥 </div>
              <h4 className={`${styles.artistName} ${fade ? styles.fadeIn : styles.fadeOut}`}>
                {current.name}
              </h4>
              <p className={`${styles.artistGenre} ${fade ? styles.fadeIn : styles.fadeOut}`}>
                {current.genre}
              </p>
            </div>
          </div>
        </figure>


        {/* RIGHT: copy + feature rotator + CTAs */}
        <div>
          <h2 className={styles.subHeroHeading}>
            Built for Artists. Powered by Collaboration.
            <br />
            <span className={styles.rotatorLabel}>Explore: </span>
            <span key={i} className={styles.rotatorItem}>
              {FEATURES[i]}
            </span>
          </h2>

          <p className={styles.subHeroText}>
            Leep Audio helps musicians connect, create, and get discovered. Upload stems, remix with others,
            and turn your profile into a digital press kit — all in one place.
          </p>

          <div className={styles.subHeroButtons}>
            <StarBorder as={Link} to="/sign-up" className={styles.primaryBtn}>
              Sign Up Free
            </StarBorder>


            {/* Plain secondary button */}
            <Link to="/sign-in" className={styles.secondaryBtn}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
