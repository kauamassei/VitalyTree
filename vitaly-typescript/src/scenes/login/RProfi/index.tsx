import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '@/scenes/login/RProfi/RProfi.css';
import { FaUserMd, FaBullhorn, FaTabletAlt } from 'react-icons/fa';

const RProfi: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    specialty: '',
    cnpj: '',
    professionalId: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Registro bem-sucedido');
        
        // Salvar dados do usuário no localStorage
        localStorage.setItem("userData", JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          photo: "",  // Adicione a foto aqui se disponível
        }));
        
        // Redirecionar para a página de perfil
        navigate("/perfil");
      } else {
        console.log('Erro no registro');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div className="registerPage flex">
      <div className="benefitsDiv">
        <h3>vantagens</h3>
        <ul>
          <li>
            <FaUserMd className="benefitIcon" />
            <span>Contato diretamente com o paciente</span>
          </li>
          <li>
            <FaBullhorn className="benefitIcon" />
            <span>Divulgação dos serviços do profissional</span>
          </li>
          <li>
            <FaTabletAlt className="benefitIcon" />
            <span>Facilidade de usar a plataforma</span>
          </li>
        </ul>
      </div>
      <div className="container flex">
        <div className="formDiv flex card-cadastro">
          <div className="headerDiv">
            <h3>Registro de Profissional</h3>
          </div>
          <form className="form grid">
            <div className="inputDiv">
              <label htmlFor="fullName">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Insira seu nome completo"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Insira seu email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Insira sua senha"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="phone">Telefone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Insira seu telefone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="specialty">Especialidade</label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                placeholder="Insira sua especialidade médica"
                value={formData.specialty}
                onChange={handleInputChange}
              />
            </div>

            {/* Campo CPF */}
            <div className="inputDiv">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Insira seu CPF"
                value={formData.cpf}
                onChange={handleInputChange}
              />
            </div>

            {/* Campo Registro de Profissional */}
            <div className="inputDiv">
              <label htmlFor="professionalId">Registro de Profissional</label>
              <input
                type="text"
                id="professionalId"
                name="professionalId"
                placeholder="Insira seu registro profissional"
                value={formData.professionalId}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn flex" onClick={handleSubmit}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RProfi;
