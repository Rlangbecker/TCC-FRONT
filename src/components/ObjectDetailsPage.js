import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importe o Link para criar um link para a página inicial
import '../css/objectDetailsPage.css';

class ObjectDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectDetails: null,
    };
  }

  componentDidMount() {
    this.fetchObjectDetails();
  }

  fetchObjectDetails = async () => {
    const { codigoPeca } = this.props.match.params;

    try {
      const response = await axios.get(`http://192.168.0.244:8080/pecas/codigo/${codigoPeca}`);
      const objectDetails = response.data;
      this.setState({ objectDetails });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { objectDetails } = this.state;

    return (
      <div>
        {objectDetails ? (
          <div className='containerDetalhes'>
            <div className="object-card-detail">
              <h3>{objectDetails.codigoPeca}</h3>
              <div className="description-detail">
                <h4>{objectDetails.descricao}</h4>
              </div>
              <h4><p>Referência: {objectDetails.estoqueEntity.referenciaPeca}</p></h4>
              <h4><p>Estoque: {objectDetails.estoqueEntity.casaPeca}</p></h4>
              <p>Preço de venda: {objectDetails.precoVenda}</p>
              <p>Preço de custo: {objectDetails.precoCusto}</p>
              <p>Última Venda: {objectDetails.ultimaVenda}</p>
              {objectDetails.ultimoFornecedor && (
                <div className='ultimoFornecedor'>
                  <h4>Último Fornecedor:</h4>
                  <p>{objectDetails.ultimoFornecedor.nome} / {objectDetails.ultimoFornecedor.nomeFantasia}</p>
                  <p>CNPJ: {objectDetails.ultimoFornecedor.cnpj}</p>
                
                </div>
              )}
            </div>
            <button className='botaoVoltar' onClick={this.props.onBack}>Voltar</button>
          </div>
        ) : (
          <div>
          <p>Carregando detalhes do objeto...</p>
          <button className='botaoVoltar' onClick={this.props.onBack}>Voltar</button>
          </div>
        )}
      </div>
    );
  }
}

export default ObjectDetailsPage;
