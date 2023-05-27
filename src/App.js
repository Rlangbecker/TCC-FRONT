import React from 'react';
import ExcelSpreadsheet from './lista';
import logo from './img/logo.jpg';

const App = () => {
  return (
    <div className='container'>
      <img src={logo} alt='logo'/>
      <ExcelSpreadsheet />
    </div>
  );
};

export default App;