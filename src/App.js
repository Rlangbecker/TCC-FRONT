import React, { Component } from 'react';
import Lista from './lista';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';
import AppRouter from './router/AppRouter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'codigo',
      searchTerm: '',
    };
  }

  render() {
    const { selectedOption, searchTerm } = this.state;

    return (
      <div className='container'>
        <AppRouter/>
      </div>
    );
  };
}

export default App;