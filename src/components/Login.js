import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import '../css/login.css'; // Certifique-se de que o caminho do arquivo CSS está correto

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    const handleLogin = () => {
        // Lógica de autenticação aqui
        if (username === 'Ricardo' && password === '12345') {
            alert('Login bem-sucedido!');
            history('/inicio')
        } else {
            setErrorMessage('Login falhou. Verifique suas credenciais.');
        }
    };

    const handleInputChange = () => {
        setErrorMessage(''); // Limpa a mensagem de erro ao começar a digitar
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
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        handleInputChange();
                    }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleInputChange();
                    }}
                />
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;
