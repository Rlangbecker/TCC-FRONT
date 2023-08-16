import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {useNavigate } from 'react-router-dom'; 
import '../css/navigationMenu.css';

function NavigationMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // Adicionar estado para searchTerm
  const [selectedOption, setSelectedOption] = useState('codigo'); // Adicionar estado para selectedOption


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async (term,option) => {
    setSearchTerm(term);
    setSelectedOption(option);

      if (searchTerm === '') {
        history(`/inicio`)
      } else if (selectedOption === 'codigo') {
        history(`/detalhes/${term}`);
      } else if (selectedOption === 'referencia') {
        history(`/referencia/${term}`);
      } else if (selectedOption === 'nome') {
        history(`/descricao/${searchTerm}`);
      }
  };

  return (
    <nav>
      <input
        type="checkbox"
        id="menu-toggle"
        className="menu-toggle"
        checked={menuOpen}
        onChange={handleMenuToggle}
      />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span className={`menu-icon-bar ${menuOpen ? 'open' : ''}`}></span>
      </label>
      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <Link to="/inicio">Início</Link>
        </li>
        <li>
          <Link to="/configuracoes">Configurações</Link>
        </li>
      </ul>
      <div className='containerSearch'>
      <SearchBar onSearch={handleSearch}/>
      </div>
    </nav>
  );
}

export default NavigationMenu;
