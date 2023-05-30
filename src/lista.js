import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar';

class ObjectList extends Component {
  render() {
    const { data, onObjectClick } = this.props;

    return (
      <table className="excel-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Referência</th>
            <th>Descrição</th>
            <th>Preço de Venda</th>
            <th>Preço de Custo</th>
            <th>Casa</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((objeto) => (
              <tr key={objeto.codigoPeca} onClick={() => onObjectClick(objeto)}>
                <td>{objeto.codigoPeca}</td>
                <td>{objeto.estoqueEntity.referenciaPeca}</td>
                <td>{objeto.descricao}</td>
                <td>{objeto.precoVenda}</td>
                <td>{objeto.precoCusto}</td>
                <td>{objeto.estoqueEntity.casaPeca}</td>
                <td>{objeto.estoqueEntity.quantidadePeca}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Nenhum objeto encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

class ObjectDetails extends Component {
  render() {
    const { objectDetails } = this.props;

    return (
      <div className='containerDetalhes'>
        {objectDetails ? (
          <div className='containerPecaUnitaria'>
            <table align='center'>
              <thead>
                <td colSpan={6}>
                  <h4>{objectDetails.codigoPeca} - {objectDetails.descricao}</h4>
                </td>
              </thead>
              <tr>
                <th> <td colSpan={6}>Casa: {objectDetails.estoqueEntity.casaPeca} </td></th>
              </tr>
              <tr>
                <th><td colSpan={10}>Referência: {objectDetails.estoqueEntity.referenciaPeca}  </td></th>
                </tr>
                <tr>
                <th><td colSpan={10}>Última Venda: {objectDetails.ultimaVenda}</td></th>
              </tr>
              <tr>
              <th><td colSpan={10}>Preço de Venda: {objectDetails.precoVenda}</td></th>
              </tr>

            </table>
          </div>
/**
 * 
 *  <tr>
              <th><td colSpan={10}> Preço de Custo: {objectDetails.precoCusto}</td></th>
              </tr>
 */

        ) : (
          <p>Carregando detalhes do objeto...</p>
        )}
      </div>
    );
  }
}

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
    };
  }

  componentDidMount() {
    this.fetchPaginatedData();
  }

  fetchPaginatedData = async () => {
    try {
      const { currentPage, pageSize } = this.state;
      const response = await axios.get('http://localhost:8080/pecas', {
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

  fetchSearchData = async () => {
    try {
      const { searchTerm, selectedOption, currentPage, pageSize } = this.state;
      let endpoint = '';

      if (selectedOption === 'codigo') {
        endpoint = `http://localhost:8080/pecas/codigo/${searchTerm}`;
      } else if (selectedOption === 'referencia') {
        endpoint = `http://localhost:8080/pecas/referencia/${searchTerm}`;
      } else if (selectedOption === 'nome') {
        endpoint = `http://localhost:8080/pecas/descricao/${searchTerm}`;
      }

      const response = await axios.get(endpoint, {
        params: {
          pagina: currentPage,
          tamanho: pageSize,
          sort: 'codigoPeca',
          order: 0,
        },
      });

      if (selectedOption === 'codigo' && !Array.isArray(response.data)) {
        // Se a resposta não for uma matriz, transforma o objeto em um array com um único elemento
        this.setState({ data: [response.data] });
      } else if (selectedOption === 'referencia' && !Array.isArray(response.data)){
        this.setState({ data: [response.data] });
      } else{
        this.setState({ data: response.data.elementos });
      }
    } catch (error) {
      console.error(error);
      this.setState({ data: [] }); // Define a lista de dados como vazia em caso de erro
    }
  };

  handleSearch = async () => {
    const { searchTerm } = this.state;

    if (searchTerm === '') {
      this.fetchPaginatedData();
    } else {
      this.fetchSearchData();
    }
  };

  handleBack = () => {
    this.setState({ searchTerm: '', selectedObject: null }, () => {
      this.fetchPaginatedData();
    });
  };

  handleSelectChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handlePageChange = (amount) => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + amount,
      }),
      () => {
        this.fetchPaginatedData(); // Corrigido para fetchPaginatedData em vez de fetchSearchData
      }
    );
  };

  handleObjectClick = async (objeto) => {
    try {
      const response = await axios.get(`http://localhost:8080/pecas/codigo/${objeto.codigoPeca}`);
      const objectDetails = response.data;
      this.setState({ selectedObject: objectDetails });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { data, currentPage, selectedOption, searchTerm, selectedObject } = this.state;
    const showPagination = !selectedObject; // Verifica se um objeto está selecionado

    return (
      <div>
        <SearchBar
          onSearch={this.handleSearch}
          onSelectChange={this.handleSelectChange}
          onChange={this.handleChange}
          selectedOption={selectedOption}
          searchTerm={searchTerm}
        />
        {selectedObject ? (
          <div>
            <button onClick={this.handleBack}>Voltar</button>
            <ObjectDetails objectDetails={selectedObject} />
          </div>
        ) : (
          <ObjectList data={data} onObjectClick={this.handleObjectClick} />
        )}

        {showPagination && (
          <div>
            <button onClick={() => this.handlePageChange(-1)} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => this.handlePageChange(1)}>Próxima</button>
          </div>
        )}
      </div>
    );
  }
}

export default ExcelSpreadsheet;
