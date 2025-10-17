import { useState } from 'react';
import Sidebar from '../../components/MessagesComponents/MessageSidebar';
import styles from './styles/requeststyles.module.css';

const requestUsers = [
  { id: 1, name: 'Charlie', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 2, name: 'Dana', avatar: 'https://i.pravatar.cc/40?img=4' },
];

// Sample songs data
const allSongs = [
  { id: 1, userId: 1, name: 'Song A', album: 'Album 1', cover: 'https://picsum.photos/60?random=1' },
  { id: 2, userId: 1, name: 'Song B', album: 'Album 2', cover: 'https://picsum.photos/60?random=2' },
  { id: 3, userId: 2, name: 'Song C', album: 'Album 3', cover: 'https://picsum.photos/60?random=3' },
];

export default function Requests() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [songs, setSongs] = useState(allSongs);

  const handleApprove = (songId) => {
    // Example: mark approved (for now just log)
    console.log('Approved song', songId);
  };

  const handleDeny = (songId) => {
    // Example: mark denied (for now just log)
    console.log('Denied song', songId);
  };

  const filteredSongs = selectedUser
    ? songs.filter((song) => song.userId === selectedUser.id)
    : [];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar
        users={requestUsers}
        title="Request Users"
        onUserClick={setSelectedUser}
        selectedUser={selectedUser}
      />

      <div className={styles.panelWrapper}>
        {selectedUser ? (
          <div className={styles.songList}>
            {filteredSongs.map((song) => (
              <div key={song.id} className={styles.songItem}>
                <img src={song.cover} alt={song.album} className={styles.albumArt} />
                <div className={styles.songInfo}>
                  <span className={styles.songName}>{song.name}</span>
                  <span className={styles.albumTitle}>{song.album}</span>
                </div>
                <div className={styles.actions}>
                  <button className={`${styles.actionButton} ${styles.approve}`} onClick={() => handleApprove(song.id)}>✔️</button>
                  <button className={`${styles.actionButton} ${styles.deny}`} onClick={() => handleDeny(song.id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#e8ebf0' }}>Select a user to see their song requests</div>
        )}
      </div>
    </div>
  );
}
