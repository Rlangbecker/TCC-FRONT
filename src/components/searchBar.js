import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/searchBar.css';
import { toast } from "react-toastify";

const SearchBar = ({
  searchTerm,
  selectedOption,
  setSearchTerm,
  setSelectedOption}) => {
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (searchTerm === '') {
        return;
      } else if (searchTerm.length > 10) {
        toast.error('O campo de pesquisa é limitado a 20 caracteres!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }
      
      if (selectedOption === 'codigo') {
        navigate(`/detalhes/${searchTerm}`);
      } else if (selectedOption === 'referencia') {
        navigate(`/buscar-referencia/${searchTerm}`);

      } else if (selectedOption === 'nome') {

        navigate(`/buscar-nome/${searchTerm}`);
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
        onChange={(event) => setSearchTerm(event.target.value)}
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
