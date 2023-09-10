import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import ObjectDetailsPage from '../components/ObjectDetailsPage';
import Login from '../components/Login';
import ListaDeProdutos from '../lista';
import EditUser from '../components/EditUser';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/inicio" element={<ListaDeProdutos />} />
      <Route path="/detalhes/:codigoPeca" element={<ObjectDetailsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editar" element={<EditUser />} />
    </Routes>
    
  );
};

export default AppRouter;
