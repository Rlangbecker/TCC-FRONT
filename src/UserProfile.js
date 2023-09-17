import React, { useState, useEffect } from 'react';
import NavigationMenu from './components/NavigationMenu';
import axios from 'axios';
import { toast } from "react-toastify";

import './css/userProfile.css';

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [login, setLogin] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [showChangePasswordButton, setShowChangePasswordButton] = useState(true);

    useEffect(() => {
        setLogin(localStorage.getItem('sub'));
        setCargo(localStorage.getItem('role'));
        setNome(localStorage.getItem('nome'));
    }, []);

    const handleChangePassword = () => {
        if (!senha || !novaSenha) {
            toast.warn('Por favor, preencha a senha atual e a nova senha.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            return;
        }

        if (senha === novaSenha) {
            toast.warn('As senhas não podem ser iguais!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }

        try {
            const response = axios.put(`http://localhost:8080/user/change-password`, {
                login,
                senha,
                novaSenha,
            })
            if (response) {

                toast.success('Senha alterada com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setSenha('');
                setNovaSenha('');
                setShowChangePassword(false);
                setShowChangePasswordButton(true);
            }
        } catch (error) {
            console.error('Erro ao alterar a senha:', error);
            toast.error('Erro ao alterar a senha. Por favor, verifique suas credenciais.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        };
    };

    const handleCancelChangePassword = () => {
        setSenha('');
        setNovaSenha('');
        setShowChangePassword(false);
        setShowChangePasswordButton(true);
    };

    return (
        <div>
            <NavigationMenu u />
            <div className="user-form">
                <h2>Meus Dados</h2>
                <div className="form-group">
                    <p>
                        <strong>Nome:</strong> {nome}
                    </p>
                </div>
                <div className="form-group">
                    <p>
                        <strong>Login:</strong> {login}
                    </p>
                </div>
                <div className="form-group">
                    <p>
                        <strong>Cargo:</strong>{' '}
                        {cargo === 'ROLE_ATENDENTE' ? 'Atendente' : 'Administrador'}
                    </p>
                </div>
                {showChangePasswordButton && !showChangePassword && (
                    <button
                        className="change-password-button"
                        onClick={() => setShowChangePassword(true)}
                    >
                        Trocar Senha
                    </button>
                )}
                {showChangePassword && (
                    <div>
                        <div className="form-group">
                            <label>Senha Atual:</label>
                            <input
                                className="inputProfile"
                                type="password"
                                placeholder="Senha Atual"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nova Senha:</label>
                            <input
                                className="inputProfile"
                                type="password"
                                placeholder="Nova Senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="button-container">
                                <button
                                    className="save-password-button"
                                    onClick={handleChangePassword}
                                >
                                    Salvar
                                </button>
                                <button
                                    className="cancel-password-button"
                                    onClick={handleCancelChangePassword}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
