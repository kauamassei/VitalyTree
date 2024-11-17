import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "@/scenes/assinatura/confirmar/confirmar.css";

import cartao2 from '@/assets/cartao2.png';
import cartao1 from '@/assets/cartao1.png';
import pixlogo from '@/assets/pixlogo.png';
import boleto from '@/assets/boleto.png';

const PaymentMethods: React.FC = () => {
  const { state } = useLocation();
  const selectedPlan = state?.selectedPlan || "Nenhum plano selecionado";
  
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/confirmar', {
        email: formData.email, // E-mail do usuário
        plan: selectedPlan, // Plano escolhido
        paymentMethod: selectedMethod // Forma de pagamento escolhida
      });
      alert(response.data.message); // Exibe a mensagem de sucesso
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      alert('Erro ao enviar o e-mail. Tente novamente.');
    }
  };

  return (
    <div className="payment-container">
      {/* Formulário de Cadastro à Esquerda */}
      <div className="form-container">
        <h3>Confirme seus dados</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Confirmar</button>
        </form>
      </div>

      {/* Card de Forma de Pagamento à Direita */}
      <div className="cardPayment">
        <h2>{selectedPlan}</h2>
        <h2>Escolha sua forma de pagamento</h2>
        <div className="payment-options">
          <button
            className={`payment-button ${selectedMethod === "credito" ? "active" : ""}`}
            onClick={() => handleSelection("credito")}
          >
            <img src={cartao2} alt="credito bandeiras" />
            Crédito
          </button>
          <button
            className={`payment-button ${selectedMethod === "debito" ? "active" : ""}`}
            onClick={() => handleSelection("debito")}
          >
            <img src={cartao1} alt="debito bandeiras" />
            Débito
          </button>
          <button
            className={`payment-button ${selectedMethod === "pix" ? "active" : ""}`}
            onClick={() => handleSelection("pix")}
          >
            <img src={pixlogo} alt="pix logo" />
            Pix
          </button>
          <button
            className={`payment-button ${selectedMethod === "boleto" ? "active" : ""}`}
            onClick={() => handleSelection("boleto")}
          >
            <img src={boleto} alt="boleto logo" />
            Boleto
          </button>
        </div>
        <div className="confirmation">
          {selectedMethod && <p>Você selecionou: {selectedMethod.toUpperCase()}</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
