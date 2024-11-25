import useMediaQuery from '@/hooks/useMediaQuery';
import { SelectedPage } from '@/shared/types';
import ActionButton from '@/shared/ActionButton';
import HomePageText from "@/assets/HomePageText.png";
import HomePageGraphic from "@/assets/HomePageGraphic.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Home = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
    const navigate = useNavigate(); // Inicializa o useNavigate

    const handleLoginRedirect = () => {
        navigate('/login'); // Redireciona para a tela de login
    };

    return (
        <section id='home' className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'>
            {/* Imagens do header */}
            <motion.div className='md:flex mx-auto w-5/6 items-center justify-center md:h-5/6'
                onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
            >
                {/* Main header */}
                <div className='z-10 mt-32 md:basis-3/5'>
                    {/* Headings */}
                    <motion.div
                        className='md:-mt-20'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <div className='relative'>
                            <div className='before:absolute before:-top-20 before:-left-20 before:z-[-1]'>
                                <img alt='home-page-text' src={HomePageText} />
                            </div>
                        </div>

                        <p className='mt-8 text-sm'>
                            O VitalyTree tem como objetivo trazer maior visibilidade para tratamentos e informações sobre doenças hereditárias, possibilitando melhor qualidade de vida.
                        </p>
                    </motion.div>

                    {/* Ações */}
                    <motion.div
                        className='mt-8 flex items-center gap-8'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <ActionButton onClick={handleLoginRedirect}>
                            Entre Agora
                        </ActionButton>
                       
                    </motion.div>
                </div>

                {/* Imagens */}
                <div className='flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-items-end'>
                    <img alt='home-pageGraphic' src={HomePageGraphic} />
                </div>
            </motion.div>
            
        </section>
    );
};

export default Home;
