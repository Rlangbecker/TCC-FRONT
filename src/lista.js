import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjectCard from './components/ObjectCard';
import './css/lista.css';
import ObjectDetailsPage from './components/ObjectDetailsPage';
import NavigationMenu from './components/NavigationMenu';
import Load from './components/loading';
import { useNavigate } from 'react-router-dom';

const ListaDeProdutos = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(21);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showDetailsPage, setShowDetailsPage] = useState(false);
  const [selectedOption, setSelectedOption] = useState('codigo');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedByCode, setSearchedByCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingButtons, setShowingButton] = useState(true);

  const fetchPaginatedData = async () => {
    setIsLoading(true);
    setShowingButton(false);
    try {
      const response = await axios.get('http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com/pecas', {
        params: {
          pagina: currentPage,
          tamanho: pageSize,
          sort: 'codigoPeca',
          order: 0,
        },
      });
      console.log('Dados buscados:', response.data);
      console.log('Pagina atual:', currentPage);
      setData(response.data.elementos);
      setIsLoading(false);
      setShowingButton(true);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    console.log('ListaDeProdutos componentDidMount');
    
    localStorage.setItem('role',localStorage.getItem('role'))
    fetchPaginatedData();
  }, [currentPage]);

  const handleObjectClick = async (objeto) => {
    try {
      const response = await axios.get(`http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com/pecas/codigo/${objeto.codigoPeca}`);
      const objectDetails = response.data;
      setSelectedObject(objectDetails);
      setShowDetailsPage(true);
      setSearchedByCode(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (amount) => {
    setCurrentPage((currentPage) => currentPage + amount);
  };


  const handleBack = () => {
    setSearchTerm('');
    setCurrentPage(0);
    setData([]);
    setSearchedByCode(false);
    fetchPaginatedData();
  };



  return (
    <div className='container-list'>
      <NavigationMenu
        selectedOption={selectedOption}
        searchTerm={searchTerm}
        setSelectedOption={setSelectedOption}
        setSearchTerm={setSearchTerm}
      />
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
        <div>
          {!selectedObject && (
            <div className="object-card-list">
              {isLoading ? (
                <div className='loading-list'>
                  <Load />
                </div>
              ) : data && data.length > 0 ? (
                data.map((objeto) => (
                  <div key={objeto.codigoPeca}>
                    <ObjectCard objeto={objeto} onClick={() => handleObjectClick(objeto)} />
                  </div>
                ))
              ) : (
                <p>Nenhuma peça Encontrada</p>
              )}
            </div>
          )}
          <div className="pagination-buttons">
            <div className="pagination-buttons-container">
              {searchedByCode ? (
                <button className="buttonPageable" onClick={handleBack}>
                  Voltar
                </button>
              ) : (
                <>
                  {isShowingButtons && (
                    <>
                      <button
                        className="buttonPageable"
                        onClick={() => handlePageChange(-1)}
                        disabled={currentPage === 0}
                      >
                        Anterior
                      </button>
  
                      <button
                        className="buttonPageable"
                        onClick={() => handlePageChange(+1)}
                        disabled={data.length < pageSize}
                      >
                        Próximo
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default ListaDeProdutos;
