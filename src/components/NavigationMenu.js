import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import { useNavigate } from 'react-router-dom';
import '../css/navigationMenu.css';
import imgConfig from '../img/roda-dentada.png';
import LogoutService from '../function_logout';
import { useAuth } from '../AuthContext';

function NavigationMenu() {
  const { roles } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('codigo');

  const [rolesByOptions, setRolesByOptions] = useState('');


  useEffect(() => {
    setRolesByOptions(localStorage.getItem('role'));
  }, []);
  console.log(rolesByOptions);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async (term, option) => {
    setSearchTerm(term);
    setSelectedOption(option);

    if (searchTerm === '') {
      return
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
    LogoutService.logout();
  };

  return (
    <nav>
       <div className="containerSearch">
        <SearchBar/>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <Link to="/inicio">Início</Link>
        </li>
        <li>

        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <img className="img_config" src={imgConfig} alt="Configurações" />
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            {rolesByOptions === 'ROLE_ADMIN' && (<>
              <Link to="/novo-usuario">Criar Usuario</Link>
              <Link to="/editar-usuario">Editar Usuario</Link>
            </>
            )}
            <Link to="/meus-dados">Meus dados</Link>
            <a href="#" onClick={handleLogout}>Sair</a> {/* Chame handleLogout ao clicar em "Sair" */}
          </div>
        </li>
      </ul>
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
      
     
    </nav>
  );
}

export default NavigationMenu;
