import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import axios from 'axios';
import "../css/editUser.css"

const EditUser = () => {
  const [userData, setUserData] = useState({});
  const [loginValue, setLoginValue] = useState('');
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value); 
  };

  const handleSave = () => {
    setIsLoading(true);
 
    axios.get(`http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com:8080/user/${loginValue}`)
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
        setNome(userData.nome);
        setCargo(userData.cargo);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar informações do usuário:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <NavigationMenu />
      <div className="user-form">
        <h2>Editar Usuário</h2>
        <form>
          <div className="form-group">
            <label>Login:</label>
            <input
              type="text"
              value={loginValue}
              onChange={handleLoginChange}
            />
          </div>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cargo:</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button className="save-button" onClick={handleSave}>Salvar</button>
        </form>
        {isLoading && <p>Carregando...</p>}
      </div>
    </div>
  );
};

export default EditUser;
