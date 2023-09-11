import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import NavigationMenu from './NavigationMenu';
import '../css/objectDetailsPage.css';

const ObjectDetailsPage = (props) => {
  const { codigoPeca } = useParams();
  const [objectDetails, setObjectDetails] = useState(null);
  const history = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('codigo'); 

  useEffect(() => {
    fetchObjectDetails();
  }, []);

  const fetchObjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pecas/codigo/${codigoPeca}`);
      const objectDetails = response.data;
      setObjectDetails(objectDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    history('/inicio')
  };

  return (
    <div>
      <NavigationMenu u selectedOption={selectedOption} searchTerm={searchTerm} />
      {objectDetails ? (
        <div className='containerDetalhes'>
          <div className="object-card-detail">
            <div className='header_card'>
             <div className='codigoPeca'> <p >{objectDetails.codigoPeca}</p></div>
             <div className='descricaoPeca'><p>{objectDetails.descricao}</p></div>
            </div>
            <div className="description-detail">
              <div className='grid-tabela-container'>
                <table className='grid-tabela'>
                  <tbody>
                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Referência:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.estoqueEntity.referenciaPeca}</p>
                      </td>
                    </tr>

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Casa:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.estoqueEntity.casaPeca}</p>
                      </td>
                    </tr>

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Quantidade:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.estoqueEntity.quantidadePeca}</p>
                      </td>
                    </tr>

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Preço de venda:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.precoVenda}</p>
                      </td>
                    </tr>

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Preço de custo:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.precoCusto}</p>
                      </td>
                    </tr>

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Última Venda:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.ultimaVenda}</p>
                      </td>
                    </tr>
                  </tbody>

                  {objectDetails.ultimoFornecedor && (

                    <tr className='linha'>
                      <td className='colunaPrimaria'>
                        <h4>Último Fornecedor:</h4>
                      </td>
                      <td className='coluna'>
                        <p>{objectDetails.ultimoFornecedor.nome}</p>
                      </td>
                    </tr>

                  )}
                </table>
              </div>
            </div>
          </div>
          <button className='botaoVoltar' onClick={handleBack}>Voltar</button>
        </div>
      ) : (
        <div>
          <p>Carregando detalhes do objeto...</p>
          <button className='botaoVoltar' onClick={handleBack}>Voltar</button>
        </div>
      )}
    </div>
  );
}

export default ObjectDetailsPage;
