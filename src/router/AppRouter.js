import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importe Route e Routes
import App from '../App';
import ObjectDetailsPage from '../components/ObjectDetailsPage';
import Login from '../components/Login';
import ListaDeProdutos from '../lista';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/inicio" element={<ListaDeProdutos />} />
      <Route path="/detalhes/:codigoPeca" element={<ObjectDetailsPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
