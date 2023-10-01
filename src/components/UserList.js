import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import axios from 'axios';
import Sidebar from './SideBar';
import "../css/editUser.css";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com:8080/user')
      .then((response) => {
        setUserList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar lista de usuários:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <NavigationMenu />
      <div className='container-list'>
        
        <Sidebar userList={userList} />
        <div className="user-list">
        </div>
      </div>
    </div>
  );
};

export default UserList;
