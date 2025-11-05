// =============================================
// File: src/components/common/RootLayout.jsx
// Purpose: Persistent layout wrapper that keeps
// Header and Footer visible on every page.
// =============================================

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToHash from "./ScrollToHash";


export default function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <ScrollToHash />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


