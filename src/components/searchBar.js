import React, { useState } from 'react';
import axios from 'axios';
import '../css/searchBar.css';

const SearchBar = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = useState('codigo');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      if (searchTerm === '') {
        await axios.get('http://192.168.0.244:8080/pecas');
      } else if (selectedOption === 'codigo') {
        onSearch(searchTerm, selectedOption); // Passa searchTerm e selectedOption para onSearch
      } else if (selectedOption === 'referencia') {
        await axios.get(`http://192.168.0.244:8080/pecas/referencia/${searchTerm}`);
      } else if (selectedOption === 'nome') {
        await axios.get(`http://192.168.0.244:8080/pecas/descricao/${searchTerm}`);
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
        onChange={handleChange}
        placeholder="Digite aqui"
      />
      <div className="select-wrapper">
        <select value={selectedOption} onChange={handleSelectChange}>
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
