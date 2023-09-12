import React, { useState, useEffect } from 'react';
import NavigationMenu from './components/NavigationMenu';
import { toast } from "react-toastify";
import './css/novoUsuario.css';

function NovoUsuario() {
    const [nome, setName] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_ATENDENTE');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(5);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async () => {
       
        const userData = {
            nome,
            login,
            senha,
            role,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                toast.success('Usuário criado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else {
                const errorData = await response.json();

                toast.error(`Erro no registro: ${errorData.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            showMessage('Erro ao registrar usuário. Tente novamente mais tarde.');
        }
    };

    const showMessage = (text) => {
        setMessage(text);
        setShowPopup(true);

        let timer = 5; 
        setSecondsLeft(timer);

        const countdown = setInterval(() => {
            timer--;
            setSecondsLeft(timer);

            if (timer === 0) {
                clearInterval(countdown); 
                setMessage('');
                setShowPopup(false);
            }
        }, 1000);
    };

    const closePopup = () => {
        setMessage('');
        setShowPopup(false);
    };

    return (
        <div>
            <NavigationMenu u />
            <div className="user-form">
                <h2>Criação de Usuário</h2>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={handleNameChange} />
                </div>
                <div className="form-group">
                    <label>Login:</label>
                    <input type="text" value={login} onChange={handleLoginChange} />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select value={role} onChange={handleRoleChange}>
                        <option value="ROLE_ATENDENTE">ATENDENTE</option>
                        <option value="ROLE_ADMIN">ADMINISTRADOR</option>
                    </select>
                </div>
                <button className='botao_cadastro' onClick={handleSubmit}>Criar Usuário</button>
            </div>
            {showPopup && (
                <div className="message-popup">
                    <div className="message-box">
                        <p>{message}</p>
                    
                        <button onClick={closePopup}>Fechar {`(${secondsLeft}s)`}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NovoUsuario;
