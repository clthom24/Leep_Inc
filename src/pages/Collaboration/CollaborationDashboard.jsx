import Editor from "./Editor";
import MyStems from "./MyStems";
import SharedStems from "./SharedStems";
import { useState } from "react";
import styles from "./styles/collaborationdashboard.module.css";

export default function CollaborationDashboard() {
  const [activeTab, setActiveTab] = useState("mystems");

  return (
    <div className={styles.collabContainer}>
      {/* Editor on the left */}
      <div className={styles.editorWindow}>
        <Editor />
      </div>

      {/* Right-side stems window with tabs */}
      <div className={styles.stemsWindow}>
        <div className={styles.tabsContainer}>
          <div
            className={`${styles.tab} ${
              activeTab === "mystems" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("mystems")}
          >
            My Stems
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "sharedstems" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("sharedstems")}
          >
            Shared Stems
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "mystems" && <MyStems isActive={activeTab === "mystems"} />}
          {activeTab === "sharedstems" && <SharedStems />}
        </div>
      </div>
    </div>
  );
}
