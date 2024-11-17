import React, { useState, useRef } from 'react';
import '@/scenes/chatClientes/chat.css';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Message {
  userId: string;
  userName: string;
  userColor: string;
  content: string;
}

const ChatClient: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatInputValue, setChatInputValue] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const colors = [
    'cadetblue',
    'darkgoldenrod',
    'cornflowerblue',
    'darkkhaki',
    'hotpink',
    'gold',
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const scrollScreen = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      id: crypto.randomUUID(),
      name: inputValue,
      color: getRandomColor(),
    };
    setUser(newUser);

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => processMessage(event.data);
    ws.onopen = () => console.log('Conectado ao WebSocket!');
    ws.onerror = (err) => console.error('Erro no WebSocket:', err);

    setWebsocket(ws);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (websocket && user) {
      const message: Message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInputValue,
      };
      websocket.send(JSON.stringify(message));
      setChatInputValue('');
    }
  };

  const processMessage = (data: string) => {
    const parsedData: Message = JSON.parse(data);
    setMessages((prevMessages) => [...prevMessages, parsedData]);
    scrollScreen();
  };

  return (
    <div className="container">
      {!user ? (
        <section className="login">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="login__form">
            <input
              type="text"
              className="login__input"
              placeholder="Seu nome"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button type="submit" className="login__button">
              Entrar
            </button>
          </form>
        </section>
      ) : (
        <section className={`chat ${user ? 'visible' : 'hidden'}`}>
          <div className="chat__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.userId === user.id ? 'message--self' : 'message--other'
                }
              >
                {message.userId !== user.id && (
                  <span
                    className="message--sender"
                    style={{ color: message.userColor }}
                  >
                    {message.userName}
                  </span>
                )}
                {message.content}
              </div>
            ))}
            <div ref={chatMessagesRef}></div>
          </div>
          <form onSubmit={handleSendMessage} className="chat__form">
            <input
              type="text"
              className="chat__input"
              placeholder="Digite uma mensagem"
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              required
            />
            <button type="submit" className="chat__button">
              <span className="material-symbols-outlined">Enviar</span>
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default ChatClient;
