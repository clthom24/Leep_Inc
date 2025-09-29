import { Outlet } from "react-router-dom";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";

export default function AppLayoutAuthed() {
  return (
    <div className="app-shell">
      {/* Header shows notifications+profile when variant="app" */}
      <Header variant="app" />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
