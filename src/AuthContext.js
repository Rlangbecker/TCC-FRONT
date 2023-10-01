import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from "react-toastify";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [roles, setRole] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (login, senha) => {
    try {
      const response = await axios.post('http://sistemaconsulta-env.eba-qcseqchb.sa-east-1.elasticbeanstalk.com/auth/login', { login, senha });
  
      const statusCode = response.status;
      const responseData = response.data;
  
      console.log(`Status Code: ${statusCode}`);
  
      if (statusCode === 200) {

        localStorage.setItem('token', responseData);
        const decodedToken = jwtDecode(responseData);
  
        if (decodedToken && decodedToken.CARGOS) {
          console.log(decodedToken.CARGOS);
          setRole(decodedToken.CARGOS);
          localStorage.setItem('role', decodedToken.CARGOS)
          localStorage.setItem('sub', decodedToken.sub)
          localStorage.setItem('nome', decodedToken.Nome)
  
          navigate('/inicio');
  
          toast.success('Bem vindo ' + localStorage.getItem('nome'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } 
    } catch (error) {
      toast.error('Verifique suas credenciais!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.error(`Erro na requisição: ${error.message}`);
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