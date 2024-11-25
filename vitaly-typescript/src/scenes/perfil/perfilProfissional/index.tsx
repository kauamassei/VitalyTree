import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@/scenes/perfil/perfil.css";
import defaultAvatar from "@/assets/avatar-do-usuario.png";

const PerfilProfissional: React.FC = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [clinicaData, setClinicaData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("clinicaData");
    if (storedData) {
      setClinicaData(JSON.parse(storedData));
    } else {
      navigate("/login"); // Se não encontrar os dados, redireciona para o login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clinicaData");
    navigate("/login");
  };

  // Função para lidar com a alteração da foto de perfil
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Atualiza a imagem do avatar com a nova foto
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL
    }
  };

  if (!clinicaData) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento até que os dados sejam encontrados
  }

  return (
    <div className="perfil-container">
      <h4 className="perfil-title">Configurações da Conta</h4>
      <div className="perfil-card">
        <div className="perfil-sidebar">
          <a className="perfil-link active" href="#account-general">
            Geral
          </a>
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
                <div className="perfil-note">
                  Permitido JPG ou PNG. Tamanho máximo de 800K
                </div>
              </div>
            </div>
            <hr />
            <div className="perfil-form">
              <div className="perfil-form-group">
                <label className="perfil-label">Nome da Clínica</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={clinicaData.name}
                  readOnly
                />
              </div>
              <div className="perfil-form-group">
                <label className="perfil-label">E-mail</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={clinicaData.email}
                  readOnly
                />
              </div>
              <div className="perfil-form-group">
                <label className="perfil-label">CNPJ</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={clinicaData.cnpj}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="perfil-actions">
        <button type="button" className="perfil-save-btn">
          Salvar Alterações
        </button>
        <button type="button" className="perfil-cancel-btn">
          Cancelar
        </button>
        <button
          type="button"
          className="perfil-landing-btn"
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
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

export default PerfilProfissional;
