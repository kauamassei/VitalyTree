import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/scenes/perfil/perfil.css';

interface ChatHistoryItem {
  professionalId: string;
  professionalName: string;
  professionalSpecialty: string;
  messages: any[];
}

const ChatHistory: React.FC = () => {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setHistory(storedHistory);
  }, []);

  const handleOpenChat = (professionalId: string) => {
    navigate(`/chat?id=${professionalId}`);
  };

  return (
    <div className="chat-history-container">
      <h4 className="chat-history-title">Histórico de Chats</h4>
      {history.length === 0 ? (
        <p className="chat-history-empty">Nenhuma conversa recente.</p>
      ) : (
        <ul className="chat-history-list">
          {history.map((chat, index) => (
            <li key={index} className="chat-history-item" onClick={() => handleOpenChat(chat.professionalId)}>
              <h5>{chat.professionalName}</h5>
              <p>{chat.professionalSpecialty}</p>
              <span>{chat.messages.length} mensagens</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
