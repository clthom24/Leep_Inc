import styles from './styles/styles.module.css';

export default function Sidebar({ users, title, onUserClick, selectedUser }) {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarTitle}>{title}</div>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onUserClick(user)}
          className={`${styles.userItem} ${
            selectedUser?.id === user.id ? styles.userItemSelected : ''
          }`}
        >
          <img src={user.avatar || 'https://via.placeholder.com/40'} alt={user.name} />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
