import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { Navigate, useNavigate } from 'react-router-dom';


const LoginContext = createContext();
 
export const  useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {


  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  const [admin, setAdmin] = useState(localStorage.getItem('admin')||false);
  const [session, setSession] = useState(localStorage.getItem('session') || false);

  const login = (jwtToken) => {
    localStorage.setItem('jwt', jwtToken);
    localStorage.setItem('session',true);
    setToken(jwtToken);

    const decodedToken = jwtDecode(jwtToken);
    const typeUser = decodedToken.role;

    if (typeUser && typeUser.includes('ROLE_ADMIN')) {
      setAdmin(true);
      localStorage.setItem('admin',true)
    } else {
      setAdmin(false);
    }

    const intervalId = setInterval(sessionExpiry,3600000)
    return()=>clearInterval(intervalId);

  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('admin');
    setToken(null);
    setAdmin(false); 
  };

  const sessionExpiry = ()=>{
    console.log('Session:',session)

    if(session){
      localStorage.removeItem('jwt');
      localStorage.removeItem('admin');
      localStorage.removeItem('session');
      alert("Session Expired!!!\n Login Again")
      
      setToken(null);
      setAdmin(false); 
      setSession(false);
      console.log('session expired')
    }

    setSession((prevState) => !prevState);
    localStorage.setItem('sesion',session);
  }

  const isLoggedIn = () => !!token;

  useEffect(() => {
    console.log('Admin state:', admin);
    console.log(localStorage.getItem('session'))
  }, [admin,session]);

  return (
    <LoginContext.Provider value={{ token, admin, login, logout, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
