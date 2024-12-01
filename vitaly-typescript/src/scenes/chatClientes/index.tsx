import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '@/scenes/chatClientes/chat.css';

import medicocalvo from "@/assets/medicocalvo.jpg";
import medicafelizcomaprofissao from "@/assets/medicafelizcomaprofissao.jpg";
import medicadoida from "@/assets/medicadoida.jpg";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const professionalId = queryParams.get('id');

  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatInputValue, setChatInputValue] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const [professionalName, setProfessionalName] = useState('');
  const [professionalSpecialty, setProfessionalSpecialty] = useState('');
  const [professionalPhoto, setProfessionalPhoto] = useState('');

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

    const ws = new WebSocket('ws://localhost:3002');
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

      // Salvar no histórico
      const currentHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      const chatEntry = {
        professionalId,
        professionalName,
        professionalSpecialty,
        messages: [...(currentHistory.find((c: any) => c.professionalId === professionalId)?.messages || []), message],
      };

      const updatedHistory = [
        ...currentHistory.filter((c: any) => c.professionalId !== professionalId),
        chatEntry,
      ];

      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  };

  const processMessage = (data: string) => {
    const parsedData: Message = JSON.parse(data);
    setMessages((prevMessages) => [...prevMessages, parsedData]);
    scrollScreen();
  };

  // Buscar informações do profissional
  useEffect(() => {
    if (professionalId) {
      switch (professionalId) {
        case '1':
          setProfessionalName('Maria Silva');
          setProfessionalSpecialty('Terapeuta');
          setProfessionalPhoto(medicadoida);
          break;
        case '2':
          setProfessionalName('João Pereira');
          setProfessionalSpecialty('Clínico Geral');
          setProfessionalPhoto(medicocalvo);
          break;
        case '3':
          setProfessionalName('Ana Costa');
          setProfessionalSpecialty('Psicóloga');
          setProfessionalPhoto(medicafelizcomaprofissao);
          break;
        default:
          setProfessionalName('Profissional Não Encontrado');
          setProfessionalSpecialty('');
          setProfessionalPhoto('');
          break;
      }
    }
  }, [professionalId]);

  // Carregar histórico ao entrar no chat
  useEffect(() => {
    if (user && professionalId) {
      const currentHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      const chatEntry = currentHistory.find((c: any) => c.professionalId === professionalId);
      if (chatEntry) {
        setMessages(chatEntry.messages || []);
      }
    }
  }, [user, professionalId]);

  return (
    <div className="containerChat">
      {!user ? (
        <section className="login">
          <p className="login__warning">
            Respeite as boas práticas de comunicação: <br />
            Não use linguagem vulgar, mantenha o respeito e evite ofensas.
          </p>
          <br />
          <form onSubmit={handleLogin} className="login__form">
            <input
              type="text"
              className="login__input"
              placeholder="Confirme seu nome"
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
          <div className="chat__header">
            <div className="professional-info">
              {professionalPhoto && (
                <img
                  src={professionalPhoto}
                  alt={professionalName}
                  className="professional-photo"
                />
              )}
              <div>
                <h3>{professionalName}</h3>
                <p>{professionalSpecialty}</p>
              </div>
            </div>
          </div>
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
