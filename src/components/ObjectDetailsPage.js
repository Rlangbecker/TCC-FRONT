import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import '../css/objectDetailsPage.css';

const ObjectDetailsPage = (props) => {
  const { codigoPeca } = useParams();
  const [objectDetails, setObjectDetails] = useState(null);
  const navigate = useNavigate();
  const [selectedObject, setSelectedObject] = useState(null);
  const [showDetailsPage, setShowDetailsPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('codigo');


  useEffect(() => {
    fetchObjectDetails();
  }, []);

  const fetchObjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pecas/codigo/${codigoPeca}`);
      const objectDetails = response.data;
      if(Array.isArray(objectDetails) && objectDetails.length >= 0){
        handleBack();
        return
      } else {
        setObjectDetails(objectDetails);
      }    
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate('/inicio')
  };
  return (
    <div>
      <NavigationMenu selectedOption={selectedOption} searchTerm={searchTerm} />
      {showDetailsPage ? (
        <div>
          <ObjectDetailsPage
            objectDetails={selectedObject}
            onBack={() => {
              setShowDetailsPage(false);
              setSelectedObject(null);
            }}
          />
        </div>
      ) : (
        objectDetails ? (
          <div className='containerDetalhes'>
            <div className="object-card-detail">
              <div className="description-detail">
                <div className='grid-tabela-container'>
                  <table className='grid-tabela'>
                    <tbody>
                      <tr className='linha'>
                        <td className='colunaPrimaria'>
                          <p className='codigoPeca'>{objectDetails.codigoPeca}</p>
                        </td>
                        <td className='coluna'>
                          <p className='descricaoPeca'>{objectDetails.descricao}</p>
                        </td>
                      </tr>
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
        )
      )}
    </div>
  );
}

export default ObjectDetailsPage;
