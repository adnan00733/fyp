import { useState } from 'react';
import { mockConversations } from '../data/mockData';
import { Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      senderName: 'You',
      content: message,
      timestamp: new Date().toLocaleString(),
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: message,
              timestamp: newMessage.timestamp,
            }
          : conv
      )
    );

    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessage: message,
      timestamp: newMessage.timestamp,
    });

    setMessage('');
  };

  return (
    <div className="container-fluid py-4" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="row h-100">
        <div className="col-md-4 col-lg-3 h-100">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h5 className="mb-0">Messages</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={`list-group-item list-group-item-action ${
                      activeConversation.id === conv.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveConversation(conv)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="text-start">
                        <h6 className="mb-1">{conv.participantName}</h6>
                        <p className="mb-0 small text-truncate">{conv.lastMessage}</p>
                      </div>
                      <small>{conv.timestamp.split(' ')[1]}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 col-lg-9 h-100 d-flex flex-column">
          <div className="card border-0 shadow-sm flex-grow-1 d-flex flex-column">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h5 className="mb-0">{activeConversation.participantName}</h5>
            </div>
            <div className="card-body flex-grow-1 overflow-auto">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 ${msg.senderName === 'You' ? 'text-end' : 'text-start'}`}
                >
                  <div
                    className={`d-inline-block p-3 rounded ${
                      msg.senderName === 'You'
                        ? 'text-white'
                        : 'bg-light'
                    }`}
                    style={{
                      backgroundColor: msg.senderName === 'You' ? '#047857' : undefined,
                      maxWidth: '70%',
                    }}
                  >
                    <div className="small mb-1">
                      <strong>{msg.senderName}</strong>
                    </div>
                    <div>{msg.content}</div>
                    <div className="small text-muted mt-1">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer bg-white border-top">
              <form onSubmit={handleSendMessage}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="btn text-white"
                    type="submit"
                    style={{ backgroundColor: '#047857' }}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
