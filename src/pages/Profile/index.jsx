// src/pages/Profile/index.jsx
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; 
import { useNavigate } from "react-router-dom";

// mock data – swap with real props/api later
const highlights = [
  { id: 1, title: "Song Name", artist: "Artist Name" },
  { id: 2, title: "Song Name", artist: "Artist Name" },
  { id: 3, title: "Song Name", artist: "Artist Name" },
  { id: 4, title: "Song Name", artist: "Artist Name" },
  { id: 5, title: "Song Name", artist: "Artist Name" },
];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ===========================
  // Load profile + followers
  // ===========================
  useEffect(() => {
    async function loadData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // Save email from auth
      setEmail(session.user.email || "");

      // Get profile info
      const { data: profileRow } = await supabase
        .from("profiles")
        .select("display_name, role, created_at")
        .eq("id", userId)
        .single();

      setProfile(profileRow);

      // Get follower count
      const { count, error } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", userId);

      if (error) console.error("Follower count error:", error);
      console.log("Follower count:", count);

      setFollowerCount(count || 0);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading profile…</div>;
  if (!profile) return <div style={{ padding: 40 }}>Profile not found.</div>;

  return (
    <div className={styles["profile-page"]}>
      {/* ===== Banner ===== */}
      <section className={styles["profile-banner"]}>
        <div className={styles["banner-image"]} aria-hidden="true" />
        <div className={styles["banner-overlay"]} />
        <div className={styles["banner-content"]}>
          <div className={styles.avatar} aria-hidden="true" />

          {/* Name + Stats */}
          <div className={styles.who}>
            <h1 className={styles.name}>
              {profile.display_name || "Unnamed Artist"}
            </h1>

            <div className={styles.stats}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/my-music", {
                    state: { activeTab: "Your Network", activeNetworkTab: "Followers" }
                  })
                }
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                {followerCount} {followerCount === 1 ? "Follower" : "Followers"}
              </span>
              <span>•</span>
              <span>0 Plays</span>
              <span>•</span>
              <span>0 Likes</span>
            </div>
          </div>

          <button className={styles["btn-epk"]} type="button">
            Export EPK
          </button>
        </div>
      </section>

      {/* ===== Info Section ===== */}
      <section className={styles["profile-panel"]}>

        {/* About Section */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>About</h2>
          <p className={`${styles.muted} ${styles.small}`}>
            Artist bio or description goes here…  
            (Later you can store this in Supabase too.)
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
                    <div className={styles.artist}>{profile.display_name}</div>
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

        {/* Account Information */}
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Account Information</h2>

          <div className={styles["account-grid"]}>
            <div className={styles.kv}>
              <div className={styles.key}>Registered Name</div>
              <div className={styles.val}>
                {profile.display_name || "—"}
              </div>

              <div className={styles.key}>Account Email</div>
              <div className={styles.val}>{email}</div>
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