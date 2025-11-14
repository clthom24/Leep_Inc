import React, { useState } from "react";
import styles from "./styles/sharedstems.module.css";
import { FaThumbsUp, FaRandom, FaPlus, FaPlay } from "react-icons/fa";

export default function SharedStems() {
  const [activeTab] = useState("Overview"); // simple placeholder

  const dummyTracks = [
    { id: 1, title: "Shared Stem 1", duration: "03:15" },
    { id: 2, title: "Shared Stem 2", duration: "04:30" },
    { id: 3, title: "Shared Stem 3", duration: "02:55" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Shared Stems</div>

      <div className={styles.mainContentBox}>
        <div className={styles.scrollArea}>
          <div className={styles.tracksList}>
            {dummyTracks.map((song) => (
              <div key={song.id} className={styles.trackCard}>
                <div className={styles.trackCover}>Cover</div>

                <div className={styles.trackDetails}>
                  <div className={styles.trackHeader}>
                    <div className={styles.trackTitle}>{song.title}</div>
                    <div className={styles.trackActions}>
                      <button className={styles.linkButton}>Share</button>
                      <button className={styles.linkButton}>Delete</button>
                    </div>
                  </div>

                  <div className={styles.trackTime}>
                    <span>00:00</span>
                    <button className={styles.playButton}><FaPlay /></button>
                    <div className={styles.progressBar}>
                      <div className={styles.progress}></div>
                    </div>
                    <span>{song.duration}</span>
                  </div>
                </div>

                <div className={styles.trackStats}>
                  <FaThumbsUp className={styles.icon} />
                  <span className={styles.trackStat}>0</span>

                  <FaRandom className={styles.icon} />
                  <span className={styles.trackStat}>0</span>

                  <FaPlus className={styles.icon} />
                  <span className={styles.trackStat}>0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
