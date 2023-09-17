import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/login.css';
import { useAuth } from '../AuthContext';


function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const {handleLogin} = useAuth()

    const handleInputChange = () => {
        setErrorMessage('');
    };

    if (localStorage.getItem('token')) {
        navigate('/inicio');
    }

    return (
        <div className="login-container">
            <img src="https://carlosautopecas-api.s3.sa-east-1.amazonaws.com/logo_loja.png" alt="logo-loja" border="0" />

            <div className="login-box">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Usuário"
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value);
                        handleInputChange();
                    }}
                />
                <button onClick={ () => handleLogin(login,senha)}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;
