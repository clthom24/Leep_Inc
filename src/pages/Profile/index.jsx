// src/pages/Profile/index.jsx
import "./profile.css";

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
    <div className="profile-page">
      {/* ===== Banner (unchanged) ===== */}
      <section className="profile-banner">
        <div className="banner-image" aria-hidden="true" />
        <div className="banner-overlay" />
        <div className="banner-content">
          <div className="avatar" aria-hidden="true" />
          <div className="who">
            <h1 className="name">Artist Name</h1>
            <div className="stats">
              <span>Follower Count</span>
              <span>•</span>
              <span>Plays</span>
              <span>•</span>
              <span>Likes</span>
            </div>
          </div>
          <button className="btn-epk" type="button">Export EPK</button>
        </div>
      </section>

      {/* ===== Unified panel under the banner ===== */}
      <section className="profile-panel">
        {/* About */}
        <div className="section">
          <h2 className="section-title">About</h2>
          <p className="muted">
            Artist bio or description goes here… Write a short intro that tells
            listeners who you are and what you make.
          </p>
        </div>

        {/* Highlights */}
        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Highlights</h2>
            <p className="muted small">Select songs to showcase on your profile…</p>
          </div>

          <div className="row-wrap">
            <button
              className="row-arrow left"
              aria-label="Scroll left"
              onClick={() =>
                document
                  .getElementById("hl-scroll")
                  .scrollBy({ left: -320, behavior: "smooth" })
              }
            >
              ‹
            </button>

            <div className="row-scroll" id="hl-scroll">
              {highlights.map((it) => (
                <div className="tile" key={it.id}>
                  <div className="artwork" aria-hidden="true" />
                  <div className="meta">
                    <div className="title">{it.title}</div>
                    <div className="artist">{it.artist}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="row-arrow right"
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
        <div className="section">
          <h2 className="section-title">Account Information</h2>

          <div className="account-grid">
            <div className="kv">
              <div className="key">Registered Name</div>
              <div className="val">John / Jane Doe</div>
              <div className="key">Account e-mail</div>
              <div className="val">artist@example.com</div>
            </div>

            <div className="sub-card">
              <h3 className="sub-title">Privacy Settings</h3>
              <button className="linkish" type="button">Change Song Privacy</button>
            </div>

            <div className="sub-card">
              <h3 className="sub-title">Accessibility Settings</h3>
              <button className="linkish" type="button">Change Theme</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
