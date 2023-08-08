import React, { Component } from 'react';

class ObjectDetails extends Component {
  render() {
    const { objectDetails } = this.props;

    return (
      <div className="object-details">
        {objectDetails ? (
          <div>
            <h4>{objectDetails.codigoPeca} - {objectDetails.descricao}</h4>
            <p>Casa: {objectDetails.estoqueEntity.casaPeca}</p>
            <p>Referência: {objectDetails.estoqueEntity.referenciaPeca}</p>
            <p>Última Venda: {objectDetails.ultimaVenda}</p>
            <p>Preço de Venda: {objectDetails.precoVenda}</p>
            {/* Add more details if needed */}
          </div>
        ) : (
          <p>Carregando detalhes do objeto...</p>
        )}
      </div>
    );
  }
}

export default ObjectDetails;
