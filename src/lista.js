import React, { useState } from 'react';
import axios from 'axios';

const ExcelSpreadsheet = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      let response;
      if (searchTerm === '') {
        response = await axios.get('http://localhost:8080/pecas');
      } else {
        response = await axios.get(`http://localhost:8080/pecas/codigo/${searchTerm}`);
      }
      setData([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          class="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite um código de peça"/>
        <button class="searchButton" onClick={handleSearch}>Pesquisar</button>
      </div>


      <table className="excel-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Grupo</th>
            <th>Descrição</th>
            <th>Preço de Venda</th>
            <th>Preço de Custo</th>
            <th>Data de Cadastro</th>
            <th>Última Venda</th>
          </tr>
        </thead>
        <tbody>
          {data.map((objeto, index) => (
            <tr key={index}>
              <td>{objeto.codigoPeca}</td>
              <td>{objeto.grupo}</td>
              <td>{objeto.descricao}</td>
              <td>{objeto.precoVenda}</td>
              <td>{objeto.precoCusto}</td>
              <td>{objeto.dataCadastro}</td>
              <td>{objeto.ultimaVenda}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelSpreadsheet;
