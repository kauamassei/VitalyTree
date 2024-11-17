import HText from "@/shared/HText";
import { BenefitType, SelectedPage } from "@/shared/types";
import { UserGroupIcon, AcademicCapIcon, NewspaperIcon } from "@heroicons/react/24/solid";
{/*icones importados do heroicons tem q ser declarados ali*/}
import { motion } from "framer-motion";
import BenefitsPageGraphic from "@/assets/BenefitsPageGraphic.png"
import Benefit from "./Benefit";
import ActionButton from "@/shared/ActionButton";
import { useNavigate } from "react-router-dom";

const benefits: Array<BenefitType> = [
  {
    icon: <NewspaperIcon className="h-6 w-6" />,
    title: "Exames e Diagnósticos",
    description: 
    "Disponibilizamos aceso a médicos competentes e especializados, tanto autônomos quanto clínicas, que garatirão métodos de avaliações precisos, e se possível, diagnósticos e exames se necesário."
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "Pacientes Recomendam",
    description: 
    "Contamos com áreas de avaliação de pacientes que já tiveram experiêncas com os serviços aqui prestados, para assim garantirmos os melhores atendimentos e serviços."
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Profissionais Experientes",
    description: 
    "Garantimos profissionalismo de todos os seus contratados, cada médico ou clínica aqui cadastrados antes passa por uma verificação de porte do CEM (Código de Ética Médica)."
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2}
  }
}


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const Benefícios = ({setSelectedPage}: Props) => {

  const navigate = useNavigate(); 
  return (
    <section
  id="benefits"
  className="mx-auto min-h-full w-5/6 py-20"
  >
    <motion.div
    onViewportEnter={() => setSelectedPage(SelectedPage.Benefícios)}
    >
      
      {/*Header com titulo e texto*/}
      <motion.div className="md:my-5 md:w-3/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
          hidden: { opacity: 0, x: -50},
          visible: { opacity: 1, x: 0 },
      }}
      >
        <HText>SAÚDE = QUALIDADE DE VIDA</HText>
        <p className="my-5 text-sm">
        Mais do que nunca, saúde e tecnologia andam juntas em prol de uma melhor qualidade de vida, não é de hoje que se sabe que cada vez mais as pessoas estão com uma vida corrida, tirando de foco sua saúde, tanto física quanto mental.
        </p>
      </motion.div>

      {/*Beneficios*/}

        <motion.div className="mt-5 items-center justify-between gap-8 md:flex"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.5}}
        variants={container}>
          {benefits.map((benefit) => (
            <Benefit 
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            setSelectedPage={setSelectedPage}
            
            />
          ))}
        </motion.div>

          {/*graphics and description*/}
          <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
            {/*graphic*/}
            <img 
            className="mx-auto"
            alt="benefits-page-graphic"
            src={BenefitsPageGraphic}
            />

            {/*Description*/}

              <div>
                {/*titulo*/}
                    <div className="relative">
                      <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                        <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50},
                            visible: { opacity: 1, x: 0 },
                        }}
                        >
                          <HText>
                            ESTATÍSTICAS SOBRE{' '}<br></br>
                            <span className="text-primary-500">DOENÇAS HEREDITÁRIAS</span><br></br>
                            NO BRASIL{' '}
                          </HText>
                        </motion.div>

                      </div>
                    </div>
                {/*descript*/}

                  <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  variants={{
                      hidden: { opacity: 0, x: 50},
                      visible: { opacity: 1, x: 0 },
                  }}
                  >
                    <p className="my-5"> Atualmente existem milhares de doenças hereditárias, que vão desde as mais comuns até as mais raras.</p>
                    <p className="mb-5"> Segundo o IBGE quase 20% da população brasileira possui colesterol alto e mais de 10% possui diabetes. Doenças comuns entre os brasileiros, que infelizmente, muitas vezes só vem a tona quando desenvolvidas. </p>
                    <p className="mb-5"> Para prevenir agravantes futuros, e, assim obter uma melhor qualidade de vida, é imprescindível o conhecimento das doenças, como evitar sua piora e caso já esteja desenvolvida, quais medidas tomar. </p>
                  </motion.div>

                {/*button*/}

                <div className="relative mt-16">
                  <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkle">
                  <ActionButton onClick={() => navigate('/doenca')}>
                  Entre agora
                </ActionButton>
                  </div>
                </div>
              </div>
          </div>
    </motion.div>
  </section>
  );
};

export default Benefícios;