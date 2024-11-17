import React, { useState } from 'react';
import "@/scenes/login/RegClinica/clinica.css"; 
import { FaUserMd, FaBullhorn, FaTabletAlt } from 'react-icons/fa'; // Importando ícones
import { useNavigate } from 'react-router-dom';

const ClinicaRegister: React.FC = () => {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();  // Hook para navegação

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/regClinica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, cnpj, cep, phone, email, password }),
            });
    
            // Não exibir alertas no frontend
            if (response.ok) {
                console.log('Registro concluído com sucesso');
                
                // Salvar os dados no localStorage
                localStorage.setItem('clinicaData', JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    cnpj: cnpj,
                }));

                // Redirecionar para a página de perfil
                navigate('/perfil');
            } else {
                // Logar a mensagem de erro no console do frontend
                const data = await response.json();
                console.error('Erro ao registrar:', data.message);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    return (
        <div className="clinicaRegisterPage">
            <div className="benefitsDiv">
                <h3>Vantagens de s</h3>
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
            <div className="clinicaRegisterContainer">
                <div className="clinicaRegisterHeader">
                    <img src="logo.png" alt="Logo" />
                    <h3>Registro de Hospital ou Clínica</h3>
                </div>
                <form className="clinicaRegisterForm" onSubmit={handleSubmit}>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="name">Nome da Clínica ou Hospital</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input
                            type="text"
                            id="cnpj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required
                        />
                    </div>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            required
                        />
                    </div>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="clinicaRegisterInputDiv">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="clinicaRegisterBtn">Registrar</button>
                </form>
                <div className="clinicaRegisterNavButtons">
                    <a href="/login" className="clinicaRegisterNavBtn">Já possui uma conta? Faça login</a>
                </div>
            </div>
        </div>
    );
};

export default ClinicaRegister;
