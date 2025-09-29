import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
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
