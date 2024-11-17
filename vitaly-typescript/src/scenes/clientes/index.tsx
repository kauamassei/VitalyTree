import { SelectedPage } from '@/shared/types';
import "@/scenes/clientes/clientes.css"
import medicocalvo from "@/assets/medicocalvo.jpg"
import medicafelizcomaprofissao from "@/assets/medicafelizcomaprofissao.jpg"
import medicadoida from "@/assets/medicadoida.jpg"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Clientes = ({ setSelectedPage }: Props) => {
    return(
        <div className="containerClientes">
            <div className="container2">
                <h1 className='h1Clientes'></h1>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {/* Card 1 */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                        <div className="flex items-center mb-2">
                            <img src={medicadoida} alt="Maria Silva" className="w-16 h-16 rounded-full border-2 border-gray-300 mr-2" />
                            <div>
                                <strong className="text-lg">Maria Silva</strong>
                                <span className="text-gray-600">Terapeuta</span>
                            </div>
                        </div>
                        <p className="text-gray-700">"A plataforma facilita o acompanhamento dos meus pacientes.."</p>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                        <div className="flex items-center mb-2">
                            <img src={medicocalvo} alt="João Pereira" className="w-16 h-16 rounded-full border-2 border-gray-300 mr-2" />
                            <div>
                                <strong className="text-lg">João Pereira</strong>
                                <span className="text-gray-600">Clínico Geral</span>
                            </div>
                        </div>
                        <p className="text-gray-700">"Com esta ferramenta, posso compartilhar orientações sobre doenças."</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                        <div className="flex items-center mb-2">
                            <img src={medicafelizcomaprofissao} alt="Ana Costa" className="w-16 h-16 rounded-full border-2 border-gray-300 mr-2" />
                            <div>
                                <strong className="text-lg">Ana Costa</strong>
                                <span className="text-gray-600">Psicológo</span>
                            </div>
                        </div>
                        <p className="text-gray-700">"É um recurso prático tanto para atualização profissional quanto para o atendimento."</p>
                    </div>

                    {/* Adicione mais cards conforme necessário */}
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
}

export default Clientes;
