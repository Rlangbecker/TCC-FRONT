import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ObjectCard from './components/ObjectCard';
import './css/searchBar.css';
import './css/lista.css';
import ObjectDetailsPage from './components/ObjectDetailsPage';

class ExcelSpreadsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 0,
      pageSize: 20,
      selectedOption: 'codigo',
      searchTerm: '',
      selectedObject: null,
      showDetailsPage: false,
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
  handleSearch = async () => {
    const { searchTerm, selectedOption } = this.state;
  
    try {
      let response;
      if (searchTerm === '') {
        response = await axios.get('http://192.168.0.244:8080/pecas');
      } else if (selectedOption === 'codigo') {
        response = await axios.get(`http://192.168.0.244:8080/pecas/codigo/${searchTerm}`);
      } else if (selectedOption === 'referencia') {
        response = await axios.get(`http://192.168.0.244:8080/pecas/referencia/${searchTerm}`);
      } else if (selectedOption === 'nome') {
        response = await axios.get(`http://192.168.0.244:8080/pecas/descricao/${searchTerm}`);
      }
      this.setState({ data: [response.data] });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const { data, selectedOption, searchTerm, selectedObject, currentPage, showDetailsPage } = this.state;
    const pageSize = this.state.pageSize;

    return (
      <div>
        <SearchBar
          onSearch={this.handleSearch}
          onSelectChange={this.handleSelectChange}
          onChange={this.handleChange}
          selectedOption={selectedOption}
          searchTerm={searchTerm}
        />
        {showDetailsPage ? (
          <div>
            <ObjectDetailsPage
              objectDetails={selectedObject}
              match={{ params: { codigoPeca: selectedObject.codigoPeca } }}
              onBack={() => this.setState({ showDetailsPage: false, selectedObject: null })}
            />
          </div>
        ) : (
          <div>
            {!selectedObject && (
              <div className="object-card-list">
                {data && data.length > 0 ? (
                  data.map((objeto) => (
                    <div
                      key={objeto.codigoPeca}
                      onClick={() => this.handleObjectClick(objeto)}
                      onBack={() => this.setState({ showDetailsPage: false, selectedObject: null })}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      
                    >
                      <ObjectCard objeto={objeto} onObjectClick={this.handleObjectClick} 
                      onBack={() => this.setState({ showDetailsPage: false, selectedObject: null })}/>
                    </div>
                  ))
                ) : (
                  <p>Nenhum objeto encontrado</p>
                )}
              </div>
            )}
            <div className="pagination-buttons">
              <button className='buttonPageable'
                onClick={() => this.handlePageChange(-1)}
                disabled={currentPage === 0}
              >
                Anterior
              </button>
              <button className='buttonPageable'
                onClick={() => this.handlePageChange(1)}
                disabled={data.length < pageSize}
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExcelSpreadsheet;
