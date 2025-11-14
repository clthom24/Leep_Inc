import { useState } from "react";
import Messages from "./Messages";
import Requests from "./Requests";
import styles from "./styles/styles.module.css";

export default function MessageDashboard() {
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <div className={styles.dashboardWrapper}>
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div
          className={`${styles.tab} ${
            activeTab === "messages" ? styles.tabActive : ""
          }`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "requests" ? styles.tabActive : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </div>
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === "messages" && <Messages />}
        {activeTab === "requests" && <Requests />}
      </div>
    </div>
  );
}
