import Logo from "@/assets/Logo.png";
import termosPdf from "@/assets/Termos e Condições Gerais de Uso do Site Vitalytree.pdf";

const FooterAssinatura = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={Logo} />
          <p className="my-5">
            Acesse os nossos <a href={termosPdf} download="Termos_de_Uso_Vitalytree.pdf" className="text-blue-500 underline">Termos de Uso</a> e <a href={termosPdf} download="Politica_de_Privacidade_Vitalytree.pdf" className="text-blue-500 underline">Política de Privacidade</a>.
          </p>
          <p>Ao assinar qualquer um dos nossos planos, garantimos a segurança e proteção dos seus dados. Nosso site utiliza criptografia avançada para proteger suas informações pessoais e financeiras, proporcionando uma experiência segura e confiável em todas as etapas do processo de assinatura. Seus dados estão em boas mãos conosco!
          Embora adotemos as melhores práticas de segurança para proteger seus dados, como criptografia de ponta a ponta e conformidade com os padrões de segurança da indústria, nenhum sistema online pode garantir 100% de segurança. Existe sempre o risco de ameaças cibernéticas, como ataques de phishing e vulnerabilidades inesperadas. Recomendamos que você esteja atento a qualquer comunicação suspeita e utilize senhas fortes para proteger sua conta. Seus dados de pagamento são processados de forma segura por plataformas de pagamento confiáveis, que não armazenam suas informações diretamente em nosso sistema, garantindo mais segurança.
          </p>
          <p>© 2024 - VitalyTree Todos Os Direitos Reservados.</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default FooterAssinatura;
