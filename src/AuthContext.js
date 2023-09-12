import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from "react-toastify";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [roles, setRole] = useState([]);
  const [ nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (login, senha) => {

    try {
      const { data } = await axios.post('http://localhost:8080/auth/login', { login, senha });

      console.log(data);
      localStorage.setItem('token', data)
      const decodedToken = jwtDecode(data);

      if (decodedToken && decodedToken.CARGOS) {
        console.log(decodedToken.CARGOS);
        setRole(decodedToken.CARGOS);
        localStorage.setItem('role', decodedToken.CARGOS)
        localStorage.setItem('sub',decodedToken.sub)
        localStorage.setItem('nome',decodedToken.Nome)
  
        navigate('/inicio');

        toast.success('Bem vindo ' + localStorage.getItem('nome') ,{
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
      //manipular statuscode
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <AuthContext.Provider value={{ roles, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
}