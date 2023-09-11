import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ObjectDetailsPage from '../components/ObjectDetailsPage';
import AuthGuard from '../AuthGuard';
import Login from '../components/Login';
import ListaDeProdutos from '../lista';
import NovoUsuario from '../novoUsuario';

// Função para verificar se um usuário tem a role "ROLE_ADMIN"
const hasAdminRole = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken && decodedToken.CARGOS.includes('ROLE_ADMIN');
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
};

// Função para verificar se um usuário tem a role "ROLE_ATENDENTE"
const hasAtendenteRole = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken && decodedToken.CARGOS.includes('ROLE_ATENDENTE');
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
};

const AppRouter = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setRole(decodedToken.CARGOS);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} exact />

      <Route
        path="/inicio"
        element={
          role.includes('ROLE_ADMIN') || role.includes('ROLE_ATENDENTE') ? (
            <AuthGuard>
              <ListaDeProdutos />
            </AuthGuard>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/novo-usuario"
        element={
          role.includes('ROLE_ADMIN') ? (
            <AuthGuard>
              <NovoUsuario />
            </AuthGuard>
          ) : (
            <Navigate to="/" />
          )
        }
      />

    </Routes>
  );
};

export default AppRouter;
