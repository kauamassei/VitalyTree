import { SelectedPage } from '@/shared/types';
import ActionButton from '@/shared/ActionButton';
import HomePageText from "@/assets/HomePageText.png";
import Medi4 from "@/assets/medi4.png";
import { motion } from 'framer-motion';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const HomeDois = ({ setSelectedPage }: Props) => {

    const scrollToSearchSection = () => {
        const searchSection = document.getElementById('buscar-doencas');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id='home' className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'>
            {/* Imagens do header */}
            <motion.div className='md:flex mx-auto w-5/6 items-center justify-center md:h-5/6'
                onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
            >
                {/* Main header */}
                <div className='z-10 mt-32 md:basis-3/5 md:order-2'>
                    {/* Headings */}
                    <motion.div
                        className='md:-mt-20'
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <div className='relative'>
                            <div className='before:absolute before:-top-20 before:-left-20 before:z-[-1]'>
                                <img alt='home-page-text' src={HomePageText} />
                            </div>
                        </div>

                        <p className='mt-8 text-sm'>
                            Esta página foi desenvolvida para que você consulte informações detalhadas sobre doenças hereditárias e encontre profissionais de saúde qualificados. Nosso objetivo é oferecer suporte ao tratamento adequado e melhorar a qualidade de vida dos pacientes.
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
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <ActionButton onClick={scrollToSearchSection}>
                            Consultar
                        </ActionButton>
                    </motion.div>
                </div>

                {/* Imagens */}
                <div className='flex basis-3/5 justify-center md:z-10 md:mr-40 md:mt-16 md:justify-items-start md:order-1'>
                    <img alt='home-pageGraphic' src={Medi4} />
                </div>
            </motion.div>
        </section>
    );
};

export default HomeDois;
