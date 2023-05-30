import React, { useState } from 'react';
import axios from 'axios';
const SearchBar = ({ onSearch, onBack, onSelectChange, onChange, selectedOption, searchTerm }) => {
    const handleSearch = () => {
      onSearch();
    };
  
    const handleBack = () => {
      onBack();
    };
  
    const handleSelectChange = (event) => {
      onSelectChange(event);
    };
  
    const handleChange = (event) => {
      onChange(event);
    };
  
    return (
      <div>
        {onBack && (
          <button className="backButton" onClick={handleBack}>
            Voltar
          </button>
        )}
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="codigo">Código</option>
          <option value="referencia">Referência</option>
          <option value="nome">Nome</option>
        </select>
        <input
          type="text"
          className="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Digite um código de peça"
        />
        <button className="searchButton" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  