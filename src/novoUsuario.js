import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationMenu from './components/NavigationMenu';
import { toast } from "react-toastify";
import './css/novoUsuario.css';

const NovoUsuario = () => {
    const [nome, setName] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_ATENDENTE');

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
            const response = await axios.post('http://localhost:8080/auth/register', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
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
        }
    };

       return (
        <div>
            <NavigationMenu u />
            <div className="user-form-newuser">
                <h2>Criação de Usuário</h2>
                <div className="form-group">
                    <label>Nome:</label>
                    <input className='input-new-user' type="text" value={nome} onChange={handleNameChange} />
                </div>
                <div className="form-group">
                    <label>Login:</label>
                    <input className='input-new-user' type="text" value={login} onChange={handleLoginChange} />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input className='input-new-user' type="password" value={senha} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select className='select-new-user' value={role} onChange={handleRoleChange}>
                        <option value="ROLE_ATENDENTE">ATENDENTE</option>
                        <option value="ROLE_ADMIN">ADMINISTRADOR</option>
                    </select>
                </div>
                <button className='botao_cadastro' onClick={handleSubmit}>Criar Usuário</button>
            </div>
        </div>
    );
}

export default NovoUsuario;
