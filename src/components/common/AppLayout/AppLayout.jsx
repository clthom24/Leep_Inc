// =============================================
// File: src/components/common/AppLayout/AppLayout.jsx
// Purpose: Shared layout with Sidebar + page content
// =============================================
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ""}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}