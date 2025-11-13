import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export default function AccountStartup() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load profile + redirect logic
  useEffect(() => {
    async function checkProfile() {
      const { data: { session } } = await supabase.auth.getSession();

      // Not authenticated? Kick to sign-in page
      if (!session) {
        navigate("/sign-in");
        return;
      }

      const userId = session.user.id;

      // Fetch profile role
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        return;
      }

      // If role already selected → redirect immediately
      if (profile?.role) {
        navigate("/HomeSignedIn");
        return;
      }

      setLoading(false);
    }

    checkProfile();
  }, [navigate]);

  // Update the user's role in Supabase
  async function confirmRole() {
    if (!selected) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const userId = session.user.id;

    const { error } = await supabase
      .from("profiles")
      .update({ role: selected })
      .eq("id", userId);

    if (error) {
      console.error(error);
      return;
    }

    navigate("/HomeSignedIn");
  }

  // Loading UI while checking profile
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.header}>Loading...</div>
          <div className={styles.subheader}>Preparing your account...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>Select Your Account Type</div>
        <div className={styles.subheader}>
          This helps customize your Leep Audio experience.
        </div>

        <div className={styles.options}>
          <div
            className={`${styles.roleCard} ${selected === "artist" ? styles.selected : ""}`}
            onClick={() => setSelected("artist")}
          >
            <h2>Artist</h2>
            <p>Upload music, gain followers, collaborate, and create albums.</p>
          </div>

          <div
            className={`${styles.roleCard} ${selected === "producer" ? styles.selected : ""}`}
            onClick={() => setSelected("producer")}
          >
            <h2>Producer</h2>
            <p>Create beats, remix stems, collaborate with artists.</p>
          </div>

          <div
            className={`${styles.roleCard} ${selected === "fan" ? styles.selected : ""}`}
            onClick={() => setSelected("fan")}
          >
            <h2>Fan</h2>
            <p>Follow artists, build playlists, enjoy discovery feeds.</p>
          </div>
        </div>

        <button
          className={styles.confirmBtn}
          disabled={!selected}
          onClick={confirmRole}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
