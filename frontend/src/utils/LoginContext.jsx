import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 


const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  const [admin, setAdmin] = useState(false);

  const login = (jwtToken) => {
    localStorage.setItem('jwt', jwtToken);
    setToken(jwtToken);

    const decodedToken = jwtDecode(jwtToken);
    const typeUser = decodedToken.role;

    if (typeUser && typeUser.includes('ROLE_ADMIN')) {
      console.log('Admin access: true');
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setAdmin(false); 
  };

  const isLoggedIn = () => !!token;

  useEffect(() => {
    console.log('Admin state:', admin);
  }, [admin]);

  return (
    <LoginContext.Provider value={{ token, admin, login, logout, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
