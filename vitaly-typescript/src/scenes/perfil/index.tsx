import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@/scenes/perfil/perfil.css';
import defaultAvatar from "@/assets/avatar-do-usuario.png";

interface ChatHistory {
  professionalName: string;
  lastMessage: string;
  professionalSpecialty: string;
  professionalPhoto: string;
  professionalId: string; // Garantir que o ID do profissional seja passado aqui
}

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [avatar, setAvatar] = useState(userData.photo || defaultAvatar);
  const [username, setUsername] = useState(userData.name || "Seu nome");
  const [userEmail, setUserEmail] = useState(userData.email || "usuario@mail.com");

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    // Simula o carregamento do histórico de chats a partir do localStorage
    const storedChats = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setChatHistory(storedChats);
  }, []);

  const handleFileChange = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  const handleChatClick = (chat: ChatHistory) => {
    // Redirecionar o usuário para o chat com o profissional específico
    navigate(`/ChatClient?id=${chat.professionalId}`); // Aqui está a correção
  };

  // Função para excluir uma conversa
  const excluirConversa = (professionalId: string) => {
    const updatedChatHistory = chatHistory.filter((chat) => chat.professionalId !== professionalId);
    setChatHistory(updatedChatHistory);
    // Atualiza o localStorage com o novo histórico de chats
    localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));
  };

  return (
    <div className="perfil-container">
      <h4 className="perfil-title">Configurações da Conta</h4>
      <div className="perfil-card">
        <div className="perfil-sidebar">
          <a className="perfil-link active" href="#account-general">Geral</a>
          <a className="perfil-link active" onClick={() => navigate('/planos')}>Planos de Assinatura</a> 
          <a className="perfil-link" href="#account-conversations">Conversas</a>
          <div id="account-conversations" className="perfil-tab">
            <h4>Histórico de Conversas</h4>
            {chatHistory.length === 0 ? (
              <p>Você ainda não possui conversas recentes.</p>
            ) : (
              <div className="chat-history-list">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className="chat-history-item"
                    onClick={() => handleChatClick(chat)}
                  >
                    <div className="chat-history-details">
                      <h5>{chat.professionalName}</h5>
                      <p>{chat.professionalSpecialty}</p>
                      <span>{chat.lastMessage}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Impede que o clique no botão acione o clique da conversa
                        excluirConversa(chat.professionalId);
                      }}
                      className="chat-history-delete-btn"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="perfil-content">
          <div id="account-general" className="perfil-tab active">
            <div className="perfil-avatar-section">
              <img src={avatar} alt="avatar" className="perfil-avatar" />
              <div className="perfil-actions">
                <label className="perfil-upload-btn">
                  Carregar nova foto
                  <input
                    type="file"
                    className="perfil-file-input"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="perfil-note">Permitido JPG ou PNG. Tamanho máximo de 800K</div>
              </div>
            </div>
            <hr />
            <div className="perfil-form">
              <div className="perfil-form-group">
                <label className="perfil-label">Nome de Usuário</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="perfil-form-group">
                <label className="perfil-label">E-mail</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="perfil-actions">
        <button
          type="button"
          className="perfil-landing-btn"
          onClick={() => navigate('/')}>
          Voltar
        </button>
        <br />
        <button
          type="button"
          className="perfil-logout-btn"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Perfil;
