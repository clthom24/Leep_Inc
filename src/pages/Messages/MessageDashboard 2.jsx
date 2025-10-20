import { NavLink, Outlet } from "react-router-dom";
import styles from "./styles/styles.module.css";

export default function MessageDashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Tabs */}
      <div className={styles.tabsContainer}>
      <NavLink
        to="/messagedashboard/messages"
        end
        className={({ isActive }) =>
          isActive ? styles.tab : `${styles.tab} ${styles.tabActive}`
        }
      >
        Messages
      </NavLink>

      <NavLink
        to="/messagedashboard/requests"
        end
        className={({ isActive }) =>
          isActive ? styles.tab : `${styles.tab} ${styles.tabActive}`
        }
      >
        Requests
      </NavLink>
    </div>



      {/* Tab content */}
      <div className={styles.tabContent}>
        <Outlet />
      </div>
    </div>
  );
}
