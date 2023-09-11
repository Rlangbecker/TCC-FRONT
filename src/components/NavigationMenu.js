import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import { useNavigate } from 'react-router-dom';
import '../css/navigationMenu.css';
import imgConfig from '../img/roda-dentada.png';
import LogoutService from '../function_logout';

function NavigationMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Adicione o estado para o dropdown
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('codigo');

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async (term, option) => {
    setSearchTerm(term);
    setSelectedOption(option);

    if (searchTerm === '') {
      history(`/inicio`);
    } else if (selectedOption === 'codigo') {
      history(`/detalhes/${term}`);
    } else if (selectedOption === 'referencia') {
      history(`/referencia/${term}`);
    } else if (selectedOption === 'nome') {
      history(`/descricao/${searchTerm}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    LogoutService.logout(); // Chame a função de logout da classe LogoutService
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
      
        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <img className="img_config" src={imgConfig} alt="Configurações" />
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <Link to="/novo-usuario">Criar Usuario</Link>
            <a href="#">Editar Usuario</a>
            <a href="#">Seus dados</a>
            <a href="#" onClick={handleLogout}>Sair</a> {/* Chame handleLogout ao clicar em "Sair" */}
          </div>
        </li>
      </ul>
      <div className="containerSearch">
        <SearchBar onSearch={handleSearch} />
      </div>
    </nav>
  );
}

export default NavigationMenu;
