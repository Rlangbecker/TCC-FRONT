import React, { Component } from 'react';
import '../css/objectCard.css';

class ObjectCard extends Component {
  render() {
    const { objeto, onObjectClick } = this.props;

    return (
      <div className="object-card" onClick={() => onObjectClick(objeto)}>
        <h3>{objeto.codigoPeca} </h3>
        <div className="description">
          <h4>{objeto.descricao}</h4>
        </div>
        <h4><p>Referência: {objeto.estoqueEntity.referenciaPeca}</p></h4>
        <h4><p>Estoque: {objeto.estoqueEntity.casaPeca}</p></h4>
        <h3><p>R$ {objeto.precoVenda}</p></h3>
        <p>Última Venda: {objeto.ultimaVenda}</p>
      </div>
    );
  }
}

export default ObjectCard;
