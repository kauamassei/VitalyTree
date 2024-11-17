import { useState } from 'react';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../../LoginAssets/video.mp4';
import logo from '../../../LoginAssets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const Register = () => {
  // Estados para armazenar os valores do formulário
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(''); // Novo estado para o sexo
  const [address, setAddress] = useState(''); // Novo estado para o endereço
  const [phone, setPhone] = useState(''); // Novo estado para o telefone

  const createUser = (e) => {
    e.preventDefault(); // Prevenir comportamento padrão de submit do formulário
  
    // Fazendo a requisição POST para o backend
    Axios.post('http://localhost:3001/addUser', {
      email: email,        
      userName: userName,  
      password: password,  
      gender: gender,      // Envia o sexo
      address: address,    // Envia o endereço
      phone: phone,        // Envia o telefone
    })
      .then((response) => {
        console.log('Resposta do servidor:', response.data.message);
        
        // Salvar os dados no localStorage, incluindo o ID do usuário
        localStorage.setItem('userData', JSON.stringify({
          name: userName,
          email: email,
          userId: response.data.userId, // Armazena o userId
        }));
        
        // Redirecionar para a página de perfil
        navigate('/perfil');
      })
      .catch((error) => {
        console.error('Erro ao registrar:', error.response ? error.response.data.message : error.message);
      });
  };


  // Hook do React Router para navegação
  const navigate = useNavigate();

  return (
    <div className="registerPageContainer">
      <div className='registerPage flex'>
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className='title'>Entre e avalie nossos serviços</h2>
              <p>Adote o costume de se cuidar!</p>
            </div>
            <div className="footerDiv flex">
              <span className='text'>Possui uma conta?</span>
              <Link to={'/login'}>
                <button className='btn'>Login</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <img className='logoVT' src={logo} alt='logo' />
              <h3>Deixe-Nos Te Conhecer!</h3>
            </div>

            <form action='' className='form grid' onSubmit={createUser}>
              <div className="inputDiv">
                <label htmlFor='email'>Email</label>
                <div className="input flex">
                  <MdMarkEmailRead className='icon' />
                  <input 
                    type="email" 
                    id='email' 
                    placeholder='Insira um Email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor='username'>Nome</label>
                <div className="input flex">
                  <FaUserShield className='icon' />
                  <input 
                    type="text" 
                    id='username' 
                    placeholder='Insira seu Nome'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor='gender'>Sexo</label>
                <select id='gender' onChange={(event) => setGender(event.target.value)} required>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="inputDiv">
                <label htmlFor='address'>Endereço</label>
                <input 
                  type="text" 
                  id='address' 
                  placeholder='Insira seu Endereço'
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </div>

              <div className="inputDiv">
                <label htmlFor='phone'>Telefone</label>
                <input 
                  type="tel" 
                  id='phone' 
                  placeholder='Insira seu Telefone'
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>

              <div className="inputDiv">
                <label htmlFor='password'>Senha</label>
                <div className="input flex">
                  <BsFillShieldLockFill className='icon' />
                  <input 
                    type="password" 
                    id='password' 
                    placeholder='Insira sua Senha'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </div>

              <button type='submit' className='btn flex'>
                <span>Registrar</span>
                <AiOutlineSwapRight className='icon' />
              </button>

              <span className='forgotPassword'>
                Esqueceu sua senha? <a href="">Clique Aqui</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
