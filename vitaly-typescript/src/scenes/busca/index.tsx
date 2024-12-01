import React, { useState } from 'react';
import axios from 'axios';
import Clientes from '@/scenes/clientes';
import HomeDois from '@/scenes/busca/homeDois'; // Importar o componente Home
import Navbar from '@/scenes/navbar';
import { useNavigate } from 'react-router-dom';

const BuscaDoencas: React.FC = () => {
  const [nomeDoenca, setNomeDoenca] = useState('');
  const [doencas, setDoencas] = useState<any[]>([]); 
  const [noticias, setNoticias] = useState<any[]>([]); 
  const [mostrarMedicos, setMostrarMedicos] = useState(false); // Estado para controlar a visibilidade do card de médicos
  const navigate = useNavigate(); // Usando o hook de navegação

  // Função para buscar doenças do banco de dados
  const buscarDoenca = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/buscarDoenca?nome=${nomeDoenca}`);
      setDoencas(response.data);
    } catch (error) {
      console.error('Erro ao buscar doenças:', error);
    }
  };

  // Função para buscar notícias da API externa
  const buscarNoticias = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${nomeDoenca}&language=pt&apiKey=ce81af908d4f42c09436b4b1c861d418&pageSize=3`);
      setNoticias(response.data.articles);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    }
  };

  // Função que chama ambas as buscas
  const handleSearch = async () => {
    if (nomeDoenca) {
      await Promise.all([buscarDoenca(), buscarNoticias()]);
      setMostrarMedicos(true); // Mostrar o card de médicos após a busca
    }
  };

  // Função para navegação para o chat
  const handleProfessionalClick = (id: string) => {
    navigate(`/ChatClient?id=${id}`); // Redireciona para a tela de chat com o ID do profissional
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 py-20 gap-10">
      <div className="w-full">
        <Navbar setSelectedPage={() => {}} />
        <HomeDois setSelectedPage={() => {}} />
      </div>

      {/* Seção de busca de doenças */}
      <div
        id="buscar-doencas"
        className="flex flex-col md:flex-row justify-center items-center w-full gap-10 mt-10"
      >
        {/* Card de Busca */}
        <div
          className={`flex-1 max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg ${
            mostrarMedicos ? '' : 'mx-auto'
          }`}
        >
          <h1 className="text-3xl font-bold mb-8 text-primary-500 text-center">Buscar Doenças</h1>

          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Digite o nome da doença"
              value={nomeDoenca}
              onChange={(e) => setNomeDoenca(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white transition duration-300"
            >
              Buscar
            </button>
          </div>

          {/* Card de resultados de doenças */}
<div className="mt-8 w-full bg-white p-4 border border-gray-300 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
  <h2 className="text-xl font-bold mb-4">Resultados para {nomeDoenca}</h2>
  <ul>
    {doencas.map((doenca, index) => (
      <li key={index} className="mb-4">
        <p className="text-gray-800 font-semibold">{doenca.nome}</p>
        <p className="text-gray-600">{doenca.descricao}</p>
        {doenca.tipo_recomendacao && (
          <p className="text-gray-600">Recomendação: {doenca.tipo_recomendacao}</p>
        )}
        {doenca.especialista_nome && (
          <p className="text-gray-600">Especialista: {doenca.especialista_nome}</p>
        )}
      </li>
    ))}
  </ul>
</div>

          {/* Card de notícias */}
          <div className="mt-8 w-full bg-white p-4 border border-gray-300 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Notícias recentes sobre {nomeDoenca}</h2>
            <ul>
              {noticias.map((noticia, index) => (
                <li key={index} className="mb-2">
                  <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {noticia.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card de Médicos - Oculto inicialmente */}
        {mostrarMedicos && (
          <div className="flex-1 max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg md:mt-0 mt-10">
            <Clientes handleProfessionalClick={handleProfessionalClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscaDoencas;
