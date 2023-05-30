import React from 'react';
import ExcelSpreadsheet from './lista';
import logo from './img/logo.jpg';
import SearchBar from './components/searchBar';

const App = () => {
  return (
    <div className='container'>
      <img src={logo} alt='logo'/>
      <ExcelSpreadsheet />
    </div>
  );
};

export default App;