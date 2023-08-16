import React, { Component } from 'react';
import axios from 'axios';
import ObjectCard from './components/ObjectCard';
import './css/searchBar.css';
import './css/lista.css';
import ObjectDetailsPage from './components/ObjectDetailsPage';
import NavigationMenu from './components/NavigationMenu';

class ListaDeProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 0,
      pageSize: 20,
      selectedObject: null,
      showDetailsPage: false,
      selectedOption: 'codigo',
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchPaginatedData();
  }

  fetchPaginatedData = async () => {
    const { currentPage, pageSize } = this.state;

    try {
      const response = await axios.get('http://192.168.0.244:8080/pecas', {
        params: {
          pagina: currentPage,
          tamanho: pageSize,
          sort: 'codigoPeca',
          order: 0,
        },
      });
      this.setState({ data: response.data.elementos });
    } catch (error) {
      console.error(error);
    }
  };

  handlePageChange = (amount) => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + amount,
      }),
      () => {
        this.fetchPaginatedData();
      }
    );
  };
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSelectChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleObjectClick = async (objeto) => {
    try {
      const response = await axios.get(`http://192.168.0.244:8080/pecas/codigo/${objeto.codigoPeca}`);
      const objectDetails = response.data;
      this.setState({ selectedObject: objectDetails, showDetailsPage: true });
    } catch (error) {
      console.error(error);
    }
  };

  handleBack = () => {
    this.setState({
      searchedByCode: false,
      currentPage: 0,
      searchTerm: '',
      data: [],
    }, () => {
      this.fetchPaginatedData();
    });
  };

  render() {
    const { selectedOption, searchTerm, data, selectedObject, currentPage, showDetailsPage, searchedByCode } = this.state;
    const pageSize = this.state.pageSize;

    return (
      <div>
        <NavigationMenu u selectedOption={selectedOption} searchTerm={searchTerm} />
        {showDetailsPage ? (
          <div>
            <ObjectDetailsPage
              objectDetails={selectedObject}
              onBack={() => this.setState({ showDetailsPage: false, selectedObject: null })}
            />
          </div>
        ) : (
          <div>
            {!selectedObject && (
              <div className="object-card-list">
                {data && data.length > 0 ? (
                  data.map((objeto) => (
                    <div key={objeto.codigoPeca}>
                      <ObjectCard
                        objeto={objeto}
                        onObjectClick={() => this.handleObjectClick(objeto)}
                      />
                    </div>
                  ))
                ) : (
                  <p>Nenhum objeto encontrado</p>
                )}
              </div>
            )}
            <div className="pagination-buttons">
              <div className='pagination-buttons-container'>
                {searchedByCode ? (
                  <button className='buttonPageable' onClick={() => this.handleBack()}>
                    Voltar
                  </button>
                ) : (
                  <>
                    <button className='buttonPageable' onClick={() => this.handlePageChange(-1)} disabled={currentPage === 0}>
                      Anterior
                    </button>
                    <button className='buttonPageable' onClick={() => this.handlePageChange(1)} disabled={data.length < pageSize}>
                      Próximo
                    </button>
                  </>

                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ListaDeProdutos;
