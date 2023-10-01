import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/sideBar.css";
import UserDetails from './UserDetails'; 

function Sidebar({ initialUserList }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState(initialUserList);
    const [selectedUser, setSelectedUser] = useState(null);
    const [login, setLogin] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [placeholder, setPlaceholder] = useState('Pesquise pelo login');



    const searchListUser = () => {
        setIsLoading(true);
        axios.get('http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com/user')
            .then((response) => {
                setUserList(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar lista de usuários:', error);
                setIsLoading(false);
            });
    };

    const searchUserByLogin = () => {
        setIsLoading(true);
        axios.get(`http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com/user/${searchTerm}`)
            .then((response) => {
                setSearchedUser(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar usuário por login:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        searchListUser();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            searchUserByLogin();
        } else {
            setSearchedUser(null);
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setUserList(null);

        if (e.target.value === '') {
            clearSearch();
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchedUser(null);
        searchListUser();
    };

    const handleUserSelect = (user) => {
        console.log(user)
        setLogin(user.login);
        setNome(user.nome);
        console.log('role->'+ user.role)
        setCargo(user.role)
        setSelectedUser(user);
        console.log(user)
    };

    const closeUserDetails = () => {
        setSelectedUser(null);
    };

    const handleInputClick = () => {
        setPlaceholder("");
      };
   

    return (
        <div className="sidebar">
            <h3>Lista de Usuários</h3>
            <div className='search-bar-list'>
                <input
                    type="text"
                    className='input-sidebar'
                    placeholder={placeholder}
                    value={searchTerm}
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                />
                
                <ul>
                    {userList ? userList.map((user) => (
                        <li
                            className='user-list-searched'
                            key={user.id}
                            onClick={() => handleUserSelect(user)} >
                            {user.login} 
                        </li>
                    )) : null}
                </ul>
            </div>
            {isLoading ? (
                <p>Carregando...</p>
            ) : searchedUser ? (
                <ul className='searched-user-render'>
                    <li 
                        className='user-searched' 
                        key={searchedUser.id}
                        onClick={() => handleUserSelect(searchedUser)} >
                        {searchedUser.login}
                    </li>
                </ul>
                
            ) : null}
            {selectedUser && (
                <div className="user-details-overlay">
                    <UserDetails
                        user={selectedUser}
                        senha={senha}
                        setSenha={setSenha}
                        novaSenha={novaSenha}
                        setNovaSenha={setNovaSenha}
                        onClose={closeUserDetails}
                    />
                </div>
            )}
        </div>
    );
}

export default Sidebar;
