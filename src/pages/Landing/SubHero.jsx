import { useEffect, useState } from "react";

const FEATURES = [
  "Browse music",
  "Collaborate with artists",
  "Remix music",
  "Share stems",
  "Get discovered",
];

const PLACEHOLDER = "https://via.placeholder.com/200x200/1DB954/FFFFFF?text=Artist";

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
  const intervalMs = 10000;                  // change slide every 10s

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
    <div className="sub-hero">
      <div className="sub-hero-grid">
        {/* LEFT: single-artist slideshow */}
        <figure className="artist-slide" aria-live="polite">
          <div className="artist-content">
            {/* LEFT: image with padding; only the image fades */}
            <div className="artist-thumb">
              <img 
                key={current.id}
                src={current.img}
                alt={current.name}
                className={`artist-photo ${fade ? 'fade-in' : 'fade-out'}`}
              />
            </div>

            {/* RIGHT: text block — label never fades; name/genre can fade */}
            <div className="artist-info">
              <div className="trending-label">Trending Artist 🔥 </div>
              <h4 className={`artist-name ${fade ? 'fade-in' : 'fade-out'}`}>
                {current.name}
              </h4>
              <p className={`artist-genre ${fade ? 'fade-in' : 'fade-out'}`}>
                {current.genre}
              </p>
            </div>
          </div>
        </figure>

        {/* RIGHT: copy + feature rotator + CTAs */}
        <div>
          <h2 className="sub-hero-heading">
            Built for Artists. Powered by Collaboration.
            <br />
            <span className="rotator-label">Explore: </span>
            <span key={i} className="rotator-item">
              {FEATURES[i]}
            </span>
          </h2>

          <p className="sub-hero-text">
            Leep Audio helps musicians connect, create, and get discovered. Upload stems, remix with others,
            and turn your profile into a digital press kit — all in one place.
          </p>

          <div className="sub-hero-buttons">
            <a className="primary-btn" href="/signup">Sign Up Free</a>
            <a className="secondary-btn" href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}