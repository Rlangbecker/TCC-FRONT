import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ObjectDetailsPage from '../components/ObjectDetailsPage';
import Login from '../components/Login';
import ListaDeProdutos from '../lista';
import NovoUsuario from '../novoUsuario';
import * as InternalRoutes from '../ExportRoutes';
import { AuthProvider } from '../AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from '../UserProfile';
import UserList from '../components/UserList';
import ListaByNome from '../components/listaByNome';
import NavigationMenu from '../components/NavigationMenu';
import ListaByReferencia from '../components/listaByReferencia';


function AppRouter() {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('codigo');

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
                element={(
                  <NavigationMenu
                    searchTerm={searchTerm}
                    selectedOption={selectedOption}
                    setSearchTerm={setSearchTerm}
                    setSelectedOption={setSelectedOption}
                  />,
                  <ListaDeProdutos />
                )
                }
              />


              <Route
                path="/detalhes/:codigoPeca"
                element={<ObjectDetailsPage />} />

              <Route
                path="/meus-dados"
                element={<UserProfile />} />

              <Route
                path="/buscar-nome/:descricao"
                element={<ListaByNome onDataReceived={(data) => setSearchData(data)} />}
              />

              <Route
                path="/buscar-referencia/:referencia"
                element={<ListaByReferencia onDataReceived={(data) => setSearchData(data)} />}
              />

              <Route
                path="/editar-usuario"
                element={<UserList />} />

              {/* <Route path="/novo-usuario" element={<InternalRoutes.NewUserRoute />} /> */}


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
