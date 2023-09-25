import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import '../css/userDetails.css';

function UserDetails({ user, senha, setSenha, novaSenha, setNovaSenha, onClose }) {
    const { nome, login, role } = user;
    const [showChangePasswordButton, setShowChangePasswordButton] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [placeholderPassword, setPlaceholderPassword] = useState('Nova senha');
    

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
            const response = axios.put(`http://localhost:8080/user/change-password-from-user`, {
                login,
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
        setNovaSenha('');
        setShowChangePassword(false);
        setShowChangePasswordButton(true);
    };


    const mostrarSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const handleInputPasswordClick = () => {
        setPlaceholderPassword("");
      };

    return (

        <div className="user-form-edit">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"></link>
            <div className="button-close-container">
                <button className="button-close-window" onClick={onClose}>
                <i class="bi bi-x-circle"></i>
                </button>
            </div>
            <h2>Informações</h2>
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
                    {role === 'ROLE_ATENDENTE' ? 'Atendente' : 'Administrador'}
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
                        <label>Insira a nova senha</label>
                        <div className="input-container">
                            {senhaVisivel ? (
                                <input
                                    className="inputProfile-blind"
                                    type="text"
                                    placeholder={placeholderPassword}
                                    value={novaSenha}
                                    onClick={handleInputPasswordClick}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                            ) : (
                                <input
                                    className="inputProfile"
                                    type="password"
                                    placeholder={placeholderPassword}
                                    value={novaSenha}
                                    onClick={handleInputPasswordClick}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                            )}
                            <i className={`bi ${senhaVisivel ? 'bi-eye-slash' : 'bi-eye'}`} id="btn-senha" onClick={mostrarSenha}></i>
                        </div>
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
    );
}

export default UserDetails;
