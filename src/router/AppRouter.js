import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ObjectDetailsPage from '../components/ObjectDetailsPage';
import Login from '../components/Login';
import ListaDeProdutos from '../lista';
import NovoUsuario from '../novoUsuario';
import * as InternalRoutes from '../ExportRoutes';
import { AuthProvider } from '../AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route element={<InternalRoutes.PrivateRoute />}>
              <Route
                path="/inicio"
                element={<ListaDeProdutos />} />

              <Route
                path="/detalhes/:codigoPeca"
                element={<ObjectDetailsPage />} />

              <Route element={<InternalRoutes.NewUserRoute />}>
                <Route
                  path="/novo-usuario"
                  element={<NovoUsuario />} />
              </Route>

            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
