import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/searchBar.css';

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('codigo');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (searchTerm === '') {
        return
      } else if (selectedOption === 'codigo') {
        navigate(`/detalhes/${searchTerm}`);
      } else if (selectedOption === 'referencia') {
        await axios.get(`http://localhost:8080/pecas/referencia/${searchTerm}`);
      } else if (selectedOption === 'nome') {
        await axios.get(`http://localhost:8080/pecas/descricao/${searchTerm}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={(event) =>  setSearchTerm(event.target.value)}
        placeholder="Digite aqui"
      />
      <div className="select-wrapper">
        <select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
          <option value="codigo">Código</option>
          <option value="referencia">Referência</option>
          <option value="nome">Nome</option>
        </select>
      </div>

      <button className="search-button" onClick={handleSearch}>
        Pesquisar
      </button>
    </div>
  );
};

export default SearchBar;
