import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExcelSpreadsheet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pecas');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
          <th>Código</th>
            <th>Grupo</th>
            <th>Descrição</th>
            <th>Preço de Venda</th>
            <th>Preço de Custo</th>
            <th>Data de Cadastro</th>
            <th>Última Venda</th>
            <th>Nome</th>
            <th>Nome Fantasia</th>
            <th>CNPJ</th>
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
              <td>{objeto.ultimFornecedor.nome}</td>
              <td>{objeto.ultimFornecedor.nomeFantasia}</td>
              <td>{objeto.ultimFornecedor.cnpj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelSpreadsheet;