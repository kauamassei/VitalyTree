import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/scenes/login/RegisterOption.css';
import { useToast } from "@/hooks/use-toast"

const RegistrationOptions: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const navigate = useNavigate();
    const { toast } = useToast()

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedOption) {
            // Redirecionar de acordo com a opção selecionada
            switch (selectedOption) {
                case 'usuário comum':
                    navigate('/register');
                    break;
                case 'profissional da saúde':
                    navigate('/rprofi');
                    break;
                case 'hospital ou clínica':
                    navigate('/rclinica');
                    break;
                default:
                    break;
            }
        } else {
            toast({
                    title: `Error`,
                    variant: "destructive",
                    description: "Por favor, selecione uma opçãdio."
                })
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-auth bg-cover'>
            <div className="registration-container  w-full">
                <h2>Escolha uma opção para se cadastrar:</h2>
                <div className="option-group">
                    <label>
                        <input
                            type="radio"
                            value="usuário comum"
                            checked={selectedOption === 'usuário comum'}
                            onChange={handleOptionChange}
                        />
                        Usuário Comum
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="profissional da saúde"
                            checked={selectedOption === 'profissional da saúde'}
                            onChange={handleOptionChange}
                        />
                        Profissional da Saúde
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hospital ou clínica"
                            checked={selectedOption === 'hospital ou clínica'}
                            onChange={handleOptionChange}
                        />
                        Hospital ou Clínica
                    </label>
                </div>
                <button className="submit-button" onClick={handleSubmit}>Prosseguir</button>
            </div>
        </div>
    );
};

export default RegistrationOptions;
