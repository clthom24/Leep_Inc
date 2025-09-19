import { useState } from 'react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Maya Rodriguez",
      lastMessage: "Love the new track! When can we collaborate?",
      time: "2m ago",
      unread: 2,
      avatar: null,
      online: true
    },
    {
      id: 2, 
      name: "Alex Chen",
      lastMessage: "The stems are ready for download",
      time: "1h ago", 
      unread: 0,
      avatar: null,
      online: false
    },
    {
      id: 3,
      name: "Jordan Smith", 
      lastMessage: "Thanks for the feedback on the mix!",
      time: "3h ago",
      unread: 1,
      avatar: null,
      online: true
    },
    {
      id: 4,
      name: "Studio Collective",
      lastMessage: "New project available - Hip Hop collab",
      time: "1d ago",
      unread: 0,
      avatar: null,
      online: false
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "Maya Rodriguez",
      content: "Hey! I just listened to your latest track 'Midnight Dreams' - absolutely love the melody!",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you so much! I was actually thinking it could use some vocals. Are you interested in collaborating?",
      time: "10:32 AM", 
      isMe: true
    },
    {
      id: 3,
      sender: "Maya Rodriguez",
      content: "Absolutely! I'd love to add some vocals. Do you have the stems available?",
      time: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! I'll send them over in a few minutes. What's your vocal range?",
      time: "10:37 AM",
      isMe: true
    },
    {
      id: 5,
      sender: "Maya Rodriguez", 
      content: "Love the new track! When can we collaborate?",
      time: "10:45 AM",
      isMe: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="messages-page">
      <div className="flex h-screen">
        
        {/* Conversations Sidebar */}
        <div className="messages-sidebar">
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Search conversations..."
                className="messages-search-input"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition ${
                  selectedConversation?.id === conv.id ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      {conv.name.charAt(0)}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-muted"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-400">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="messages-unread-badge">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="messages-header">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      {selectedConversation.name.charAt(0)}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-muted"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold">{selectedConversation.name}</h2>
                    <p className="text-sm text-gray-400">
                      {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isMe
                          ? 'messages-bubble-me'
                          : 'messages-bubble-other'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMe ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="messages-input"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-6"
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
                <p className="text-gray-400">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}