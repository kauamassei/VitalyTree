import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importar as cenas da landing page
import Navbar from "@/scenes/navbar";
import Home from '@/scenes/home';
import OurClasses from '@/scenes/ourClasses';
import Benefícios from "@/scenes/benefits";
import Clientes from "@/scenes/clientes"
import ContactUs from "@/scenes/contactUs";
import Footer from "@/scenes/footer";
import FooterAssinatura from "@/scenes/footer/footer2";
import ChatClient from "@/scenes/chatClientes"
////
import Login from '@/scenes/login/Login/Login';
import Register from '@/scenes/login/Register/Register';
import Dashboard from '@/scenes/dashboard/Dashboard';
import BuscaDoencas from "@/scenes/busca";
import Confirmar from "@/scenes/assinatura/confirmar";
import Planos from "@/scenes/assinatura/planos"
import RegistrationOptions from "@/scenes/login/RegisOptions";
import RProfi from "@/scenes/login/RProfi";
import Perfil from "@/scenes/perfil";
import ChatHistory from "@/scenes/perfil/chatHistory";
import PerfilProfissional from "@/scenes/perfil/perfilProfissional";
import ClinicaRegister from "@/scenes/login/RegClinica"
import Sucesso from "@/scenes/assinatura/status/success"
import Falha from "@/scenes/assinatura/status/failure"
import Pendente from "@/scenes/assinatura/status/pending"

import WhatsApp from "@/scenes/whastapp"


// Componente que renderiza a landing page
const LandingPage = () => {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      } else {
        setIsTopOfPage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app bg-gray-20">
      <Navbar 
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <Benefícios setSelectedPage={setSelectedPage} />
      <Clientes setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
      <Footer />
      <WhatsApp />
    </div>
  );
};

// Definir rotas
const router = createBrowserRouter([
  {
    path: '/', // Rota principal para a landing page
    element: (
      <LandingPage />
    ),
  },
  {
    path: '/login', // Rota para a tela de login
    element: <Login />,
  },
  {
    path: '/register', // Rota para a tela de registro de user comum
    element: <Register />,
  },
  {
    path: '/dashboard', // Rota para o dashboard (após login)
    element: <Dashboard />,
  },
  {
    path: '/doenca', // Rota para buscar doenças
    element: <BuscaDoencas />,
  },
  {
    path: '/confirmar', // Rota para confirmar assinatura
    element: <Confirmar />,
  },
  {
    path: '/options', // Rota para opcoes de registro
    element: <RegistrationOptions />,
  },
  {
    path: '/rprofi', // Rota para registro de profissionais
    element: <RProfi />,
  },
  {
    path: '/rclinica', // Rota para registro de profissionais
    element: <ClinicaRegister />,
  },
  {
    path: '/perfil', // Rota para tela de perfil
    element: <Perfil />,
  },
  {
    path: '/Planos', // Rota para tela de escolher assinatura
    element: <Planos />,
  },
  {
    path: '/ChatClient',
    element: <ChatClient />,
  },
  //////////////
  {
    path: '/sucesso', // Rota para tela de sucesso
    element: <Sucesso />,
  },
  {
    path: '/falha', // Rota para tela de falhaa
    element: <Falha />,
  },
  {
    path: '/pendente', // Rota para tela de pendente vai tomar no cu mercado pago api e tcc e etc vsf
    element: <Pendente />,
  },
  {
    path: '/perfilProfissional', // Rota para tela de perfil profissional
    element: <PerfilProfissional/>,
  },
  {
    path: '/conversas', // 
    element: <ChatHistory />, //
  },

]);


// App principal que vai combinar a navegação
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
