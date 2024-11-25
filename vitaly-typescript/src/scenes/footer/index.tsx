import Logo from "@/assets/Logo.png";
import termosPdf from "@/assets/Termos e Condições Gerais de Uso do Site Vitalytree.pdf";

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={Logo} />
          <p className="my-5">
            Acesse os nossos <a href={termosPdf} download="Termos_de_Uso_Vitalytree.pdf" className="text-blue-500 underline">Termos de Uso</a> e <a href={termosPdf} download="Politica_de_Privacidade_Vitalytree.pdf" className="text-blue-500 underline">Política de Privacidade</a>.
          </p>
          <p>© 2024 - VitalyTree Todos Os Direitos Reservados.</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
