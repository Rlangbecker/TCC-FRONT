import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/objectCard.css';

class ObjectCard extends Component {
  render() {
    const { objeto, onObjectClick } = this.props;

    return (
      <Link to={`/detalhes/${objeto.codigoPeca}`} className='link'>
        <div className="object-card">
         
          <div className='header_card'>
            <p className='codigoPeca_card'>{objeto.codigoPeca} </p>
            <p className='casaPeca_card'>{objeto.estoqueEntity.casaPeca}</p>
          </div>
         
          <div className="description">
            <p>{objeto.descricao}</p>
          </div>
         
          <div className='body_card'>
            <p className='referencia_card'>Ref: {objeto.estoqueEntity.referenciaPeca}</p>
          </div>

          <div className='footer_card'>
            <p className="quantidade_card">Qt: {objeto.estoqueEntity.quantidadePeca}</p>
            <p className='valorPeca_card'>R$ {objeto.precoVenda}</p>
          </div>
        
        </div>
      </Link>
  
    );
  }
}

export default ObjectCard;
