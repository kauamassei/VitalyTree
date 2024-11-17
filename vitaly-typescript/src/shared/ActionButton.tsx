import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    onClick?: () => void; // Adiciona a propriedade onClick
};

const ActionButton = ({ children, onClick }: Props) => {
    const navigate = useNavigate(); // Hook para navegação

    return (
        <button
            onClick={() => {
                if (onClick) {
                    onClick(); // Executa a função onClick se fornecida
                } else {
                    navigate('/login'); // Navega para a tela de login por padrão
                }
            }}
            className='rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white'
        >
            {children}
        </button>
    );
};

export default ActionButton;
