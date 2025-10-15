// src/pages/Profile/index.jsx
import styles from "./profile.module.css";

// mock data – swap with real props/api later
const highlights = [
  { id: 1, title: "Song Name", artist: "Artist Name" },
  { id: 2, title: "Song Name", artist: "Artist Name" },
  { id: 3, title: "Song Name", artist: "Artist Name" },
  { id: 4, title: "Song Name", artist: "Artist Name" },
  { id: 5, title: "Song Name", artist: "Artist Name" },
];

export default function Profile() {
  return (
    <div className={styles["profile-page"]}>
      {/* ===== Banner ===== */}
      <section className={styles["profile-banner"]}>
        <div className={styles["banner-image"]} aria-hidden="true" />
        <div className={styles["banner-overlay"]} />
        <div className={styles["banner-content"]}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.who}>
            <h1 className={styles.name}>Artist Name</h1>
            <div className={styles.stats}>
              <span>Follower Count</span>
              <span>•</span>
              <span>Plays</span>
              <span>•</span>
              <span>Likes</span>
            </div>
          </div>
          <button className={styles["btn-epk"]} type="button">
            Export EPK
          </button>
        </div>
      </section>

      {/* ===== Unified panel under the banner ===== */}
      <section className={styles["profile-panel"]}>
        {/* About */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>About</h2>
          <p className={`${styles.muted} ${styles.small}`}>
            Artist bio or description goes here… Write a short intro that tells
            listeners who you are and what you make.
          </p>
        </div>

        {/* Highlights */}
        <div className={styles.section}>
          <div className={styles["section-head"]}>
            <h2 className={styles["section-title"]}>Highlights</h2>
            <p className={`${styles.muted} ${styles.small}`}>
              Select songs to showcase on your profile…
            </p>
          </div>

          <div className={styles["row-wrap"]}>
            <button
              className={`${styles["row-arrow"]} ${styles.left}`}
              aria-label="Scroll left"
              onClick={() =>
                document
                  .getElementById("hl-scroll")
                  .scrollBy({ left: -320, behavior: "smooth" })
              }
            >
              ‹
            </button>

            <div className={styles["row-scroll"]} id="hl-scroll">
              {highlights.map((it) => (
                <div className={styles.tile} key={it.id}>
                  <div className={styles.artwork} aria-hidden="true" />
                  <div className={styles.meta}>
                    <div className={styles.title}>{it.title}</div>
                    <div className={styles.artist}>{it.artist}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`${styles["row-arrow"]} ${styles.right}`}
              aria-label="Scroll right"
              onClick={() =>
                document
                  .getElementById("hl-scroll")
                  .scrollBy({ left: 320, behavior: "smooth" })
              }
            >
              ›
            </button>
          </div>
        </div>

        {/* Account info / privacy / accessibility */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Account Information</h2>

          <div className={styles["account-grid"]}>
            <div className={styles.kv}>
              <div className={styles.key}>Registered Name</div>
              <div className={styles.val}>John / Jane Doe</div>
              <div className={styles.key}>Account e-mail</div>
              <div className={styles.val}>artist@example.com</div>
            </div>

            <div className={styles["sub-card"]}>
              <h3 className={styles["sub-title"]}>Privacy Settings</h3>
              <button className={styles.linkish} type="button">
                Change Song Privacy
              </button>
            </div>

            <div className={styles["sub-card"]}>
              <h3 className={styles["sub-title"]}>Accessibility Settings</h3>
              <button className={styles.linkish} type="button">
                Change Theme
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
