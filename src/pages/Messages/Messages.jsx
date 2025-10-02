import { useState, useRef, useEffect } from 'react';
import MessagesSidebar from '../../components/MessagesComponents/MessageSidebar';
import styles from './styles/messagestyles.module.css';

const messageUsers = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/40?img=2' },
];

const initialMessages = [
  { id: 1, userId: 1, text: 'Hello from Alice', fromMe: false },
  { id: 2, userId: 1, text: 'Hey, how are you?', fromMe: true },
  { id: 3, userId: 2, text: 'Hi, this is Bob', fromMe: false },
];

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    const newMsg = {
      id: messages.length + 1,
      userId: selectedUser.id,
      text: newMessage.trim(),
      fromMe: true,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredMessages = selectedUser
    ? messages.filter((msg) => msg.userId === selectedUser.id)
    : [];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <MessagesSidebar
        users={messageUsers}
        title="Message Users"
        onUserClick={setSelectedUser}
        selectedUser={selectedUser}
      />

      <div className={styles.panelWrapper}>
        <div className={styles.messageList}>
          {selectedUser ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageBubble} ${
                  msg.fromMe ? styles.messageFromMe : styles.messageFromUser
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div style={{ color: '#e8ebf0' }}>Select a user to start chatting</div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.inputBox}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
