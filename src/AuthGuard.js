import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        return false;
      }
  
      try {
        const decodedToken = jwtDecode(token);
  
        if (decodedToken && (decodedToken.CARGOS.includes('ROLE_ADMIN') || decodedToken.CARGOS.includes('ROLE_ATENDENTE'))) {
            return true;
          }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
  
      return false;
    };
  
    const isAuthenticated = checkAuthentication();
  
    setIsAuthenticated(isAuthenticated);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
