// =============================================
// File: src/components/common/RootLayout.jsx
// Purpose: Persistent layout wrapper that keeps
// Header and Footer visible on every page.
// =============================================

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Removed for now: <ScrollToHash /> below Header for error fix
import ScrollToHash from "./ScrollToHash";

export default function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
      <Outlet />
      </main>
      <Footer />
    </div>
  );
}