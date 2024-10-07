// utils/jwt.js

export const setToken = (token) => {
    localStorage.setItem('jwt', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('jwt');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('jwt');
  };
  