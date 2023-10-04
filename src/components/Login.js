import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/login.css';
import { useAuth } from '../AuthContext';

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [placeholderPassword, setPlaceholderPassword] = useState('Insira sua senha aqui');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { handleLogin } = useAuth();

    const handleInputChange = () => {
        setErrorMessage('');
    };

    const mostrarSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const handleInputPasswordClick = () => {
        setPlaceholderPassword("");
    };
     useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/inicio');
        }
     })


    return (
        <div className="login-container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"></link>
            <img src="https://carlosautopecas-api.s3.sa-east-1.amazonaws.com/logo_loja.png" alt="logo-loja" border="0" />

            <div className="login-box">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                className="login-user"
                    type="text"
                    placeholder="Usuário"
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value);
                        handleInputChange();
                    }}
                />
                <div className="password-container">
                    {senhaVisivel ? (
                        <input
                            className="password-blinded"
                            type="text"
                            placeholder={placeholderPassword}
                            value={senha}
                            onClick={handleInputPasswordClick}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    ) : (
                        <input
                            className="password-seen"
                            type="password"
                            placeholder={placeholderPassword}
                            value={senha}
                            onClick={handleInputPasswordClick}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    )}
                    <i className={`bi ${senhaVisivel ? 'bi-eye-slash' : 'bi-eye'}`} onClick={mostrarSenha}></i>
                </div>

                <button onClick={() => handleLogin(login, senha)}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;
