import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../css/login.css';

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            navigate('/inicio');
        }
    }, [navigate]);

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, senha }),
        });

        if (response.status === 200) {
            const token = await response.text();
            setToken(token);
            localStorage.setItem('token', token)
            const decodedToken = jwtDecode(token);
    
            if (decodedToken && decodedToken.role) { // Verifique se role está presente no token
                setRole(decodedToken.role);
            }
        
            alert('Login bem-sucedido!');
            navigate('/inicio');
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Login falhou. Verifique suas credenciais.');
        }
    };

    const handleInputChange = () => {
        setErrorMessage('');
    };

    return (
        <div className="login-container">
            <img src="https://i.ibb.co/D5j2Jz8/logo-loja.png" alt="logo-loja" border="0" />

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
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;
