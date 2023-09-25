import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjectCard from './ObjectCard';
import '../css/lista.css';
import ObjectDetailsPage from './ObjectDetailsPage';
import NavigationMenu from './NavigationMenu';
import { useParams } from 'react-router-dom';

const ListaByReferencia = ({ term }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [lenght,setLenght] = useState();
    const { referencia } = useParams();
    const [pageSize, setPageSize] = useState(0);
    const [selectedObject, setSelectedObject] = useState(null);
    const [showDetailsPage, setShowDetailsPage] = useState(false);
    const [selectedOption, setSelectedOption] = useState('codigo');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedByCode, setSearchedByCode] = useState(false);


    const fetchPaginatedData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/pecas/referencia/${referencia}`, {
                params: {
                    pagina: currentPage,
                    tamanho: pageSize,
                    sort: 'codigoPeca',
                    order: 0,
                },
            });
            console.log('Dados buscados:', response.data);
            console.log('Número de elementos:', response.data.length);
            console.log('Pagina atual:', currentPage);
            if (response.data.length > pageSize) {
                setLenght(response.data.lenght)
                setPageSize(21);
            }
            setData(response.data.elementos);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };



    useEffect(() => {
        console.log('ListaDeProdutos componentDidMount');
        fetchPaginatedData();
    }, [currentPage, referencia]);

    const handleObjectClick = async (objeto) => {
        try {
            const response = await axios.get(`http://localhost:8080/pecas/codigo/${objeto.codigoPeca}`);
            const objectDetails = response.data;
            setSelectedObject(objectDetails);
            setShowDetailsPage(true);
            setSearchedByCode(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (amount) => {
        setCurrentPage((prevPage) => prevPage + amount);
        fetchPaginatedData();
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
                            {data && data.length > 0 ? (
                                data.map((objeto) => (
                                    <div key={objeto.codigoPeca}>
                                        <ObjectCard objeto={objeto} onClick={() => handleObjectClick(objeto)} />
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum objeto encontrado</p>
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
                                    <button
                                        className="buttonPageable"
                                        onClick={() => handlePageChange(-1)}
                                        disabled={currentPage === 0}>Anterior</button>

                                    <button
                                        className="buttonPageable"
                                        onClick={() => handlePageChange(+1)}
                                        disabled={(data || []).length < pageSize}>Próximo</button>
                                </>

                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaByReferencia;
