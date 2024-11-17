import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@/firebase'; // Ajuste o caminho conforme necessário
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import video from '../../../LoginAssets/video.mp4';
import logo from '../../../LoginAssets/logo.png';
import { FaEnvelope } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>(''); 
  const [loginPassword, setLoginPassword] = useState<string>('');
  
  const navigateTo = useNavigate();

  const loginUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, senha: loginPassword }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        // Armazenando dados no localStorage para uso na tela de perfil
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("clinicaData", JSON.stringify({
          id: userData.id_usuario,
          name: userData.nome,
          email: userData.email,
        }));
        navigateTo('/perfil'); // Redireciona para a tela de perfil
      } else {
        console.log("Erro: Email ou senha inválidos");
        alert("Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao tentar realizar login:", error);
      alert("Erro ao tentar realizar login. Tente novamente mais tarde.");
    }
  };
  

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify({
        name: user.displayName, 
        photo: user.photoURL, 
        email: user.email
      }));

      navigateTo('/perfil');
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  return (
    <div className="loginPageContainer">
      <div className="loginPage flex">
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className="title">Entre e avalie nossos serviços</h2>
              <p>Adote o costume de se cuidar!</p>
            </div>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <img className='logoVT' src={logo} alt="logo image" />
              <h3>Bem vindo de volta!</h3>
            </div>
            <form className="form grid">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Insira seu Email"
                    onChange={(event) => setLoginEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Senha</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Insira sua Senha"
                    onChange={(event) => setLoginPassword(event.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn flex" onClick={loginUser}>
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
              </button>

              <button type="button" className="btn flex google-btn" onClick={loginWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} />
                <span>Login com Google</span>
              </button>
              <span className="text">Não possui uma conta?</span>
              <Link to={'/options'}>
                <p>Cadastre-se</p>
              </Link>

              <span className="forgotPassword">
                Esqueceu sua senha? <a href="">Clique Aqui</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
