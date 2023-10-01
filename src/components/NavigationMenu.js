import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import { useNavigate } from 'react-router-dom';
import '../css/navigationMenu.css';
import LogoutService from '../function_logout';
import { useAuth } from '../AuthContext';
import ListaDeProdutos from '../lista';

function NavigationMenu({
  searchTerm,
  selectedOption,
  setSearchTerm,
  setSelectedOption,
}) {
  const { roles } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [rolesByOptions, setRolesByOptions] = useState('');


  useEffect(() => {
    setRolesByOptions(localStorage.getItem('role'));
  }, []);
  console.log(rolesByOptions);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    LogoutService.logout();
  };



  return (
    <nav>
      <ul className={menuOpen ? 'open' : ''}>
        <li className='nav-line' id='first-li'>
           <Link to="/inicio">Início</Link>
        </li>
        <li className='nav-line' id='second-li'>
          <div className="containerSearch">
            <SearchBar
              searchTerm={searchTerm}
              selectedOption={selectedOption}
              setSearchTerm={setSearchTerm}
              setSelectedOption={setSelectedOption} />
          </div></li>
        <li className="dropdown" onClick={toggleDropdown} id='third-li'>

          <img className="img_config" src="https://carlosautopecas-api.s3.sa-east-1.amazonaws.com/roda-dentada.png" alt="Configurações" />
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            {rolesByOptions === 'ROLE_ADMIN' && (<>
              <Link to="/novo-usuario">Criar Usuario</Link>
              <Link to="/editar-usuario">Editar Usuario</Link>
            </>
            )}
            <Link to="/meus-dados">Meus dados</Link>
            <Link to="/" onClick={handleLogout}> Sair</Link>
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
