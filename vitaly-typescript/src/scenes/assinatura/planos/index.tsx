import { useNavigate } from 'react-router-dom';
import '@/scenes/assinatura/assinatura.css';
import { Spacer } from '@chakra-ui/react';
import Navbar from '@/scenes/navbar';
import FooterAssinatura from '@/scenes/footer/footer2';

const Planos = () => {
  const navigate = useNavigate();

  // Função para redirecionar para a página de confirmação com o plano selecionado
  const handlePlanSelection = (plan: string) => {
    navigate('/confirmar', { state: { selectedPlan: plan } }); // Envia o plano para a tela de pagamento
  };

  return (
    <><Navbar setSelectedPage={() => { } } /><div id="title">
     
      <div className='containerAssinatura'>


        {/* Card do primeiro plano */}
        <div
          className="product-details"
          onClick={() => handlePlanSelection('Assinatura Mensal - R$ 150,00')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Assinatura Mensal</h2>
          <Spacer height="4" />
          <p>Você irá pagar</p>
          <span>R$ 150,00</span>
          <Spacer height="4" />
          <p>Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada.</p>
        </div>

        <Spacer width="6" maxWidth="6" />

        {/* Card do segundo plano */}
        <div
          className="product-details"
          onClick={() => handlePlanSelection('Assinatura Mensal - R$ 210,00')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Assinatura Mensal</h2>
          <Spacer height="4" />
          <p>Você irá pagar</p>
          <span>R$ 210,00</span>
          <Spacer height="4" />
          <p>Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada.</p>
        </div>

        <Spacer width="6" maxWidth="6" />

        {/* Card do terceiro plano */}
        <div
          className="product-details"
          onClick={() => handlePlanSelection('Assinatura Mensal - R$ 300,00')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Assinatura Mensal</h2>
          <Spacer height="4" />
          <p>Você irá pagar</p>
          <span>R$ 300,00</span>
          <Spacer height="4" />
          <p>Gerencie suas consultas de forma eficiente com nosso sistema de agendamento inteligente, ofereça consultas online com telemedicina integrada.</p>
        </div>

      </div>
    </div>
    <FooterAssinatura setSelectedPage={() => { } } /></>
  );
};

export default Planos;
