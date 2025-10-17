import { useState } from 'react';
import styles from './styles.module.css';
import Sidebar from "../../components/common/Sidebar";

export default function EventsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Subscribed'];

  // Keep events in state so we can update them
  const [events, setEvents] = useState([
    { id: 1, name: 'Event Name', date: 'Date + Time', types: ['Collab', 'Live streaming', 'Showcase'], subscribed: false },
    { id: 2, name: 'Event Name', date: 'Date + Time', types: ['Collab', 'Live streaming', 'Showcase'], subscribed: false },
    { id: 3, name: 'Event Name', date: 'Date + Time', types: ['Collab', 'Live streaming', 'Showcase'], subscribed: true },
    { id: 4, name: 'Event Name', date: 'Date + Time', types: ['Collab', 'Live streaming', 'Showcase'], subscribed: false },
    { id: 5, name: 'Event Name', date: 'Date + Time', types: ['Collab', 'Live streaming', 'Showcase'], subscribed: true },
  ]);

  function toggleSubscribe(id) {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === id ? { ...ev, subscribed: !ev.subscribed } : ev
      )
    );
  }

  // Filter events based on active tab
  const filteredEvents =
    activeTab === 'Subscribed'
      ? events.filter(ev => ev.subscribed)
      : events;

  return (
    <div className={styles.layoutWrapper}>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      <div className={styles.container}>
        <div className={styles.pageTitle}>Events</div>

        {/* Top-level Tabs */}
        <div className={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className={styles.mainContentBox}>
          <div className={styles.scrollArea}>
            <div className={styles.viewTitle}>
              {activeTab === 'Upcoming' ? 'Upcoming Events' : 'Subscribed Events'}
            </div>

            <div className={styles.eventsList}>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event.id} className={styles.eventCard}>
                    <div className={styles.eventDetails}>
                      <div className={styles.eventName}>{event.name}</div>
                      <div className={styles.eventDate}>{event.date}</div>
                      <div className={styles.eventTypes}>
                        Event Type:{' '}
                        {event.types.map((t, i) => (
                          <span key={i}>[{t}] </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.eventCover}></div>

                    <div className={styles.eventButtons}>
                      <button className={styles.detailsBtn}>Details</button>
                      <button
                        className={`${styles.subscribeBtn} ${event.subscribed ? styles.subscribed : ''}`}
                        onClick={() => toggleSubscribe(event.id)}
                      >
                        {event.subscribed ? 'Unsubscribe' : 'Subscribe'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </div>

          {/* Create Button */}
          <button className={styles.createButton}>Create Event</button>
        </div>
      </div>
    </div>
  );
}
