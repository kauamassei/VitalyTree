import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/scenes/login/RegisterOption.css';

const RegistrationOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const navigate = useNavigate();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Redirecionar de acordo com a opção selecionada
      switch (selectedOption) {
        case 'usuário comum':
          navigate('/register');
          break;
        case 'profissional da saúde':
          navigate('/rprofi');
          break;
        case 'hospital ou clínica':
          navigate('/rclinica');
          break;
        default:
          break;
      }
    } else {
      alert('Por favor, selecione uma opção.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Escolha uma opção para se cadastrar:</h2>
      <div className="option-group">
        <label>
          <input 
            type="radio" 
            value="usuário comum" 
            checked={selectedOption === 'usuário comum'} 
            onChange={handleOptionChange} 
          />
          Usuário Comum
        </label>
        <label>
          <input 
            type="radio" 
            value="profissional da saúde" 
            checked={selectedOption === 'profissional da saúde'} 
            onChange={handleOptionChange} 
          />
          Profissional da Saúde
        </label>
        <label>
          <input 
            type="radio" 
            value="hospital ou clínica" 
            checked={selectedOption === 'hospital ou clínica'} 
            onChange={handleOptionChange} 
          />
          Hospital ou Clínica
        </label>
      </div>
      <button className="submit-button" onClick={handleSubmit}>Prosseguir</button>
    </div>
  );
};

export default RegistrationOptions;
