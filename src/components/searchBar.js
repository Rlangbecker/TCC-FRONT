import React, {} from 'react';
import '../css/searchBar.css';

const SearchBar = ({ onSearch, onSelectChange, onChange, selectedOption, searchTerm }) => {
    const handleSearch = () => {
      onSearch();
    };
  
    const handleSelectChange = (event) => {
      onSelectChange(event);
    };
  
    const handleChange = (event) => {
      onChange(event);
    };
  
    return (
      <div className="search-bar-container">
        <div className="select-wrapper">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="codigo">Código</option>
          <option value="referencia">Referência</option>
          <option value="nome">Nome</option>
        </select>
        </div>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Digite aqui"
        />
        <button className="search-button" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  